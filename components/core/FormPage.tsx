import Image from "next/image";
import React from "react";

export default function FormPage(props: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="shrink-0 flex-none w-full lg:w-2/5 lg:h-full py-10 lg:pt-48 px-10">
        <div className="flex flex-col gap-8">
          <div className="flex lg:flex-col lg:gap-8 gap-4 lg:items-start items-center">
            <div className="lg:w-16 lg:h-16 h-8 w-8">
              <Image
                src="/assets/scorecard-512.png"
                width={64}
                height={64}
                alt=""
              />
            </div>

            <h1>{props.title}</h1>
          </div>
          <p className="max-w-sm">{props.description}</p>
        </div>
      </div>
      <div className="w-full lg:w-3/5 lg:min-h-full lg:h-max   h-full bg-accent-100 dark:bg-accent-800 lg:pt-72 pt-10 ">
        {props.children}
      </div>
    </div>
  );
}
