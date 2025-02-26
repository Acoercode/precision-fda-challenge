import ReactPopover from "@/app/components/ui/chat/trust-popover";
import Image from "next/image";
import trustLoading from "../../../../public/trustLoading.svg";
import trustSuccess from "../../../../public/trustSuccess.svg";
import { ChatHandler } from "./chat.interface";

export default function ChatRecord(props: Pick<ChatHandler, "stampResponse">) {
  return (
    <div
      className={
        props.stampResponse ? "flex" : "flex justify-end py-4 items-end"
      }
    >
      {props.stampResponse &&
        ((props.stampResponse.stamp && props.stampResponse.stamp.status) ||
          (props.stampResponse.event &&
            props.stampResponse.event.status &&
            props.stampResponse.event.status === "SUBMITTED")) && (
          <div className="flex gap-4">
            <div className="relative flex justify-center items-center">
              <div className="absolute border-gray-300 h-10 w-10 animate-spin rounded-full border-2 border-t-blue-600" />
              <Image
                className="rounded-xl"
                src={trustLoading}
                alt="Trust Loading"
                priority
                height={30}
              />
            </div>
          </div>
        )}
      {props.stampResponse &&
        props.stampResponse.event &&
        props.stampResponse.event.stamp &&
        props.stampResponse.event.stamp.hederaTransactionId && (
          <div className="flex justify-center items-right gap-4">
            <ReactPopover
              trigger="hover"
              content={props.stampResponse.event.stamp.hederaTransactionId}
            >
              <div className="flex gap-4">
                <div
                  draggable="false"
                  role="button"
                  className="h-10 px-3 w-max flex gap-2 items-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-300 hover:bg-opacity-75 focus:bg-gray-300 focus:text-blue-900 active:text-primary active:bg-blue-100 disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:active:text-primary"
                >
                  <Image
                    className="rounded-xl"
                    src={trustSuccess}
                    alt="Trust Success"
                    priority
                    height={30}
                  />
                  <span className="block text-sm font-medium">
                    Validated Proof of Authenticity
                  </span>
                </div>
              </div>
            </ReactPopover>
          </div>
        )}
    </div>
  );
}
