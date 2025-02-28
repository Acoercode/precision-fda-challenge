import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

import ChatActions from "./chat-actions";
import ChatMessage from "./chat-message";
import { ChatHandler } from "./chat.interface";

export default function ChatMessages(
  props: Pick<
    ChatHandler,
    | "messages"
    | "isLoading"
    | "reload"
    | "stop"
    | "stampResponse"
    | "stampLoading"
    | "setStampResponse"
  >,
) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const messageLength = props.messages.length;
  const lastMessage = props.messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== "user";
  const showReload =
    props.reload && !props.isLoading && isLastMessageFromAssistant;
  const showStop = props.stop && props.isLoading;

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = props.isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage, props.stampResponse]);

  let stampIndexCounter = 0;
  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-xl pb-0">
      <div
        className="flex h-[70vh] flex-col gap-5 divide-y overflow-y-auto pb-4"
        ref={scrollableChatContainerRef}
      >
        {props.messages.map((m, i) => {
          const isLoadingMessage = i === messageLength - 1 && props.isLoading;
          const stampIndex = stampIndexCounter;
          if (m.role === "assistant") {
            stampIndexCounter++;
          }

          console.log(
            "STAMP INDEX",
            props.stampResponse,
            stampIndex,
            props.stampResponse[stampIndex],
          );
          return (
            <ChatMessage
              key={m.id}
              chatMessage={m}
              isLoading={isLoadingMessage}
              stampResponse={
                props.stampResponse && props.stampResponse.length
                  ? props.stampResponse[stampIndex]
                  : null
              }
            />
          );
        })}
        {isPending && (
          <div className="flex justify-center items-center pt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      <div className={"flex justify-end py-4 items-end"}>
        <div>
          <ChatActions
            reload={props.reload}
            stop={props.stop}
            showReload={showReload}
            showStop={showStop}
            stampLoading={props.stampLoading}
            setStampResponse={props.setStampResponse}
            stampResponse={props.stampResponse}
          />
        </div>
      </div>
    </div>
  );
}
