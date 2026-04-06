"use client";

import InputContainer from "./input-container";

export const ChatInterfaceNew = () => {
  return (
    <>
      <div className="flex flex-col flex-1 w-full h-full min-h-0 overflow-y-scroll">
        <main className="flex flex-col justify-end md:justify-center items-center mx-auto -mt-20 px-4 w-full max-w-4xl h-full">
          <h1 className="mb-8 font-normal text-white text-3xl tracking-tight">
            What can I help you with today?
          </h1>
          <InputContainer />
        </main>
      </div>
    </>
  );
};
