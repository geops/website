"use client";
// Error components must be Client Components
import * as Sentry from "@sentry/nextjs";
import Button from "../components/Button";
import Website from "../components/Website";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="-mt-10 flex h-screen flex-col items-center justify-center p-8 ">
      <Website lang={"en"}>
        {/* @ts-ignore */}
        <Button onClick={() => reset()}>Start</Button>
      </Website>
    </div>
  );
}
