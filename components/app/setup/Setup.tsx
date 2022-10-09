import React, { useContext, useState } from "react";
import { SetupContext } from "../../core/context/SetupContext";
import MQ from "../../core/MQ";
import Image from "next/image";
import TextInput from "../../core/input/TextInput";
import SearchSelect from "../../core/input/SearchSelect";
import DistrictSearch from "../../core/input/DistrictSearch";
import { useEffect } from "react";

export default function Setup() {
  const setupContext = useContext(SetupContext);

  const [district, setDistrict] = useState<string | undefined>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [incorrectLogin, setIncorrectLogin] = useState(true);

  useEffect(() => {
    setIncorrectLogin(false);
  }, [district, username, password]);

  const valid = district && username && password;
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-2/5 lg:h-full bg-mono-l-100 py-10 lg:pt-48 px-10">
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
      <div className="w-full lg:w-3/5 h-full bg-accent-100 lg:pt-72 pt-10 ">
        <div className="max-w-md flex flex-col gap-4 mx-auto">
          <DistrictSearch value={district} setValue={setDistrict} />
          <TextInput
            value={username}
            setValue={setUsername}
            label="Username"
            placeholder="Enter your frontline username"
          />
          <TextInput
            value={password}
            setValue={setPassword}
            password={true}
            error={incorrectLogin}
            label="Password"
            placeholder="Your password will not be stored online"
          />
          <div className="mx-auto">
            <button
              className={`py-2 px-4 from-accent-400 to-accent-500 rounded-md ${
                valid
                  ? "bg-gradient-to-tr text-white"
                  : "bg-mono-l-300 text-mono-l-400 cursor-not-allowed"
              }`}
              onClick={() => {
                setIncorrectLogin(true);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
