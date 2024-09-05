import axios from "axios";
import Image from "next/image";
import React, {
  FormEvent,
  FormEventHandler,
  HTMLInputTypeAttribute,
  useEffect,
  useMemo,
  useState,
} from "react";
import ClubActionButton from "../../../components/app/club/ClubActionButton";
import Link from "next/link";
import phone from "phone";
import { validate } from "email-validator";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
  return {
    props: {
      internalCode: context.params.internalCode,
    },
  };
}

function JoinFormInput(props: {
  value: string;
  name: string;
  setValue(c: string): void;
  valid: boolean;
  label: string;
  type: HTMLInputTypeAttribute;
}) {
  const [hasClosed, setHasClosed] = useState(false);
  const [focused, setFocused] = useState(false);
  const showInvalid = hasClosed && !props.valid;
  useEffect(() => {
    if (props.value === "🚫") {
      setHasClosed(false);
      props.setValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return (
    <div className="mb-6">
      <p className="text-gray-500 mb-2">{props.label}</p>
      <input
        name={props.name}
        className={`text-xl py-2 px-4 rounded-lg w-full outline-none ${
          showInvalid
            ? "border-red-500 border-2"
            : focused
            ? "border-blue-500 border-2"
            : "border-gray-200 border"
        }`}
        value={props.value}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          setHasClosed(true);
        }}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
        type={props.type}
      ></input>
    </div>
  );
}
export default function Join(props: { internalCode: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const firstNameValid = !!firstName;
  const lastNameValid = !!lastName;
  const emailValid = validate(email);
  const phoneNumberValid = phone(phoneNumber).isValid;

  const numberValid = [
    firstNameValid,
    lastNameValid,
    emailValid,
    phoneNumberValid,
  ].filter((v) => v).length;

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post("/api/joinClub", {
        internal_code: props.internalCode,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
      })
      .then(() => {
        router.replace(`/club/${props.internalCode}/join-done`);
      })
      .catch((e) => {
        const error = e.response.data;

        setError(
          (() => {
            if (error === "NO_PHONE_NUMBER") {
              return "Please include a phone number and resubmit.";
            }
            if (error === "INVALID_PHONE_NUMBER") {
              setPhoneNumber("");
              return "This phone number is invalid!";
            }
            if (error === "NO_EMAIL") {
              return "Please include an email and resubmit.";
            }
            if (error === "INVALID_EMAIL") {
              setEmail("");
              return "This email is invalid!";
            }
            if (error === "CLUB_NOT_FOUND" || error === "NO_INTERNAL_CODE") {
              setFirstName("🚫");
              setPhoneNumber("🚫");
              setEmail("🚫");
              setLastName("🚫");
              return "There was an error accessing this club. Try joining with the Scorecard app.";
            }
            if (error === "ALREADY_MEMBER") {
              setFirstName("🚫");
              setPhoneNumber("🚫");
              setEmail("🚫");
              setLastName("🚫");
              return "You're already a member of this club! Use the Scorecard app to manage your existing memberships.";
            }
            return "";
          })()
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-full bg-club-25 overflow-x-hidden font-os tracking-normal">
      <meta name="theme-color" id="themeMetaTag" content="#fbfcfd" />
      <div className="max-w-lg w-full mx-auto px-4 pt-2 ">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 py-2 px-4 rounded-lg mb-2 mt-2">
            <p className="text-xs text-red-700">Error Occured</p>
            {error}
          </div>
        )}
        <div className="bg-white border border-slate-100 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] ring-offset-0 px-4 pt-6 pb-8 rounded-lg relative">
          <form onSubmit={onSubmit}>
            <JoinFormInput
              label="First Name"
              name="first_name"
              value={firstName}
              setValue={setFirstName}
              valid={firstNameValid}
              type="text"
            />
            <JoinFormInput
              label="Last Name"
              name="last_name"
              value={lastName}
              setValue={setLastName}
              valid={lastNameValid}
              type="text"
            />
            <JoinFormInput
              label="Phone Number"
              name="phone_number"
              value={phoneNumber}
              setValue={setPhoneNumber}
              valid={phoneNumberValid}
              type="tel"
            />
            <JoinFormInput
              label="Email"
              name="email"
              value={email}
              setValue={setEmail}
              valid={emailValid}
              type="email"
            />
            <div className="w-full justify-center flex absolute bottom-0 left-0 translate-y-1/2">
              <div>
                <button
                  type="submit"
                  onClick={() => {}}
                  disabled={numberValid !== 4}
                >
                  <div className="font-os font-bold tracking-normal bg-gray-300 text-white py-4 px-8 text-xl w-fit rounded-full relative overflow-hidden">
                    <div
                      className="absolute bg-gray-700 h-full top-0 left-0 z-0 transition-all duration-200"
                      style={{
                        width: `${numberValid * 25}%`,
                      }}
                    ></div>
                    <div
                      className={`flex gap-4 z-50 w-full h-full relative items-center ${
                        numberValid === 4 ? "" : "opacity-75"
                      }`}
                    >
                      {loading ? (
                        <>
                          <Oval
                            visible={true}
                            height={20}
                            width={20}
                            color="white"
                            secondaryColor="white"
                            strokeWidth={5}
                          />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>💟</span>
                          <span>Sign Up</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
        <p className="text-gray-400 text-center mt-12 mx-8 text-sm">
          By signing up, you agree to recieve text notifications from this club
          when they post.
        </p>
      </div>
    </div>
  );
}
