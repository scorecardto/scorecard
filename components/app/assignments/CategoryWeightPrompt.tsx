import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "../../core/input/Slider";
import TextInput from "../../core/input/TextInput";
import { GradeCategory } from "scorecard-types";
import { IoCloseOutline } from "react-icons/io5";

export default function CategoryWeightPrompt(props: {
  show: boolean;
  otherCategories: GradeCategory[];
  addTestCategory: (weight: number | undefined) => void;
}) {
  const { show, otherCategories, addTestCategory } = props;

  const modalVariants = {
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        bounce: false,
      },
    },
    hide: {
      opacity: show ? 0.7 : 0,
      scale: 0.9,
    },
  };

  const otherCategoriesWeight = otherCategories.reduce((x, category) => {
    return x + (category.weight ?? 0);
  }, 0);

  const suggested =
    otherCategoriesWeight >= 100
      ? otherCategories[0].weight
      : 100 - otherCategoriesWeight;

  const [weight, setWeight] = useState(0);
  const [textInputWeight, setTextInputWeight] = useState("0");

  useEffect(() => {
    setTextInputWeight(suggested.toString());
  }, [show, suggested]);

  const invalid =
    isNaN(parseInt(textInputWeight)) || parseInt(textInputWeight) <= 0;

  useEffect(() => {
    if (!invalid) {
      setWeight(parseInt(textInputWeight));
    } else {
      setWeight(0);
    }
  }, [textInputWeight, invalid]);

  const totalWeight = otherCategoriesWeight + weight;

  const colorClasses = [
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-red-500",
    "bg-blue-500",
  ];

  return (
    <motion.div
      animate={{
        visibility: show ? "visible" : "hidden",
      }}
      transition={{
        delay: show ? 0 : 0.0,
      }}
    >
      <motion.div
        className={`z-40 fixed top-0 left-0 w-full h-full flex py-10 px-20 items-center justify-center`}
        animate={{
          backgroundColor: show ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2, delay: 0 }}
      >
        <motion.div
          animate={show ? "show" : "hide"}
          variants={modalVariants}
          className="w-full max-w-md bg-mono-l-100 dark:bg-mono-d-100 rounded-md overflow-hidden pt-10 pb-5 relative"
        >
          {/* close button */}
          <button
            className="absolute top-4 right-4 text-2xl text-mono-l-500 dark:text-mono-d-500 bg-black/5 dark:bg-black/10 p-2 rounded-md"
            onClick={() => {
              props.addTestCategory(undefined);
            }}
          >
            <IoCloseOutline />
          </button>
          <div className="px-10 flex flex-col gap-4">
            <h1 className="font-medium text-xl text-mono-l-600 dark:text-mono-d-600">
              Select Category Weight
            </h1>

            <TextInput
              placeholder="Weight"
              value={textInputWeight}
              setValue={setTextInputWeight}
              error={invalid && textInputWeight !== ""}
              sublabel={
                invalid
                  ? "Waiting for valid number input"
                  : suggested.toString() === textInputWeight
                  ? "Suggested Weight"
                  : ""
              }
            />
          </div>
          {!invalid && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
            >
              <div className="px-10 flex flex-col gap-4 border-t border-t-mono-l-300 dark:border-t-mono-d-300 mt-4 pt-4">
                <div className={invalid ? "hidden" : ""}>
                  <p className="text-mono-l-600 dark:text-mono-d-600 font-os">
                    All Categories
                  </p>
                  {[
                    ...props.otherCategories,
                    {
                      name: "New Category",
                      weight: weight,
                    },
                  ].map((category, i) => {
                    return (
                      <div
                        className="flex items-center justify-between mt-2"
                        key={i}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              colorClasses[i % colorClasses.length]
                            }`}
                          ></div>
                          <p
                            className={`${
                              category.name === "New Category"
                                ? "text-mono-l-600 dark:text-mono-d-600"
                                : "text-mono-l-500 dark:text-mono-d-500"
                            } font-os`}
                          >
                            {category.name}
                          </p>
                        </div>
                        <p className="text-mono-l-500 dark:text-mono-d-500 font-os">
                          {`${category.weight}pts or ${(
                            (category.weight / totalWeight) *
                            100
                          ).toFixed(0)}%`}
                        </p>
                      </div>
                    );
                  })}
                  <div className="w-full relative h-4 rounded-md overflow-hidden flex my-4">
                    {[
                      ...props.otherCategories,
                      {
                        name: "New Category",
                        weight: weight,
                      },
                    ].map((category, i) => {
                      return (
                        <div
                          className={`h-4 ${
                            colorClasses[i % colorClasses.length]
                          }`}
                          key={i}
                          style={{
                            width: `${(category.weight / totalWeight) * 100}%`,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="px-10 flex flex-col gap-4 border-t border-t-mono-l-300 dark:border-t-mono-d-300 mt-4 pt-4">
                <button
                  className={`bg-accent-300 w-full py-2 rounded-md text-white font-os text-sm`}
                  onClick={() => {
                    if (!invalid) {
                      props.addTestCategory(weight);
                    }
                  }}
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
