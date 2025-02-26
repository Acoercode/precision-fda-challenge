import { Message } from "ai";

export interface ChatHandler {
  messages: Message[];
  input: string;
  tabValue: string;
  isLoading: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    ops?: {
      data?: any;
    },
  ) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reload?: () => void;
  stop?: () => void;
  save?: () => void;
  setStampResponse?: (data: any) => void;
  stampResponse?: any;
  stampLoading?: boolean;
  onFileUpload?: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
  setTabValue?: (value: string) => void;
}
