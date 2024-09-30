import React from "react";

export default function Index({ clubs }: any) {
  return (
    <div className="from-club-100 to-club-101 bg-gradient-to-b h-full">
      <meta name="theme-color" id="themeMetaTag" content="#B4E4FF" />

      <h1 className="font-bold text-2xl text-center mb-20">Unsubscribe</h1>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const unsubscribeCode = context.params.slug;

  //   const res = await axios.get(
  //     `https://api.scorecardgrades.com/v1/clubs/search`,
  //     {
  //       params: {
  //         clubCode,
  //       },
  //     }
  //   );

  // Pass data to the page via props
  return {
    props: {
      //   clubs: res.data.clubs,
    },
  };
}
