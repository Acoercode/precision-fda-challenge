import { Loader2, PauseCircle, RefreshCw } from "lucide-react";

import { Button } from "../button";
import { ChatHandler } from "./chat.interface";

export default function ChatActions(
  props: Pick<
    ChatHandler,
    | "stop"
    | "reload"
    | "save"
    | "stampLoading"
    | "setStampResponse"
    | "stampResponse"
  > & {
    showReload?: boolean;
    showStop?: boolean;
  },
) {
  const handleRegenerate = () => {
    const responseUpdate = [...props.stampResponse];
    responseUpdate.pop();
    // @ts-ignore
    props.setStampResponse(responseUpdate);
    // @ts-ignore
    props.reload();
  };

  return (
    <div className="space-x-4">
      {props.showStop && (
        <Button variant="outline" size="sm" onClick={props.stop}>
          <PauseCircle className="mr-2 h-4 w-4" />
          Stop generating
        </Button>
      )}
      {props.stampLoading && (
        <Button variant="secondary" size="sm" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Recording Event...
        </Button>
      )}
      {props.showReload && (
        <>
          <Button variant="outline" size="sm" onClick={handleRegenerate}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        </>
      )}
    </div>
  );
}
