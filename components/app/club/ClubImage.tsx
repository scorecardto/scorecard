import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ClubImage(props: {
  width: number;
  height: number;
  internalCode?: string;
  clubPicture?: string;
  heroColor?: string;
  emoji?: string;
  borderWidth?: number;
}) {
  const bw = props.borderWidth ?? 0;
  return (
    <div
      style={{
        width: props.width - bw * 2,
        height: props.height - bw * (props.clubPicture ? 2 : 1),
        backgroundColor: props.clubPicture
          ? undefined
          : props.heroColor || "#4A93FF",
      }}
      className="justify-center items-center flex"
    >
      {props.clubPicture ? (
        <Image
          src={`https://api.scorecardgrades.com/v1/images/get/${props.clubPicture}`}
          width={props.width - bw * 2}
          height={props.height - bw * 2}
          alt="Club photo"
        />
      ) : (
        <p
          style={{
            fontSize: props.height / 1.8,
          }}
        >
          {props.emoji || "🙂"}
        </p>
      )}
    </div>
  );
}
