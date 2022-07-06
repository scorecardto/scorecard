import { IoTrendingUp } from "react-icons/io5";

export default function Summary() {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-8">
        <h1>Your Scorecard</h1>

        <div className="flex flex-row justify-between items-end gap-8">
          <div className="relative w-fit pt-4 pb-12 px-6 flex">
            <div className="border-gray-300 absolute h-full w-full top-0 left-0 border-t border-x rounded-t-lg"></div>
            <div className="z-10 flex flex-row gap-6 items-center">
              <div className="flex flex-col text-blue-500 text-4xl">
                <IoTrendingUp />
              </div>
              <div className="flex flex-col gap-2 max-w-[24rem]">
                <b>Notifications Appear Here</b>
                <p className="text-gray-400">
                  Thanks for chosing Scorecard, the free grade viewer for
                  Frontline.
                </p>
              </div>
            </div>
            <div className="border-gray-300 bg-gray-50 absolute h-10 w-full bottom-0 left-0 border-t border-x rounded-t-lg"></div>
            <div className="border-gray-300 bg-gray-100 absolute h-5 w-full bottom-0 left-0 border-t border-x rounded-t-lg"></div>
          </div>

          <div className="flex-none w-fit flex flex-col gap-2 lg:bg-blue-200 lg:flex-row lg:gap-0.5 lg:rounded-lg lg:overflow-hidden">
            <div className="bg-blue-100 px-8 py-3 rounded-lg lg:rounded-none">
              GPA Calculator
            </div>
            <div className="bg-gray-100 lg:bg-blue-100 py-1 lg:px-8 lg:py-3 text-center text-xs rounded-lg lg:rounded-none lg:text-base">
              More Tools
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
