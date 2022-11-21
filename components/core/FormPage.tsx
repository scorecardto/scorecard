import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

export default function FormPage(props: {
  title: string;
  description: string;
  children: React.ReactNode;
  omitTopPadding?: boolean;
  backLink?: string;
  backLinkText?: string;
}) {
  const { backLink, backLinkText } = props;

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
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

            <h1 className="h1">{props.title}</h1>
          </div>
          <p className="max-w-sm p">{props.description}</p>
        </div>
      </div>
      <div
        className={`w-full lg:w-3/5 lg:min-h-full lg:h-max h-full bg-accent-100 dark:bg-accent-800 py-10 ${
          props.omitTopPadding ? "" : "lg:pt-72"
        }`}
      >
        {props.children}
      </div>
      {backLink && backLinkText && (
        <div className="fixed top-5 left-5">
          <Link href={backLink}>
            <div className="bg-accent-100 hover:bg-accent-200 dark:bg-accent-600 hover:dark:bg-accent-700 cursor-pointer py-2 px-4 border border-accent-200 dark:border-accent-700 rounded-md flex gap-2 items-center text-accent-300">
              <IoArrowBackOutline />
              <p className="text-accent-300">{backLinkText}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
