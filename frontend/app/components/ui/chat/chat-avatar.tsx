import Image from "next/image";
import { FaUser } from "react-icons/fa";
import cteLogo from "../../../../public/AIChatIcon.svg";

export default function ChatAvatar({ role }: { role: string }) {
  if (role === "user") {
    return (
      <div className="user-icon-container">
        <div className="user-icon">
          <FaUser className="h-5 w-5" />
        </div>
      </div>
    );
  }

  return (
    <div className="cancer-trials-explorer-logo-container">
      <Image
        className="rounded-md"
        src={cteLogo}
        alt="CTE Logo"
        width={24}
        height={24}
        priority
      />
    </div>
  );
}
