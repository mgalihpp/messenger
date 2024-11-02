import clsx from "clsx";

interface FormAlertStatusProps {
  status?: string;
  className?: string;
}

export default function FormAlertStatus({
  status,
  className,
}: FormAlertStatusProps) {
  return (
    <div
      className={clsx(
        "text-success-dark rounded-lg bg-success/25 px-4 py-3 font-medium dark:bg-success/10",
        className,
      )}
    >
      {status}
    </div>
  );
}
