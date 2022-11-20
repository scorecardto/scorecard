import React from "react";

export default function Loading(props: { size?: number; center?: boolean }) {
  const size = props.size ?? 20;
  if (props.center) {
    // center component in middle of screen
    return (
      <div className="flex justify-center items-center h-screen">
        <title>Loading...</title>
        <Loading size={size} center={false} />
      </div>
    );
  }
  return (
    <svg
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      //   xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 84.03 84.03"
      width={`${size}px`}
      height={`${size}px`}
      className="animate-spin"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0"
          y1="25.51"
          x2="84.03"
          y2="25.51"
          gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="var(--stop-color, gray)"
            stopOpacity="0"
          />
          <stop
            offset=".22"
            stopColor="var(--stop-color, gray)"
            stopOpacity=".32"
          />
          <stop
            offset=".45"
            stopColor="var(--stop-color, gray)"
            stopOpacity=".62"
          />
          <stop
            offset=".66"
            stopColor="var(--stop-color, gray)"
            stopOpacity=".83"
          />
          <stop
            offset=".85"
            stopColor="var(--stop-color, gray)"
            stopOpacity=".95"
          />
          <stop offset="1" stopColor="var(--stop-color, gray)" />
        </linearGradient>
      </defs>
      <path
        d="M75.03,42.02c0-18.23-14.78-33.02-33.02-33.02S9,23.78,9,42.02"
        style={{
          fill: "none",
          opacity: ".5",
          stroke: "url(#linear-gradient)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "18px",
        }}
      />
    </svg>
  );
}
