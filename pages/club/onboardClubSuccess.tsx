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
import Link from "next/link";
import phone from "phone";
import { validate } from "email-validator";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/router";
import { IoCheckmarkCircle } from "react-icons/io5";
import ClubActionButton from "../../components/app/club/ClubActionButton";

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
  const [clubName, setClubName] = useState("");
  const [clubCode, setClubCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberValid = phone(phoneNumber).isValid;

  const numberValid = [clubName, clubCode, phoneNumberValid].filter(
    (v) => v
  ).length;

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post("/api/joinClub", {
        club_name: clubName,
        club_code: clubCode,
        phone_number: phoneNumber,
        special: "onboardClub",
      })
      .then(() => {
        router.reload();
      })
      .catch((e) => {
        const error = e.response.data;

        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <IoCheckmarkCircle className="text-green-500 text-8xl" />
          <h1 className="text-2xl">Success!</h1>
        </div>
        <Link href={"/club/onboardClub"}>
          <button>
            <div className="font-os font-bold tracking-normal bg-gray-300 text-white py-4 px-8 text-xl w-fit rounded-full relative overflow-hidden">
              <div className="absolute bg-blue-400 h-full top-0 left-0 z-0 w-full"></div>
              <div
                className={`flex gap-4 z-50 w-full h-full relative items-center`}
              >
                <span>Back to Registration</span>
              </div>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
