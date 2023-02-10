import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import BackLink from "./BackLink";

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
        <BackLink href={backLink}>{backLinkText}</BackLink>
      )}
    </div>
  );
}
