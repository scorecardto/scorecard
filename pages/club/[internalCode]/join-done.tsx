import axios from "axios";
import Image from "next/image";
import React, {
  FormEvent,
  FormEventHandler,
  HTMLInputTypeAttribute,
  useEffect,
  useMemo,
  useState,
} from "react";
import ClubActionButton from "../../../components/app/club/ClubActionButton";
import Link from "next/link";
import phone from "phone";
import { validate } from "email-validator";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/router";
import { LINKS } from "../../link/[slug]";
import ClubImage from "../../../components/app/club/ClubImage";

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
      emoji: res.data.emoji || "🙂",
      heroColor: res.data.heroColor || "#4A93FF",
    },
  };
}

export default function JoinDone(props: {
  internalCode: string;
  clubPicture: string;
  emoji?: string;
  heroColor?: string;
}) {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace(LINKS.ios);
    }, 700);
  }, []);
  return (
    <div className="w-full h-full from-club-100 to-club-101 bg-gradient-to-b overflow-x-hidden ">
      <meta name="theme-color" id="themeMetaTag" content="#B4E4FF" />
      <div className="max-w-lg w-full mx-auto px-4 overflow-hidden">
        <div className="">
          <div className="mt-8 mb-24 px-12 flex-shrink">
            <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden mx-auto">
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
            <h1 className="font-bold text-3xl text-center mb-4 mt-8">
              Welcome!
            </h1>
            <p className="font-os font-bold text-blue-800 tracking-normal text-center">
              You&apos;ll recieve texts and emails whenever there&apos;s a new
              post. Now, download the Scorecard app to participate in the club.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center flex-shrink-0">
            <Link href={LINKS.ios}>
              <ClubActionButton>
                <span>💙</span>
                <span>Download</span>
              </ClubActionButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
