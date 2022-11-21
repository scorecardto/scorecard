import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import DeleteDataRow from "../components/app/uninstall/DeleteDataRow";
import FormPage from "../components/core/FormPage";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../components/core/util/Loading";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoCloseCircleOutline,
} from "react-icons/io5";
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

  const [uninstallReason, setUninstallReason] = useState<string | undefined>(
    undefined
  );

  const [uninstallStatus, setUninstallStatus] = useState<
    "LOADING" | "DONE" | "ERROR"
  >("LOADING");

  useEffect(() => {
    if (uninstallReason) {
      if (clientId) {
        axios
          .post("/api/metrics/provideUninstallReason", {
            clientId,
            uninstallReason,
          })
          .then((result) => {
            if (result.data.success) {
              setUninstallStatus("DONE");
            } else {
              setUninstallStatus("ERROR");
            }
          })
          .catch((error) => {
            setUninstallStatus("ERROR");
          });
      } else {
        setUninstallStatus("ERROR");
      }
    }
  }, [uninstallReason, clientId]);

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
          <p className="p">Why did you uninstall Scorecard?</p>
          {!uninstallReason && (
            <div className=" group children:bg-mono-l-100 dark:children:bg-mono-d-100 children:border-b children:border-mono-l-300 dark:children:border-mono-d-300 rounded-md overflow-hidden shadow-sm font-os hover:children:bg-mono-l-150 dark:hover:children:bg-mono-d-150 children:transition-colors children:cursor-pointer">
              {[
                "Too Complex to Use",
                "Didn't Work Properly",
                "Not What I'm Looking For",
                "No Longer Using Frontline",
              ].map((reason, i) => (
                <motion.p
                  className="px-6 py-4 p"
                  onClick={() => setUninstallReason(reason)}
                  layoutId={`uninstall-reason-${reason}`}
                  key={i}
                >
                  {reason}
                </motion.p>
              ))}
            </div>
          )}
          {uninstallReason && (
            <motion.div
              initial={{
                translateX: 20,
              }}
              layoutId={`uninstall-reason-${uninstallReason}`}
              layout="position"
            >
              <div className=" bg-mono-l-100 dark:bg-mono-d-100 bg-gradient-to-b py-4 px-6 rounded-md overflow-hidden shadow-sm font-os flex justify-between items-center last:children:border-b-0">
                <div className="flex-col gap-2">
                  <p className="text-mono-l-600 dark:text-mono-d-600">
                    Thanks for your feedback.
                  </p>
                  <p className="p">It really helps us improve Scorecard.</p>
                </div>
                <div>
                  {uninstallStatus === "LOADING" && <Loading />}

                  {uninstallStatus === "DONE" && (
                    <IoCheckmarkCircle className="text-accent-300 text-xl" />
                  )}

                  {uninstallStatus === "ERROR" && (
                    <IoCloseCircle className="text-red-500 text-xl" />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <p className="text-sm max-w-md mx-auto p">
          {clientId ? (
            <>
              Your telemetry data is not deleted by default as it has no data
              linked linked to you. If you would like to delete your telemetry
              data,{" "}
              <a
                className="underline cursor-pointer"
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
