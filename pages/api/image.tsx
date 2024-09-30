/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import admin from "firebase-admin";
import axios from "axios";

export const config = {
  runtime: "edge",
};
export default async function handler(request: NextRequest) {
  const source = new URL(request.url).searchParams.get("source");

  if (source === "clubPicture") {
    const internalCodeParam = new URL(request.url).searchParams.get(
      "internalCode"
    );

    const data = await (
      await fetch(
        new URL(
          "https://api.scorecardgrades.com/v1/clubs/public/clubDownloadPromo?internalCode=" +
            internalCodeParam
        )
      )
    ).json();
    const emoji = data.emoji || "🙂";
    const color = data.heroColor || "#4A93FF";

    try {
      return new ImageResponse(
        (
          <div
            style={{
              background: color,
              height: "100%",
              width: "100%",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              flexWrap: "nowrap",
            }}
          >
            <p
              style={{
                fontSize: 64,
                color: "black",
                whiteSpace: "pre",
              }}
            >
              {emoji}
            </p>
          </div>
        ),
        {
          width: 128,
          height: 128,
        }
      );
    } catch (e: any) {
      console.log(`${e.message}`);
      return new Response(`Failed to generate the image`, {
        status: 500,
      });
    }
  } else {
    return new Response(`No valid source provided`, {
      status: 400,
    });
  }
}
