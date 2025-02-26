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
                style="filled,setlinewidth(2)",  // Set line width for borders
                width=0.3,
                fixedsize=true,
                fontsize=10,
                fontname="Inter"
            ];
            edge [arrowsize=0.4, penwidth=1];
    `;

  data.forEach((node: { id: any; incomplete: any; tooltip: any }) => {
    console.log("node", node);
    const isSelected = node.id === selectedNodeId;
    const color = node.incomplete ? "#D6424290" : "#4f5c6e40"; // Standard fill colors
    const borderColor = isSelected ? "black" : "transparent"; // Border only for selected node

    dot += `
            "${node.id}" [
                id="node-${node.id}",
                fillcolor="${color}",
                tooltip="${node.tooltip}",
                color="${borderColor}",  // Border color
                style="filled,setlinewidth(2)"  // Thicker border for visibility
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
        dot += `"${prevCompleteNode.id}" -> "${node.id}";\n`;
      }
    } else if (node.incomplete && index > 0) {
      const parentNode = data[index - 1];
      dot += `"${parentNode.id}" -> "${node.id}" [style=dashed];\n`;
    }
  });

  dot += "}";
  return dot;
};

// @ts-ignore
const TreeDiagramGraphviz = ({ data, selectedRow, handleEventClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentQuery, setContentQuery] = useState<any[]>([]);
  const [lineageItems, setLineageItems] = useState<any[]>([]);
  const [detailItems, setDetailItems] = useState<any[]>([]);
  const [nodeSelect, setNodeSelect] = useState<number>(0);
  // @ts-ignore
  useEffect(() => {
    if (data) {
      getChatHistory(data);
    }

    function getChatHistory(data: { event_data: any }) {
      if (data && data.event_data && data.event_data.chatHistory) {
        setLineageItems(data.event_data.chatHistory);
      }
      if (
        data &&
        data.event_data &&
        data.event_data.latestResponse &&
        data.event_data.latestResponse.content
      ) {
        setDetailItems(data.event_data.latestResponse.content);
      }
    }
  }, [data]);

  console.log("lineageItems", lineageItems);

  useEffect(() => {
    const allData = [];
    if (selectedRow && selectedRow.stamp) {
      if (lineageItems && lineageItems.length) {
        lineageItems.map((item, index) => {
          const responseStatus = detailItems[index].annotations.filter(
            (item: { type: string }) => item.type === "response-status",
          );
          const dataItem = {
            tooltip: `Date: ${format(item.date, "LLL d, yyyy H:mm:ss")}\nTx ID: ${item.hederaTransactionId}`,
            id: index + 1,
            incomplete:
              (responseStatus &&
                responseStatus.length &&
                responseStatus[0].data.status === "incomplete") ||
              false,
            ...item,
          };
          allData.push(dataItem);
        });
      }
      const selectedRowDataItem = {
        tooltip: `Date: ${format(selectedRow.stamp.date, "LLL d, yyyy H:mm:ss")}\nTx ID: ${selectedRow.stamp.hederaTransactionId}`,
        id: lineageItems.length + 1,
        incomplete: selectedRow.status === "incomplete" || false,
        ...selectedRow,
      };

      allData.push(selectedRowDataItem);
      setContentQuery(allData);
      setNodeSelect(allData.length);
    }
  }, [lineageItems, selectedRow]);

  useEffect(() => {
    const renderGraph = async () => {
      const dot = generateDot(contentQuery, nodeSelect); // Pass selected node ID
      try {
        const graphviz = await Graphviz.load();
        const svg = graphviz.layout(dot, "svg", "dot");

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          // Attach click event listeners to nodes after rendering
          contentQuery.forEach((node) => {
            const element = containerRef.current?.querySelector(
              `#node-${node.id}`,
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
  }, [contentQuery, nodeSelect]); // Re-render when nodeSelect changes

  const handleNodeClick = (node: { id: any }) => {
    handleEventClick(node);
    setNodeSelect(node.id);
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
              borderTop: "1px solid #ddd", // Separate title from content
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
