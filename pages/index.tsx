import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { IoExtensionPuzzle } from "react-icons/io5";
import ExampleCourseCard from "../components/info/ExampleCourseCard";
import ExampleCourseCardArray from "../components/info/ExampleCourseCardArray";

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo titleTemplate="%s" title="Scorecard: Free Grade Viewer" />
      <main className="fixed w-full h-full top-0 left-0 flex justify-center items-center from-blue-100 to-purple-100 bg-gradient-to-tr font-os">
        <div className="flex flex-col gap-8">
          <ExampleCourseCardArray />
          <div className="flex flex-col gap-4 px-4">
            <h1 className="h1 font-normal">Free Gradebook Viewer.</h1>
            <div className="flex gap-2 text-mono-l-500">
              <p>Compatible with</p>
              <Image
                src="/assets/frontline.svg"
                width={20}
                height={20}
                alt="Frontline SIS"
              />
              <p>Frontline SIS</p>
            </div>
            <div className="flex gap-4">
              <Link href="/link/chrome">
                <button className="flex gap-4 py-4 px-6 rounded-md bg-accent-400 text-white items-center">
                  <IoExtensionPuzzle />
                  <span>Install for Chrome</span>
                </button>
              </Link>
              <Link href="/app">
                <button className="flex gap-4 py-4 px-6 rounded-md border-2 border-mono-l-400 text-mono-l-500 items-center bg-mono-l-200">
                  <span>Go to App</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
