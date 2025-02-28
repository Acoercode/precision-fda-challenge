import AuditWrapper from "@/app/components/ui/audit/auditWrapper";
import { Message, useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { ChatHandler, ChatInput, ChatMessages } from "./ui/chat";

export default function ChatSection(props: Pick<ChatHandler, "tabValue">) {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    onError: (error: unknown) => {
      if (!(error instanceof Error)) throw error;
      const message = JSON.parse(error.message);
      alert(message.detail);
    },
    onFinish: (res) => {
      recordEvent(res).then((r) => {
        // @ts-ignore
        const responseUpdate = [...(stateRef.current || []), r];
        setStampResponse(responseUpdate);
        intervalRef.current = setInterval(() => {
          updateEvent(r._id).then((res) => {
            if (
              res.event &&
              res.event.stamp &&
              res.event.stamp.status === "RECORDED"
            ) {
              const result = responseUpdate.map((item: { id: any }) =>
                item.id === res.event._id ? res : item,
              );
              setStampResponse(result);
            }
          });
        }, 1000);
      });
    },
  });
  const [stampResponse, setStampResponse] = useState<any>([]);
  const [stampLoading, setStampLoading] = useState<boolean>(false);
  const [stampHistory, setStampHistory] = useState<any>([]);
  const [chatId, setChatId] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef([]);
  stateRef.current = stampResponse;

  useEffect(() => {
    if (!chatId) {
      const date = new Date();
      const random = Math.floor(Math.random() * 100000000);
      setChatId(`${date.getTime()}-${random}`);
    }
  }, [chatId]);

  const recordEvent = async (response: Message) => {
    const incompleteResponseContent = [
      "The provide information does not include",
      "The provided information does not specify",
      "unable to provide",
      "I don't have direct access",
      "The context provided does not include",
    ];
    setStampLoading(true);
    let status = "complete";
    if (
      incompleteResponseContent.some((phrase) =>
        response.content.includes(phrase),
      )
    ) {
      status = "incomplete";
    }

    const data = {
      latestResponse: response,
      chatHistory: messages,
      stampHistory: stampHistory,
      chatId: chatId,
      status: status,
    };

    // Create a file from the JSON data
    const body = JSON.stringify(data);
    try {
      const res = await fetch("http://localhost:8000/events/record-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const result = await res.json();
      setStampLoading(false);
      return result;
    } catch (error) {
      console.error("Record Event Error:", error);
      setStampLoading(false);
    }
  };

  const updateEvent = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/events/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (
        intervalRef.current &&
        data &&
        data.stamp &&
        data.stamp.status &&
        data.stamp.status === "RECORDED"
      ) {
        console.log("STAMP RESPONSE", data);
        setStampResponse([...stampResponse, data]);
        setStampHistory((prev: any) => {
          return [...prev, data.stamp];
        });
        //@ts-ignore
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return data;
    } catch (error) {
      console.error("Update Event Error:", error);
    }
  };

  return (
    <div className={"lg:w-full lg:ml-64 "}>
      {props.tabValue === "chat" && (
        <div className="flex h-screen flex-col items-center p-24 place-content-center">
          <div className="max-w-5xl w-full space-y-4">
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              reload={reload}
              stop={stop}
              stampResponse={stampResponse}
              stampLoading={stampLoading}
              setStampResponse={setStampResponse}
            />
            <ChatInput
              input={input}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              isLoading={isLoading}
              multiModal={true}
            />
          </div>
        </div>
      )}
      {props.tabValue === "events" && <AuditWrapper />}
      {props.tabValue === "analytics" && <div>ANALYTICS</div>}
    </div>
  );
}
