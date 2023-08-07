import {
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import type { UpdateCommandStatus } from "../../../../pages/dashboard";
import Spinner from "../../../components/ui/Spinner";
import type { Command } from "../../../store/command";

type StatusIconProps = {
  cmd: string;
  selected: Command | null;
  cmdStatus: UpdateCommandStatus;
};

const StatusIcon: React.FC<StatusIconProps> = ({
  cmdStatus,
  cmd,
  selected,
}) => {
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
    <ExclamationCircleIcon className="h-4 w-4 text-bk-red  md:h-6 md:w-6" />;
  }
  return <CheckIcon className="h-4 w-4 text-bk-blue md:h-6 md:w-6" />;
};

export default StatusIcon;
