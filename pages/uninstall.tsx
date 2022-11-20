import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteDataRow from "../components/app/uninstall/DeleteDataRow";
import FormPage from "../components/core/FormPage";

export type DeletionStatus =
  | "SUCCESS"
  | "PENDING"
  | "ERROR"
  | "WILL_NOT_DELETE";

const Uninstall: NextPage = () => {
  const router = useRouter();

  const [loginDeleted, setLoginDeleted] = useState<DeletionStatus>("PENDING");
  const [gradesDeleted, setGradeDeleted] = useState<DeletionStatus>("PENDING");
  const [clientId, setClientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const { loginStorage, gradeStorage, clientId } = router.query;

    if (loginStorage === "local") {
      setLoginDeleted("SUCCESS");
    } else {
      setLoginDeleted("WILL_NOT_DELETE");
    }

    if (gradeStorage === "local") {
      setGradeDeleted("SUCCESS");
    } else {
      setGradeDeleted("WILL_NOT_DELETE");
    }

    if (clientId !== undefined && typeof clientId === "string") {
      setClientId(clientId);
    }
  }, [router.query]);

  return (
    <>
      <NextSeo title="Extension Uninstalled" />
      <FormPage
        title="Delete your Data."
        description="Sorry to see you go. Please allow us a few seconds to clean up your data and optionally let us know why you uninstalled."
        omitTopPadding={true}
      >
        <div className="max-w-md flex flex-col gap-4 mx-auto">
          <p className="text-mono-l-600 dark:text-mono-d-600 font-medium">
            Your Data
          </p>
          <div className="bg-mono-l-100 dark:bg-mono-d-100 rounded-md shadow-sm">
            <DeleteDataRow title="Frontline Login" status={loginDeleted} />

            <DeleteDataRow title="Grades" status={gradesDeleted} />
          </div>
        </div>
        <div className="max-w-md flex flex-col gap-4 mx-auto my-10">
          <p className="text-mono-l-600 dark:text-mono-d-600 font-medium">
            Just One Question.
          </p>
          <p>Why did you uninstall Scorecard?</p>
          <div className=" children:bg-mono-l-100 dark:bg-mono-d-100 children:py-4 children:px-6 children:border-b last:children:border-b-0 children:border-mono-l-300 dark:children:border-mono-d-300 rounded-md overflow-hidden shadow-sm font-os hover:children:bg-mono-l-150 children:transition-colors children:cursor-pointer">
            <p>Too Complex to Use</p>
            <p>Didn&apos;t Work Properly</p>
            <p>Not What I&apos;m Looking For</p>
            <p>No Longer Using Frontline</p>
          </div>
        </div>
        <p className="text-sm max-w-md mx-auto">
          {clientId ? (
            <>
              Your telemetry data is not deleted by default as it has no data
              linked linked to you. If you would like to delete your telemetry
              data,{" "}
              <a
                className="underline"
                onClick={() => {
                  window.open(`/delete-telemetry-data?clientId=${clientId}`);
                }}
              >
                click here.
              </a>
            </>
          ) : (
            <>We couldn&apos;t find or delete your telemetry data.</>
          )}
        </p>
      </FormPage>
    </>
  );
};

export default Uninstall;
