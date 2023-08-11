"use client";

import { useRefreshTokens } from "@bookshelf-client/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const [counter, setCounter] = useState(3);
  const router = useRouter();
  useRefreshTokens();

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter <= 0) {
        return router.back();
      }
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router, counter]);

  return (
    <div className="flex w-full flex-col items-center justify-center px-8">
      <h1 className="text-4xl text-green-500">Success!</h1>
      <h2 className="text-2xl">Redirecting in {counter}</h2>
    </div>
  );
}
