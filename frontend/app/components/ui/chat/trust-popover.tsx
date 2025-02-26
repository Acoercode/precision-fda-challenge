// @flow strict
"use client";
import { useEffect, useRef, useState } from "react";

function ReactPopover({
  // @ts-ignore
  children,
  // @ts-ignore
  content = "---",
  trigger = "click",
}) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  const successTooltip = () => {
    return (
      <ul>
        <li className="success_tooltip" style={{ marginLeft: 35 }}>
          Cryptographic Signature Validated
        </li>
        <li className="success_tooltip" style={{ marginLeft: 35 }}>
          Network Validation Verified
        </li>
        <li className="success_tooltip" style={{ marginLeft: 35 }}>
          Proof of Authenticity Passed
        </li>
        <li style={{ marginLeft: 35 }}>
          <a
            href={`https://hederaexplorer.io/search-details/transaction/${content}`}
            target={"_blank"}
            className={"txLink"}
          >
            {"View Transaction"}
          </a>
        </li>
      </ul>
    );
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className="min-w-fit w-[400px] h-fit absolute left-[0%] bottom-[100%] z-999 transition-all"
      >
        <div className="rounded-2xl bg-white p-3 mb-[10px] shadow-2xl ring-4 ring-gray-300">
          {successTooltip()}
        </div>
      </div>
    </div>
  );
}

export default ReactPopover;
