import axios from "axios";
import Image from "next/image";
import React from "react";
import ClubActionButton from "../../../components/app/club/ClubActionButton";
import Link from "next/link";
import { LINKS } from "../../link/[slug]";

export async function getServerSideProps(context: any) {
  const internalCode = context.params.internalCode;

  const res = await axios.get(
    `https://api.scorecardgrades.com/v1/clubs/public/clubDownloadPromo`,
    {
      params: {
        internalCode,
      },
    }
  );

  // Pass data to the page via props
  return {
    props: {
      internalCode: internalCode,
      clubPicture: res.data.clubPicture,
    },
  };
}

export default function Continue(props: {
  internalCode: string;
  clubPicture: string;
}) {
  return (
    <div className="w-full h-full from-club-100 to-club-101 bg-gradient-to-b overflow-x-hidden ">
      <meta name="theme-color" id="themeMetaTag" content="#B4E4FF" />
      <div className="max-w-lg w-full mx-auto px-4 overflow-hidden pb-8">
        <div className="">
          <div className="mt-4 mb-12 px-12 flex-shrink">
            <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden mx-auto">
              <Image
                src={`https://api.scorecardgrades.com/v1/images/get/${props.clubPicture}`}
                width={128}
                height={128}
                alt="Club photo"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mb-4 mt-8">
              Use Scorecard to Join
            </h1>
            <p className="font-os font-bold text-blue-800 tracking-normal text-center">
              Your friends are using Scorecard to check their grades and join
              clubs.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center flex-shrink-0">
            <Link href={LINKS.ios}>
              <ClubActionButton>
                {/* <span>💙</span> */}
                <span>Continue</span>
              </ClubActionButton>
            </Link>
            <div>
              <p className="font-os tracking-normal text-gray-600 text-sm">
                or
              </p>
            </div>
            <Link href={`/club/${props.internalCode}/join`}>
              <div className="bg-[#BFDAFF] py-2 px-4 rounded-lg font-os text-sm tracking-normal">
                Join without the app
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
