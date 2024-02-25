import { useRouter } from "next/router";
import React from "react";

export default function DyanmicInvitePage() {
  const router = useRouter();
  const { name } = router.query;

  // if on an iphone, redirect to the app store
  if (
    typeof window !== "undefined" &&
    window.navigator.userAgent.includes("iPhone")
  ) {
    router.push("/link/ios");
  } else if (typeof window !== undefined) {
    router.push("/");
  }

  return (
    <div>
      <meta property="og:title" content="Join me on Scorecard" />
      {/* <meta property="og:type" content="" /> */}
      {/* <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" /> */}
      <meta
        property="og:image"
        content={`https://scorecardgrades.com/api/invite?name=${name}`}
      />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
