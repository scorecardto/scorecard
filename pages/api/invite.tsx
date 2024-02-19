/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import admin from "firebase-admin";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const nameParam = new URLSearchParams(request.url).get("name");

  let userCount = 0;

  try {
    userCount = (
      await (
        await fetch(
          new URL("https://scorecardgrades.com/api/metrics/getUserCount")
        )
      ).json()
    )?.userCount;
  } catch (e: any) {
    console.log(e.message);
  }

  const bold = await fetch(
    new URL("/public/assets/font/sf-rounded-bold.ttf", import.meta.url)
  );
  const semi = await fetch(
    new URL("/public/assets/font/sf-rounded-semibold.ttf", import.meta.url)
  );
  const medium = await fetch(
    new URL("/public/assets/font/sf-rounded-medium.ttf", import.meta.url)
  );

  if (!bold.ok || !semi.ok || !medium.ok) {
    throw new Error("Failed to fetch the font file");
  }

  const boldBuffer = await bold.arrayBuffer();
  const semiBuffer = await semi.arrayBuffer();
  const mediumBuffer = await medium.arrayBuffer();

  const image = await fetch(
    new URL("/public/assets/scorecard-512.png", import.meta.url)
  );

  // const letterEmoji = await fetch(
  //   new URL("/public/assets/emoji/💌.png", import.meta.url)
  // );

  // const pointDownEmoji = await fetch(
  //   new URL("/public/assets/emoji/👇.png", import.meta.url)
  // );

  // const gradeEmoji = await fetch(
  //   new URL("/public/assets/emoji/💯.png", import.meta.url)
  // );

  if (!image.ok) {
    throw new Error("Failed to fetch the image file");
  }

  const imageBuffer = await image.arrayBuffer();
  // const letterEmojiBuffer = await letterEmoji.arrayBuffer();
  // const pointDownEmojiBuffer = await pointDownEmoji.arrayBuffer();
  // const gradeEmojiBuffer = await gradeEmoji.arrayBuffer();

  try {
    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: "linear-gradient(45deg, #87D4FF, #7A9FFF)",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            fontFamily: "SF Rounded Bold",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 80,
              gap: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              {/* @ts-ignore  */}
              <img height={168} src={imageBuffer} alt="Scorecard" />
            </div>
            <h1
              style={{
                fontSize: 46,
                color: "black",
                fontFamily: "SF Rounded Bold",
              }}
            >
              Join {nameParam ?? "me"} on Scorecard 💌
            </h1>

            <p
              style={{
                fontSize: 28,
                marginRight: 60,
                lineHeight: 1.5,
                marginLeft: 60,
                marginTop: 0,
                marginBottom: 0,
                color: "#2A51B5",
                fontFamily: "SF Rounded Medium",
              }}
            >
              {userCount > 5
                ? `${nameParam ?? "Adrian C"} and ${
                    userCount - 1
                  } friends are using Scorecard to check
                their grades`
                : `${
                    nameParam ?? "Adrian C"
                  } and 50+ friends are using Scorecard to check
                their grades`}
            </p>
          </div>

          <p
            style={{
              fontSize: 28,
              color: "black",
              fontFamily: "SF Rounded Semibold",
              marginTop: 30,
              marginBottom: 30,
              whiteSpace: "pre",
            }}
          >
            💯{"   "}Join the party{"   "}👇
          </p>
        </div>
      ),
      {
        width: 430,
        height: 890,
        fonts: [
          {
            data: boldBuffer,
            name: "SF Rounded Bold",
          },
          {
            data: semiBuffer,
            name: "SF Rounded Semi",
          },
          {
            data: mediumBuffer,
            name: "SF Rounded Medium",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
