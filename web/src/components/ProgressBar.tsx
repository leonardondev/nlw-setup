import * as Progress from "@radix-ui/react-progress";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(props.progress);
    }, 100);
  }, [props.progress]);

  return (
    <Progress.Root className="bg-zinc-700 w-full h-3 rounded-xl overflow-hidden mt-4">
      <Progress.Indicator
        className={clsx("h-3", {
          "bg-green-600": progress === 100,
          "bg-violet-600": progress < 100 && progress >= 25,
          "bg-red-600": progress < 25,
        })}
        style={{
          transition: "width 660ms cubic-bezier(0.65, 0, 0.35, 1)",
          width: `${progress}%`,
        }}
      />
    </Progress.Root>
  );
}
