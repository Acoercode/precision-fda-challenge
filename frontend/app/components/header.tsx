import Image from "next/image";
import logo from "../../public/logo.png";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <Image
        className="rounded-xl"
        src={logo}
        alt="Logo"
        width={300}
        height={100}
        priority
      />
    </div>
  );
}
