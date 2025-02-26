import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// @ts-ignore
const Markdown = ({ data }) => {
  const [contentQuery, setContentQuery] = useState({
    role: "",
    question: "",
    response: "",
  });
  useEffect(() => {
    if (data) {
      getLatestResponse(data);
    }

    function getLatestResponse(data: { event_data: any }) {
      let role = "";
      let question = "";
      let response = "";
      if (data && data.event_data && data.event_data.latestResponse) {
        const latestResponse = data.event_data.latestResponse;
        role = latestResponse.role;
        //@ts-ignore
        question =
          latestResponse.annotations && latestResponse.annotations.length
            ? latestResponse.annotations[0]?.data.title
            : "Unknown";
        response = latestResponse.content;
      }

      const transformedData = {
        role: role,
        // @ts-ignore
        question: question.split(":").pop()?.replace(/["']/g, ""),
        response: response.replaceAll("###", "#####"),
      };
      // @ts-ignore
      setContentQuery(transformedData);
    }
  }, [data]);

  if (!contentQuery.question) return null;
  return (
    <div className="flex flex-col ml-20 pr-10 mt-5">
      {/* Container with White Background, Border, and Shadow */}
      <div className="border rounded-lg shadow bg-white">
        {/* Title Section */}
        <div className="bg-gray-50 dark:bg-neutral-700 px-6 py-4 sticky top-0 z-10 rounded-t-lg border-b border-gray-300">
          <h1 className="text-sm font-medium text-gray-500 uppercase dark:text-neutral-400">
            Selected Event Contents
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-x-auto">
          <div className="p-6 min-w-full inline-block align-middle">
            <div className="overflow-auto">
              <div className="space-y-6">
                {/* User Prompt */}
                <div
                  className="inline-flex items-center justify-center cursor-default
                        text-sm font-bold text-gray-800 border border-gray-800
                        rounded-full h-5 w-28"
                >
                  User Prompt
                </div>

                {/* User Question */}
                <div className="border-l-2 border-gray-800 pl-3">
                  <ReactMarkdown>{contentQuery.question}</ReactMarkdown>
                </div>

                {/* AI Response */}
                <div
                  className="inline-flex items-center justify-center cursor-default
                        text-sm font-bold text-white bg-[#343e4d]
                        rounded-full h-5 w-28"
                >
                  AI Response
                </div>

                {/* AI Answer */}
                <div className="border-l-2 border-[#343e4d] pl-3">
                  <ReactMarkdown>{contentQuery.response}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markdown;
