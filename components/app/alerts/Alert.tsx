import React from "react";

export default function Alert(props: { message: string }) {
  return (
    <div className="bg-black/75 text-white py-2 px-4 rounded-md shadow-sm font-os">
      {props.message}
    </div>
  );
}
