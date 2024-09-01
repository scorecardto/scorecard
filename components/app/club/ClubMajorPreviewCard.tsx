import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import ClubActionButton from "./ClubActionButton";

export default function ClubMajorPreviewCard(props: {
  internalCode?: string;
  clubPicture?: string;
  clubName: string;
  schoolName: string;
  ownerName: string;
}) {
  console.log(props);

  return (
    <Link href={`/club/${props.internalCode}/continue`}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full px-8 mt-16 pt-16 pb-8 rounded-3xl text-white from-club-200 to-club-201 bg-gradient-to-b relative">
          <div className="w-32 h-32 rounded-full bg-gray-100 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden border-4 border-white">
            <Image
              src={`https://api.scorecardgrades.com/v1/images/get/${props.clubPicture}`}
              width={128}
              height={128}
              alt="Club photo"
            />
          </div>
          <h1 className="font-bold text-2xl mb-4 text-center pt-8 ">
            {props.clubName}
          </h1>
          <p className="font-os text-base mb-1 text-center">
            Sign up to get text and email notifications from this club!
          </p>
        </div>
        <ClubActionButton>JOIN</ClubActionButton>
      </div>
    </Link>
  );
}
