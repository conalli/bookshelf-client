import {
  CheckIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { Command, UpdateCommandStatus } from "../../../pages/dashboard";
import Spinner from "../../Spinner";

type StatusIconProps = {
  key: string;
  selected: Command | null;
  cmdStatus: UpdateCommandStatus;
};

const StatusIcon: React.FC<StatusIconProps> = ({
  cmdStatus,
  key,
  selected,
}) => {
  if (
    selected &&
    selected.cmd === key &&
    (cmdStatus.add.success || cmdStatus.del.success)
  ) {
    return <CheckCircleIcon className="text-green-500 h-4 w-4 md:h-6 md:w-6" />;
  }
  if (
    selected &&
    selected.cmd === key &&
    (cmdStatus.add.loading || cmdStatus.del.loading)
  ) {
    return <Spinner />;
  }
  if (
    selected &&
    selected.cmd === key &&
    (cmdStatus.add.error || cmdStatus.del.error)
  ) {
    return (
      <ExclamationCircleIcon className="text-bk-red h-4 w-4  md:h-6 md:w-6" />
    );
  }
  return <CheckIcon className="text-bk-blue h-4 w-4 md:h-6 md:w-6" />;
};

export default StatusIcon;
