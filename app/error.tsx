"use client";

import { useEffect } from "react";

const ErrorBasePage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {

    useEffect(() => {
        console.log("ErrorBasePage", error);
    }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
};
