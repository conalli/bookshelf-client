"use client";

import type { Command } from "@bookshelf-client/store";
import { Spinner } from "@bookshelf-client/ui";
import { UpdateCommandStatus } from "@bookshelf-client/utils";
import {
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type StatusIconProps = {
  cmd: string;
  selected: Command | null;
  cmdStatus: UpdateCommandStatus;
};

export function StatusIcon({ cmdStatus, cmd, selected }: StatusIconProps) {
  const { add, del } = cmdStatus;
  const [iconType, setIconType] = useState<
    "success" | "loading" | "error" | "default"
  >("default");
  useEffect(() => {
    if (selected && selected.cmd === cmd) {
      if (add.success || del.success) setIconType("success");
      if (add.loading || del.loading) setIconType("loading");
      if (add.error || del.error) setIconType("error");
    } else {
      setIconType("default");
    }
  }, [
    add.error,
    add.loading,
    add.success,
    cmd,
    del.error,
    del.loading,
    del.success,
    selected,
  ]);

  if (iconType === "success")
    return <CheckCircleIcon className="h-4 w-4 text-green-500 md:h-6 md:w-6" />;
  if (iconType === "loading") return <Spinner />;
  if (iconType === "error") {
    <ExclamationCircleIcon className="text-bk-red h-4 w-4  md:h-6 md:w-6" />;
  }
  return <CheckIcon className="text-bk-blue h-4 w-4 md:h-6 md:w-6" />;
}
