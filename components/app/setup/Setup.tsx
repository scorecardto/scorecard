import React, { useContext, useState } from "react";
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

export default function Setup(props: {
  checkSetup(host: string, username: string, password: string): Promise<string>;
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

  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectUsername, setIncorrectUsername] = useState(false);

  useEffect(() => {
    setIncorrectPassword(false);
  }, [district, password]);

  useEffect(() => {
    setIncorrectPassword(false);
    setIncorrectUsername(false);
  }, [username]);

  const valid = district && username && password;

  const [checking, setChecking] = useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="shrink-0 flex-none w-full lg:w-2/5 lg:h-full py-10 lg:pt-48 px-10">
        <div className="flex flex-col gap-8">
          <div className="flex lg:flex-col lg:gap-8 gap-4 lg:items-start items-center">
            <div className="lg:w-16 lg:h-16 h-8 w-8">
              <Image
                src="/assets/scorecard-512.png"
                width={64}
                height={64}
                alt=""
              />
            </div>

            <h1>Connect to Frontline</h1>
          </div>
          <p className="max-w-sm">
            Enter your student account details to continue. Your Frontline login
            is not stored online, and your grades will not be visible to
            Scorecard.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-3/5 lg:min-h-full lg:h-max   h-full bg-accent-100 dark:bg-accent-800 lg:pt-72 pt-10 ">
        <div className="max-w-md flex flex-col gap-4 mx-auto">
          {(incorrectPassword || incorrectUsername) && (
            <div className="bg-red-100 border border-red-400 rounded-md flex gap-4 items-center py-2 px-4">
              <IoAlertCircle className="text-red-400 text-xl" />
              <p className="text-red-400">
                {(() => {
                  if (incorrectUsername) {
                    return "This username was not found in this district. Please try again.";
                  }
                  if (incorrectPassword) {
                    return "This password you entered is incorrect. Please try again.";
                  }
                })()}
              </p>
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
                  className="h-10 w-10 flex items-center justify-center bg-accent-150 border border-accent-250 rounded-md text-accent-300 cursor-pointer hover:bg-accent-250"
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
              <p className="font-os">
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
                className={`py-2 px-4 from-accent-400 to-accent-500 rounded-md ${
                  valid
                    ? "bg-gradient-to-tr text-white"
                    : "bg-mono-l-300 dark:bg-mono-d-300 text-mono-l-400 dark:text-mono-d-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!valid) return;

                  setChecking(true);
                  assert(district != null);

                  props
                    .checkSetup(district, username, password)
                    .then((result) => {
                      if (result === "VALID") {
                        router.push("/app");
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
                }}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
