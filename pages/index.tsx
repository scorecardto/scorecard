import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo titleTemplate="%s" title="Scorecard: Free Grade Viewer" />
      <main className="fixed w-full h-full top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700">
            Work in Progress.
          </h1>
          <p className="text-slate-400">
            Scorecard is a free grade viewer extension for Frontline. Coming
            Late 2022.
          </p>
          <Link href="/app">
            <button className="border-slate-200 rounded-md border py-2 px-4 text-slate-700 font-medium w-fit hover:bg-slate-100">
              Go to App
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
