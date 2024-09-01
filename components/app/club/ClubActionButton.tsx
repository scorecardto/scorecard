import React from "react";

export default function ClubActionButton(props: { children: any[] | any }) {
  return (
    <div className="font-os font-bold tracking-normal bg-black text-white py-6 px-12 text-2xl w-fit rounded-full flex gap-2">
      {props.children}
    </div>
  );
}
