import axios from "axios";
import React, { useCallback, useState } from "react";
import ClubImage from "../../components/app/club/ClubImage";
import Loading from "../../components/core/util/Loading";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function Index(props: {
  internalCode: string;
  unsubscribeCode: string;
  clubPicture: string;
  emoji?: string;
  heroColor?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const unsub = useCallback(
    (allClubs: boolean) => {
      if (loading) return;
      setLoading(true);

      axios
        .post("/api/forward", {
          pathname: "/v1/public/unsubscribe",
          data: {
            code: props.unsubscribeCode,
            allClubs: allClubs,
          },
          type: "post",
        })
        .then(() => {
          setSuccess(true);
        });
    },
    [loading]
  );
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
            <h1 className="font-bold text-3xl text-center mb-16 mt-8">
              Unsubscribe
            </h1>

            {loading ? (
              <div className="justify-center items-center w-full flex">
                {success ? (
                  <IoCheckmarkCircle className="text-green-500 text-8xl" />
                ) : (
                  <Loading size={64} />
                )}
              </div>
            ) : (
              <div>
                <div>
                  <button
                    onClick={() => {
                      unsub(false);
                    }}
                    className="bg-black text-white w-full py-4 font-os rounded-xl text-xl"
                  >
                    Leave this Club
                  </button>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => {
                      unsub(true);
                    }}
                    className="text-[#4f5d72] py-2 font-os rounded-xl text-base mt-4 mx-auto "
                  >
                    Leave All My clubs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const unsubscribeCode = context.params.slug;

  const res = await axios.get(
    `https://api.scorecardgrades.com/v1/public/unsubscribePreview`,
    {
      params: {
        unsubscribeCode,
      },
    }
  );

  // Pass data to the page via props
  return {
    props: {
      unsubscribeCode,
      internalCode: res.data.internalCode || "",
      clubPicture: res.data.clubPicture || "",
      emoji: res.data.emoji || "🙂",
      heroColor: res.data.heroColor || "#4A93FF",
    },
  };
}
