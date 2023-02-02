"use client";

import { FormEvent, useState } from "react";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
// https://www.youtube.com/watch?v=uDCBSnWkuH0
// based on that

import { useMultistepForm } from "./useMultistepForm";
import UserForm from "./UserForm";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

export default function Form() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>): void {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      // eslint-disable-next-line react/jsx-key
      <UserForm {...data} updateFields={updateFields} />,

      // eslint-disable-next-line react/jsx-key
      // <AddressForm {...data} updateFields={updateFields} />,
      // eslint-disable-next-line react/jsx-key
      // <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful account creation");
    // todo fetch request to an API
  }

  return (
    <div className="relative  border-solid border-black border-2 p-2 m-1 rounded font-sans max-w-2xl">
      <form action="" onSubmit={onSubmit}>
        <div className="absolute top-1 right-1">
          {currentStepIndex + 1} /{steps.length}
        </div>
        {step}
        <div className="mt-1 flex gap-1 justify-end">
          {!isFirstStep && (
            <button
              onClick={(e) => {
                e.preventDefault();
                back();
              }}
            >
              Back
            </button>
          )}

          <button type="submit">
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
