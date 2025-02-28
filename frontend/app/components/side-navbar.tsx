"use client";
import { ChatHandler } from "@/app/components/ui/chat";
import Image from "next/image";
import { AiOutlineAudit } from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { RiExternalLinkFill } from "react-icons/ri";
import acoerLogo from "../../public/BuiltByAcoer.svg";
import precisionFDALogo from "../../public/precisionFDA.white.svg";

export default function SideNavbar(
  props: Pick<ChatHandler, "setTabValue" | "tabValue">,
) {
  const handleOnClick = (type: string) => {
    // @ts-ignore
    props.setTabValue(type);
  };
  return (
    <div className="relative flex flex-col bg-clip-border bg-[#343e4d] text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 divide-y">
      <div className="mb-6 p-4 mt-6">
        <Image
          className="rounded-xl"
          src={precisionFDALogo}
          alt="Logo"
          width={200}
          style={{ paddingBottom: 10, margin: "auto" }}
          priority
        />
      </div>
      <div className="shrink-0 group block">
        <div className="flex items-center mt-2 ml-3">
          {/*<span className="inline-block size-[24px] bg-gray-100 rounded-full overflow-hidden">*/}
          {/*  <svg className="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none"*/}
          {/*       xmlns="http://www.w3.org/2000/svg">*/}
          {/*    <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"></rect>*/}
          {/*    <path*/}
          {/*        d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"*/}
          {/*        fill="currentColor"></path>*/}
          {/*    <path*/}
          {/*        d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"*/}
          {/*        fill="currentColor"></path>*/}
          {/*  </svg>*/}
          {/*</span>*/}
          <div className="ms-3">
            <p className="text-medium font-medium text-gray-400 dark:text-neutral-500">
              Cosmetics Guidances AI
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col justify-between divide-y mt-2"
        style={{ height: "100vh" }}
      >
        <nav className="flex flex-col gap-2.5 min-w-[240px] p-2 text-base font-normal text-white">
          <div
            role="button"
            onClick={() => handleOnClick("chat")}
            className={
              props.tabValue === "chat"
                ? "mt-6 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all bg-[#4f5c6e] text-[#fff] outline-none"
                : "mt-6 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-[#4f5c6e40] hover:bg-opacity-80 focus:bg-[#4f5c6e] focus:bg-opacity-80 active:bg-yellow-50 active:bg-opacity-80 hover:text-[#fff] focus:text-[#fff] active:text-[#fff] outline-none"
            }
          >
            <div className="grid place-items-center mr-4">
              <IoChatbubblesOutline />
            </div>
            Chat
          </div>
          <div
            role="button"
            onClick={() => handleOnClick("events")}
            className={
              props.tabValue === "events"
                ? "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all bg-[#4f5c6e] text-[#fff] outline-none"
                : "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-[#4f5c6e40] hover:bg-opacity-80 focus:bg-[#4f5c6e] focus:bg-opacity-80 active:bg-yellow-50 active:bg-opacity-80 hover:text-[#fff] focus:text-[#fff] active:text-[#fff] outline-none"
            }
          >
            <div className="grid place-items-center mr-4">
              <AiOutlineAudit />
            </div>
            Audit
          </div>
          {/*<div*/}
          {/*    role="button"*/}
          {/*    // onClick={() => handleOnClick("analytics")}*/}
          {/*    className={*/}
          {/*        props.tabValue === "analytics"*/}
          {/*            ? "cursor-not-allowed flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all bg-[#FFDB58] text-[#0D0D0D] outline-none"*/}
          {/*            : "cursor-not-allowed flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-[#FFDB5880] hover:bg-opacity-80 focus:bg-[#FFDB58] focus:bg-opacity-80 active:bg-yellow-50 active:bg-opacity-80 hover:text-[#0D0D0D] focus:text-[#0D0D0D] active:text-[#0D0D0D] outline-none"*/}
          {/*    }*/}
          {/*>*/}
          {/*    <div className="grid place-items-center mr-4">*/}
          {/*        <IoAnalyticsOutline/>*/}
          {/*    </div>*/}
          {/*    Analytics*/}
          {/*</div>*/}
        </nav>
        <nav className="flex flex-col gap-2.5 min-w-[240px] p-2 text-base font-normal text-white">
          <a
            href="https://www.fda.gov/cosmetics/cosmetics-guidance-regulation/cosmetics-guidance-documents"
            target={"_blank"}
          >
            <div
              role="button"
              className={
                "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-[#4f5c6e40] hover:bg-opacity-80 focus:bg-[#4f5c6e] focus:bg-opacity-80 active:bg-yellow-50 active:bg-opacity-80 hover:text-[#fff] focus:text-[#fff] active:text-[#fff] outline-none"
              }
            >
              <div className="grid place-items-center mr-4">
                <RiExternalLinkFill />
              </div>
              FDA Cosmetics Guidance Documents
            </div>
          </a>
          {/*<a href="/api/auth/logout">*/}
          {/*  <div*/}
          {/*    role="button"*/}
          {/*    className={*/}
          {/*      "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-[#4f5c6e40] hover:bg-opacity-80 focus:bg-[#4f5c6e] focus:bg-opacity-80 active:bg-yellow-50 active:bg-opacity-80 hover:text-[#fff] focus:text-[#fff] active:text-[#fff] outline-none"*/}
          {/*    }*/}
          {/*    style={{ marginBottom: 80 }}*/}
          {/*  >*/}
          {/*    <div className="grid place-items-center mr-4">*/}
          {/*      <RiLogoutBoxLine />*/}
          {/*    </div>*/}
          {/*    Log Out*/}
          {/*  </div>*/}
          {/*</a>*/}
          <a href="https://acoer.com/" target={"_blank"}>
            <div className="flex flex-col items-center">
              <div className="mb-6 p-4 mt-6">
                <Image
                  className="rounded-xl"
                  src={acoerLogo}
                  alt="Acoer Logo"
                  height={50}
                  priority
                  style={{ filter: "grayscale(100%)" }}
                />
              </div>
            </div>
          </a>
        </nav>
      </div>
    </div>
  );
}
