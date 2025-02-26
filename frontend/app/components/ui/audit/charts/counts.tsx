// @ts-ignore
const Counts = ({ totalCount, todayCount }) => {
  return (
    <div className="flex flex-col ml-20 pr-10">
      <div className="flex flex-wrap my-1 -mx-4">
        <div className="w-full lg:w-2/3 pr-20 pt-5">
          <div className="flex items-center flex-row w-full">
            <div className="flex flex-col justify-around flex-grow ml-5 text-[#0b0b0b]">
              <div className="text-xl whitespace-nowrap">Chat AI Audit</div>
              <div className="text-sm">
                This tool can be used to track all interactions done between a
                human and our AI agent to ensure that provided answers are
                Ethical and respect our internal rules.
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-row w-full lg:w-1/3 p-2">
          <div className="lg:w-1/2 p-2">
            <div className="flex items-center flex-row w-full bg-[#343e4d] rounded-md p-3">
              <div className="flex text-indigo-500 dark:text-white items-center bg-[#4f5c6e] dark:bg-[#0F172A] p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-around flex-grow ml-5 text-white">
                <div className="text-xs whitespace-nowrap">Total Events</div>
                <div className="">{totalCount}</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 p-2">
            <div className="flex items-center flex-row w-full bg-[#343e4d] rounded-md p-3">
              <div className="flex text-indigo-500 dark:text-white items-center bg-[#4f5c6e] dark:bg-[#0F172A] p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-around flex-grow ml-5 text-white">
                <div className="text-xs whitespace-nowrap">Events Today</div>
                <div className="">{todayCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counts;
