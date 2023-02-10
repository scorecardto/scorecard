import Link from "next/link";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

export default function BackLink(props: { children: string; href: string }) {
  return (
    <div className="fixed top-5 left-5">
      <Link href={props.href}>
        <div
          tabIndex={0}
          className="bg-accent-100 hover:bg-accent-200 dark:bg-accent-600 hover:dark:bg-accent-700 cursor-pointer py-2 px-4 border border-accent-200 dark:border-accent-700 rounded-md flex gap-2 items-center text-accent-300"
        >
          <IoArrowBackOutline />
          <p className="text-accent-300">{props.children}</p>
        </div>
      </Link>
    </div>
  );
}
