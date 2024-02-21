import Image from "next/image";
import React from "react";
import {
  FiBarChart,
  FiClipboard,
  FiClock,
  FiKey,
  FiMapPin,
  FiSave,
  FiTag,
  FiTv,
  FiType,
  FiUser,
} from "react-icons/fi";
import {
  IoArrowDown,
  IoDesktopOutline,
  IoKeyOutline,
  IoLeafOutline,
  IoSaveOutline,
  IoTimeOutline,
} from "react-icons/io5";
import BackLink from "../components/core/BackLink";
import PrivacyCard from "../components/core/util/PrivacyCard";
import PrivacyCardLine from "../components/core/util/PrivacyCardLine";

export default function PrivacyPolicy() {
  return (
    <div className="">
      <div className="max-w-4xl mx-auto px-10">
        <div className="flex gap-8 flex-col py-8 w-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <Image
                  src="/assets/scorecard-512.png"
                  width={64}
                  height={64}
                  alt=""
                />
              </div>
              <h1 className="h1">Privacy Policy (Mobile)</h1>
            </div>
            <p className="p">
              Even though we don&apos;t have access to your grades, having an
              app that handles grade data in any way requires that we have a
              privacy policy. You can also view our simplified privacy info
              here.
            </p>
            <PrivacyCard
              title="Data We Collect"
              description="This data is stored and may be linked to you."
            >
              <PrivacyCardLine title="Name">
                <FiUser />
              </PrivacyCardLine>
              <PrivacyCardLine title="School and Grade Level">
                <FiMapPin />
              </PrivacyCardLine>
              <PrivacyCardLine title="Class Names">
                <FiClipboard />
              </PrivacyCardLine>
              <PrivacyCardLine title="Usage Data">
                <FiBarChart />
              </PrivacyCardLine>
            </PrivacyCard>
            <PrivacyCard
              title="Notifications"
              description="When you recieve new grades, a Scorecard server helps send you a notification. The server processes to the following data:"
            >
              <PrivacyCardLine title="Assignment Name">
                <FiType />
              </PrivacyCardLine>
              <PrivacyCardLine title="Class">
                <FiClipboard />
              </PrivacyCardLine>
            </PrivacyCard>
            <PrivacyCard
              title="Stored On Device"
              description="This data is stored offline and not accessible to Scorecard."
            >
              <PrivacyCardLine title="Frontline Login">
                <FiKey />
              </PrivacyCardLine>
              <PrivacyCardLine title="Current and Past Grades">
                <FiSave />
              </PrivacyCardLine>
            </PrivacyCard>
          </div>
        </div>
        <div>
          <div className="text-base text-mono-l-600 dark:text-mono-d-600 flex items-center justify-center gap-4 pb-10">
            <IoArrowDown />
            <p className="font-os">Legal Version Below</p>
          </div>
        </div>
      </div>
      <div></div>
      <div className="bg-accent-100 dark:bg-accent-800 p-20">
        <div
          className="p-8 shadow-lg bg-mono-l-100 dark:bg-mono-d-100 dark:text-mono-d-600 font-os text-sm rounded-md"
          style={{
            height: 1000,
          }}
        >
          <iframe src="/privacy-policy-mobile.html" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
