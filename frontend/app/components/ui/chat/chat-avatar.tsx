import Image from "next/image";
import { FaUser } from "react-icons/fa";
import logo from "../../../../public/logo.png";

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
    <div className="logo-container">
      <Image
        className="rounded-md"
        src={logo}
        alt="FDA Logo"
        width={40}
        // height={30}
        priority
      />
    </div>
  );
}
