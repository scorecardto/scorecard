import axios from "axios";
import React from "react";
import ClubPreviewCard from "../../../components/app/club/ClubPreviewCard";
import ClubMajorPreviewCard from "../../../components/app/club/ClubMajorPreviewCard";

export default function Index({ clubs }: any) {
  return (
    <div className="from-club-100 to-club-101 bg-gradient-to-b h-full">
      <meta name="theme-color" id="themeMetaTag" content="#B4E4FF" />
      <div className="max-w-lg w-full mx-auto px-4  h-full overflow-x-hidden">
        {clubs.length === 1 ? (
          <>
            <ClubMajorPreviewCard {...clubs[0]} />
          </>
        ) : (
          <>
            <h1 className="font-bold text-2xl text-center mt-8 mb-20">
              Choose a Club to Join
            </h1>
            {clubs.map((c: any, i: number) => {
              return (
                <>
                  <ClubPreviewCard key={i} {...c} />
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const clubCode = context.params.slug;

  const res = await axios.get(
    `https://api.scorecardgrades.com/v1/clubs/search`,
    {
      params: {
        clubCode,
      },
    }
  );

  // Pass data to the page via props
  return {
    props: {
      clubs: res.data.clubs,
    },
  };
}
