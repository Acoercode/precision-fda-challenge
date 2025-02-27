import { Graphviz } from "@hpcc-js/wasm";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

// Function to generate DOT graph dynamically
const generateDot = (data: any[], selectedNodeId: number) => {
  let dot = `
        digraph G {
            rankdir=LR;
            node [
                shape=circle,
                style="filled,setlinewidth(2)",
                width=0.3,
                fixedsize=true,
                fontsize=10,
                fontname="Inter"
            ];
            edge [arrowsize=0.4, penwidth=1];
    `;

  data.forEach((node) => {
    const isSelected = node.nodeId === selectedNodeId;
    const color = node.incomplete ? "#D6424290" : "#4f5c6e40";
    const borderColor = isSelected ? "black" : "transparent";

    dot += `
            "${node.nodeId}" [
                id="node-${node.nodeId}",
                fillcolor="${color}",
                tooltip="${node.tooltip}",
                color="${borderColor}",
                style="filled,setlinewidth(2)"
            ];
        `;
  });

  // Add edges
  data.forEach((node, index) => {
    if (index > 0 && !node.incomplete) {
      const prevCompleteNode = data
        .slice(0, index)
        .reverse()
        .find((n) => !n.incomplete);
      if (prevCompleteNode) {
        dot += `"${prevCompleteNode.nodeId}" -> "${node.nodeId}";\n`;
      }
    } else if (node.incomplete && index > 0) {
      const parentNode = data[index - 1];
      dot += `"${parentNode.nodeId}" -> "${node.nodeId}" [style=dashed];\n`;
    }
  });

  dot += "}";
  return dot;
};

const TreeDiagramGraphviz = ({
  allData,
  data,
  selectedRow,
  handleEventClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentQuery, setContentQuery] = useState<any[]>([]);
  const [lineageItems, setLineageItems] = useState<any[]>([]);
  const [nodeSelect, setNodeSelect] = useState<number>(0);

  useEffect(() => {
    if (data) {
      getChatHistory(data);
    }

    function getChatHistory(data: { event_data: any }) {
      if (
        data?.event_data?.chatHistory &&
        Array.isArray(data.event_data.chatHistory)
      ) {
        // Filter only assistant responses
        const assistantResponses = data.event_data.chatHistory.filter(
          (item) => item.role === "assistant",
        );

        setLineageItems(assistantResponses);
      }
    }
  }, [data]);

  useEffect(() => {
    const allData = [];
    if (selectedRow?.stamp) {
      if (lineageItems.length > 0) {
        lineageItems.forEach((item, index) => {
          const responseStatus =
            selectedRow.event_data.latestResponse.annotations.find(
              (annotation) => annotation.type === "response-status",
            );

          const itemId = item.id || `generated-${index + 1}`;

          const dataItem = {
            ...item,
            nodeId: index + 1, // Incremental ID for visualization
            itemId, // Store eventData.latestResponse.id
            tooltip: `Date: ${format(item.createdAt, "LLL d, yyyy H:mm:ss")}\nTx ID: ---`,
            incomplete: responseStatus?.data?.status === "incomplete" || false,
          };
          allData.push(dataItem);
        });
      }

      const selectedRowDataItem = {
        ...selectedRow,
        nodeId: allData.length + 1,
        itemId:
          selectedRow.event_data.latestResponse.id ||
          `generated-${allData.length + 1}`,
        tooltip: `Date: ${format(selectedRow.stamp.date, "LLL d, yyyy H:mm:ss")}\nTx ID: ${selectedRow.stamp.hederaTransactionId}`,
        incomplete: selectedRow.status === "incomplete" || false,
      };

      allData.push(selectedRowDataItem);
      setContentQuery(allData);
      setNodeSelect(selectedRowDataItem.nodeId);
    }
  }, [lineageItems, selectedRow]);

  useEffect(() => {
    const renderGraph = async () => {
      const dot = generateDot(contentQuery, nodeSelect);
      try {
        const graphviz = await Graphviz.load();
        const svg = graphviz.layout(dot, "svg", "dot");

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          // Attach click event listeners to nodes after rendering
          contentQuery.forEach((node) => {
            const element = containerRef.current?.querySelector(
              `#node-${node.nodeId}`,
            );
            if (element) {
              element.addEventListener("click", () => handleNodeClick(node));
            }
          });
        }
      } catch (error) {
        console.error("Graphviz rendering failed:", error);
      }
    };

    if (contentQuery.length > 0) {
      renderGraph();
    }
  }, [contentQuery, nodeSelect]);

  const handleNodeClick = (node) => {
    // Find matching _id in data array using eventData.latestResponse.id (itemId)
    const matchedEntry = allData.find(
      (entry) => entry.event_data.latestResponse.id === node.itemId,
    );

    if (matchedEntry) {
      handleEventClick({ _id: matchedEntry._id, ...matchedEntry });
    } else {
      console.log("No matching entry found for itemId:", node.itemId);
    }

    setNodeSelect(node.nodeId);
  };

  if (contentQuery.length === 0) return null;

  return (
    <div className="flex flex-col ml-20 pr-10 mt-5">
      {/* Container with White Background, Border, and Shadow */}
      <div className="border rounded-lg shadow bg-white">
        {/* Title Section */}
        <div className="bg-gray-50 dark:bg-neutral-700 px-6 py-4 sticky top-0 z-10 rounded-t-lg">
          <h1 className="text-sm font-medium text-gray-500 uppercase dark:text-neutral-400">
            Event Stamp Lineage
          </h1>
        </div>

        {/* Reference Container */}
        <div className="flex-1 overflow-x-auto">
          <div
            ref={containerRef}
            className="min-w-full"
            style={{
              borderTop: "1px solid #ddd",
              backgroundColor: "#fff",
              paddingTop: "30px",
              minHeight: "150px",
              paddingLeft: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TreeDiagramGraphviz;
