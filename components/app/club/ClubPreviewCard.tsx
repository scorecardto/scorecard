import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import ClubImage from "./ClubImage";

export default function ClubPreviewCard(props: {
  emoji?: string;
  heroColor?: string;
  internalCode?: string;
  clubPicture?: string;
  clubName: string;
  schoolName: string;
  ownerName: string;
}) {
  console.log(props);

  return (
    <Link href={`/club/${props.internalCode}/continue`}>
      <div className="w-full px-6 mt-16 pb-4 pt-16 rounded-3xl text-white bg-blue-500 relative">
        <div className="flex justify-end flex-row absolute right-0 top-0 py-6 px-4">
          <IoChevronForwardOutline size={20} />
        </div>
        <div className="w-24 h-24 rounded-full bg-gray-100 absolute top-0 -translate-y-1/2 overflow-hidden border-4 border-white">
          <ClubImage
            borderWidth={4}
            width={128}
            height={128}
            clubPicture={props.clubPicture}
            internalCode={props.internalCode}
            emoji={props.emoji}
            heroColor={props.heroColor}
          />
        </div>
        <h3 className="font-bold text-xl mb-4">{props.clubName}</h3>
        <p className="font-os text-base mb-1">at {props.schoolName}</p>
        <p className="font-os text-sm text-gray-200">
          Hosted by {props.ownerName}
        </p>
      </div>
    </Link>
  );
}
