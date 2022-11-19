import {
  IoTrendingUp,
  IoTrendingDown,
  IoPulse,
  IoHeart,
} from "react-icons/io5";

export default function Notification(props: {
  title: string;
  details: string;
  iconType: "TRENDING_UP" | "TRENDING_DOWN" | "TRENDING_FLAT" | "HEART";
}) {
  return (
    <div className="relative w-fit py-4 px-6 flex border border-mono-l-300 dark:border-mono-d-300 my-4 rounded-lg">
      <div className="flex flex-row gap-6 items-center">
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
    </div>
  );
}
