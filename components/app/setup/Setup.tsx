import React, { useContext, useRef, useState } from "react";
import { SetupContext } from "../../core/context/SetupContext";
import MQ from "../../core/MQ";
import Image from "next/image";
import TextInput from "../../core/input/TextInput";
import SearchSelect from "../../core/input/SearchSelect";
import DistrictSearch from "../../core/input/DistrictSearch";
import { useEffect } from "react";
import Loading from "../../core/util/Loading";
import assert from "assert";
import {
  IoAlertCircle,
  IoArrowUndo,
  IoClose,
  IoCloseOutline,
} from "react-icons/io5";
import Router, { useRouter } from "next/router";
import ChangeButton from "../../core/input/ChangeButton";
import FormPage from "../../core/FormPage";

export default function Setup(props: {
  checkSetup(
    host: string,
    username: string,
    password?: string
  ): Promise<string>;
}) {
  const setupContext = useContext(SetupContext);

  const [district, setDistrict] = useState<string | undefined>(
    new URLSearchParams(window.location.search).get("district") || ""
  );
  const [username, setUsername] = useState(
    new URLSearchParams(window.location.search).get("username") || ""
  );

  const [password, setPassword] = useState("");

  const [changePassword, setChangePassword] = useState(
    new URLSearchParams(window.location.search).get("changePassword") != "false"
  );

  const [newlyIncorrectPassword, setNewlyIncorrectPassword] = useState(false);
  const [newlyIncorrectUsername, setNewlyIncorrectUsername] = useState(false);

  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectUsername, setIncorrectUsername] = useState(false);

  const [newlyInvalidDistrict, setNewlyInvalidDistrict] = useState(false);

  useEffect(() => {
    setIncorrectPassword(false);
    setNewlyIncorrectPassword(false);
  }, [district, password]);

  useEffect(() => {
    setIncorrectPassword(false);
    setIncorrectUsername(false);
    setNewlyIncorrectPassword(false);
    setNewlyIncorrectUsername(false);
  }, [username]);

  useEffect(() => {
    setNewlyIncorrectUsername(
      new URLSearchParams(window.location.search).get("error") ===
        "newlyIncorrectUsername"
    );
    setNewlyIncorrectPassword(
      new URLSearchParams(window.location.search).get("error") ===
        "newlyIncorrectPassword"
    );
    setNewlyInvalidDistrict(
      new URLSearchParams(window.location.search).get("error") ===
        "newlyInvalidDistrict"
    );
  }, []);

  const valid = district && username && (password || !changePassword);

  const [checking, setChecking] = useState(false);

  const router = useRouter();

  const error = (() => {
    if (incorrectUsername) {
      return "This username was not found in this district. Please try again.";
    }

    if (incorrectPassword) {
      return "This password you entered is incorrect. Please try again.";
    }

    if (newlyIncorrectUsername) {
      return "Your previous username is no longer valid in this district. Please try another username.";
    }

    if (newlyIncorrectPassword) {
      return "Your previous password is no longer correct. Please try another password.";
    }

    if (newlyInvalidDistrict) {
      return "Frontline no longer supports your school district URL. Please set up Scorecard again.";
    }

    return undefined;
  })();

  const [redirectToSetup] = useState(
    typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("hidden-action") ===
        "setup"
  );

  function submit() {
    if (!valid) return;

    setChecking(true);
    assert(district != null);

    props
      .checkSetup(district, username, changePassword ? password : undefined)
      .then((result) => {
        if (result === "VALID") {
          router.push(redirectToSetup ? "/app?hidden-action=setup" : "/app");
          return;
        }

        setChecking(false);

        if (result === "INCORRECT_PASSWORD") {
          setIncorrectPassword(true);
        }

        if (result === "INCORRECT_USERNAME") {
          setIncorrectUsername(true);
        }
      });
  }

  return (
    <FormPage
      title="Connect to Frontline"
      description="Enter your student account details to continue. Your Frontline login is not stored online, and your grades will not be visible to Scorecard."
    >
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="max-w-md flex flex-col gap-4 mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 rounded-md flex gap-4 items-center py-2 px-4">
              <IoAlertCircle className="text-red-400 text-xl" />
              <p className="text-red-400">{error}</p>
            </div>
          )}
          <DistrictSearch value={district} setValue={setDistrict} />
          <TextInput
            value={username}
            setValue={setUsername}
            error={incorrectUsername}
            label="Username"
            placeholder="Enter your frontline username"
          />
          {changePassword ? (
            <div className="flex flex-row w-full items-end gap-2">
              <div className="w-full">
                <TextInput
                  value={password}
                  setValue={setPassword}
                  password={true}
                  error={incorrectPassword}
                  label="Password"
                  placeholder="Your password will not be stored online"
                />
              </div>
              {new URLSearchParams(window.location.search).get(
                "changePassword"
              ) == "false" && (
                <div
                  className="h-10 w-10 flex items-center justify-center bg-accent-150 dark:bg-accent-650 border border-accent-250 dark:border-accent-650 rounded-md text-accent-300 cursor-pointer hover:bg-accent-250 dark:hover:bg-accent-750"
                  onClick={() => {
                    setChangePassword(false);
                  }}
                >
                  <IoClose />
                </div>
              )}
            </div>
          ) : (
            <div>
              <ChangeButton
                onClick={() => {
                  setChangePassword(true);
                }}
              >
                Password
              </ChangeButton>
              <p className="font-os p">
                You have a password stored on your device.
              </p>
            </div>
          )}
          <div className="mx-auto">
            {checking ? (
              <Loading />
            ) : (
              <button
                disabled={!valid}
                className={`py-2 px-4 rounded-md font-os ${
                  valid
                    ? "bg-accent-400 text-white"
                    : "bg-mono-l-300 dark:bg-mono-d-300 text-mono-l-400 dark:text-mono-d-400 cursor-not-allowed"
                }`}
                onClick={submit}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </form>
    </FormPage>
  );
}
