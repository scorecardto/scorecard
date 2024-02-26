import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { IoExtensionPuzzle } from "react-icons/io5";
import ExampleCourseCard from "../components/info/ExampleCourseCard";
import ExampleCourseCardArray from "../components/info/ExampleCourseCardArray";
import { useEffect } from "react";
import { hasExtension } from "../components/core/ExtensionConnector";

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo titleTemplate="%s" title="Scorecard: Free Grade Viewer" />

      <div className="hidden md:block absolute top-0 right-0 p-4 z-10 font-os text-white opacity-50">
        <Link href="/app">Open Desktop App</Link>
      </div>
      <main className="fixed md:hidden w-full h-full top-0 left-0 flex flex-col from-[#3FB2E3] to-[#1088BC] bg-gradient-to-tr font-os gap-10 px-10">
        <div className="pt-10">
          <Image
            src="/assets/scorecard-512.png"
            width={60}
            height={60}
            alt="Scorecard"
          />
          <p
            className="
          text-xl sm:text-2xl text-white pr-10 sm:pr-20 py-10 leading-relaxed"
          >
            Scorecard is the best way to check your grades: you can customize
            classes, get notifications, and test potential grades.
          </p>
          <Link href="/link/ios">
            <div className="cursor-pointer transform transition-all duration-300">
              <Image
                src="/assets/img/display/download-badge.svg"
                width={200}
                height={200}
                alt="Scorecard"
              />
            </div>
          </Link>
        </div>
        <Image
          src="/assets/img/display/iphone-0.png"
          width={400}
          height={652}
          alt="Scorecard"
        />
      </main>
      <main className="hidden md:flex fixed w-full h-full top-0 left-0 from-[#3FB2E3] to-[#1088BC] bg-gradient-to-tr font-os justify-center gap-10 px-10">
        <div className="absolute bottom-0 right-0 m-4">
          <p className="font-mono text-white text-center">Scan to Download</p>
          <Image
            src="/assets/img/qr/App Store.png"
            width={160}
            height={160}
            alt="Scorecard"
          />
        </div>
        <div className="flex flex-row items-end gap-8">
          <Image
            src="/assets/img/display/iphone-0.png"
            width={400}
            height={652}
            alt="Scorecard"
          />
        </div>
        <div className="flex flex-col gap-8 px-4 h-full justify-center text-white text-xl lg:text-2xl max-w-md lg:max-w-lg leading-normal">
          <Image
            src="/assets/scorecard-512.png"
            width={96}
            height={96}
            alt="Scorecard"
          />
          <p>
            Scorecard is the best way to check your grades: you can customize
            classes, get notifications, and test potential grades.
          </p>
          <Link href="/link/ios">
            <div className="hover:rotate-3 cursor-pointer transform transition-all duration-300">
              <Image
                src="/assets/img/display/download-badge.svg"
                width={200}
                height={200}
                alt="Scorecard"
              />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
