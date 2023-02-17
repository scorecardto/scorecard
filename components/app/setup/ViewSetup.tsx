import { useRouter } from "next/router";
import React, { useContext } from "react";
import { SetupContext } from "../../core/context/SetupContext";
import FormPage from "../../core/FormPage";
import ChangeButton from "../../core/input/ChangeButton";
import Loading from "../../core/util/Loading";

export default function ViewSetup() {
  const setup = useContext(SetupContext);

  const username = setup.setup?.username;
  const district = setup.setup?.host;
  const hasPassword = setup.setup?.hasPassword;

  const router = useRouter();

  return (
    <FormPage
      backLinkText="Back to Scorecard"
      backLink="/app"
      title="Your Setup"
      description="Scorecard uses these login details to extract your grades from Frontline. We do not store your password or grades online."
    >
      {district && username ? (
        <div className="max-w-md flex flex-col gap-4 mx-auto">
          <div className="bg-mono-l-100 dark:bg-mono-d-100 rounded-md shadow-sm">
            <div className="py-4 px-6">
              <ChangeButton
                onClick={() => {
                  router.push(
                    `/app/connect-account?username=${username}&changePassword=false`
                  );
                }}
                value={district}
              >
                School or District Website
              </ChangeButton>
            </div>

            <div className="border-b border-b-mono-l-300 dark:border-b-mono-d-300" />

            <div className="py-4 px-6">
              <ChangeButton
                onClick={() => {
                  router.push(
                    `/app/connect-account?district=${district}&changePassword=false`
                  );
                }}
                value={username}
              >
                Username
              </ChangeButton>
            </div>

            <div className="border-b border-b-mono-l-300 dark:border-b-mono-d-300" />

            <div className="py-4 px-6">
              <ChangeButton
                onClick={() => {
                  router.push(
                    `/app/connect-account?username=${username}&district=${district}`
                  );
                }}
                value={
                  hasPassword
                    ? "Stored on your device."
                    : "You do not have a password."
                }
              >
                Password
              </ChangeButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}
    </FormPage>
  );
}
