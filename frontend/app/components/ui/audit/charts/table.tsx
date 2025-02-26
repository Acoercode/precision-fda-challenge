import { format } from "date-fns";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

// @ts-ignore
const Table = ({ data, handleEventClick }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (item: {
    _id:
      | string
      | number
      | bigint
      | boolean
      | ReactPortal
      | Promise<AwaitedReactNode>
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | null
      | undefined;
    stamp: {
      date:
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | Promise<AwaitedReactNode>
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined;
      status:
        | string
        | number
        | bigint
        | boolean
        | Promise<AwaitedReactNode>
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined;
      hederaTransactionId:
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | Promise<AwaitedReactNode>
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined;
    };
  }) => {
    // @ts-ignore
    setSelectedRow(item);
    handleEventClick(item);
  };

  const showEllipsisAndLastFour = (str: string) => {
    if (str.length <= 6) {
      return str; // If the string is 4 characters or less, just return it.
    }
    return `...${str.slice(-6)}`; // Add ellipsis and the last 4 characters.
  };

  console.log("Data", data);

  return (
    <div className="flex flex-col ml-20 pr-10">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="max-h-[500px] overflow-auto border rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead className="bg-gray-50 dark:bg-neutral-700 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Chat ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Event ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    AI Response Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    Hedera TX ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {data &&
                  data.map(
                    (
                      item: {
                        event_data: any;
                        chatId: string;
                        status: any;
                        user: any;
                        _id: any;
                        stamp: any;
                      },
                      key: Key | null | undefined,
                    ) => (
                      <tr
                        className={
                          selectedRow === item
                            ? "hover:bg-[#4f5c6e10] bg-[#4f5c6e40]"
                            : "hover:bg-[#4f5c6e10] bg-white"
                        }
                        key={key}
                        onClick={() => handleRowClick(item)}
                      >
                        <td className="px-6 py-1 whitespace-nowrap text-xs font-medium text-gray-800">
                          {item.event_data.chatId
                            ? showEllipsisAndLastFour(item?.event_data.chatId)
                            : "---"}
                        </td>
                        <td className="px-6 py-1 whitespace-nowrap text-xs font-medium text-gray-800">
                          {showEllipsisAndLastFour(item?._id)}
                        </td>
                        <td className="px-6 py-1 whitespace-nowrap text-xs text-gray-800">
                          {/*@ts-ignore*/}
                          {format(item.stamp.date, "LLL d, yyyy H:mm:ss")}
                        </td>
                        <td className="px-6 py-1 whitespace-nowrap text-xs text-gray-800">
                          {item && item?.event_data.status && (
                            <div
                              className={
                                item?.event_data.status === "complete"
                                  ? "flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-green-700 bg-green-100 border border-green-300"
                                  : "flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-red-700 bg-red-100 border border-red-300"
                              }
                            >
                              <div
                                className="text-xs font-normal leading-none max-w-full flex-initial"
                                style={{ textTransform: "capitalize" }}
                              >
                                {item?.event_data.status}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-1 whitespace-nowrap text-xs text-gray-800">
                          <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">
                              {item?.stamp.status}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-1 whitespace-nowrap text-xs text-gray-400">
                          <a
                            href={`https://hashscan.io/mainnet/transaction/${item?.stamp.hederaTransactionId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item?.stamp.hederaTransactionId || "---"}
                          </a>
                        </td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
