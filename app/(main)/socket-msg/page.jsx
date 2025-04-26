"use client";

import { useSearchParams } from "next/navigation";

import { SocketMsg } from "@/app/components/socketMsg";

export default function page() {
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  return (
    <>
      <SocketMsg userId={userId} />
    </>
  );
}
