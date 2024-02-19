import { useRouter } from "next/router";
import React from "react";

export default function DyanmicInvitePage() {
  const router = useRouter();
  const { name } = router.query;

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
