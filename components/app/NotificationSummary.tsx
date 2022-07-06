import {
  IoTrendingUp,
  IoTrendingDown,
  IoPulse,
  IoHeart,
} from "react-icons/io5";

export default function NotificationSummary(props: {
  title: string;
  details: string;
  iconType: "TRENDING_UP" | "TRENDING_DOWN" | "TRENDING_FLAT" | "HEART";
}) {
  return (
    <div className="relative w-fit pt-4 pb-12 px-6 flex">
      <div className="border-mono-l-300 dark:border-mono-d-300 absolute h-full w-full top-0 left-0 border-t border-x rounded-t-lg"></div>
      <div className="z-10 flex flex-row gap-6 items-center">
        <div className="flex flex-col text-accent-300 text-4xl">
          {props.iconType === "TRENDING_UP" && <IoTrendingUp />}
          {props.iconType === "TRENDING_DOWN" && <IoTrendingDown />}
          {props.iconType === "TRENDING_FLAT" && <IoPulse />}
          {props.iconType === "HEART" && <IoHeart />}
        </div>
        <div className="flex flex-col gap-2 max-w-[24rem]">
          <b>{props.title}</b>
          <p>{props.details}</p>
        </div>
      </div>
      <div className="border-mono-l-300 dark:border-mono-d-300 bg-mono-l-100 dark:bg-mono-d-100 absolute h-10 w-full bottom-0 left-0 border-t border-x rounded-t-lg"></div>
      <div className="border-mono-l-300 dark:border-mono-d-300 bg-mono-l-200 dark:bg-mono-d-200 absolute h-5 w-full bottom-0 left-0 border-t border-x rounded-t-lg"></div>
    </div>
  );
}
