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
        "rounded-lg bg-success/25 px-4 py-3 font-medium text-success-dark dark:bg-success/10",
        className,
      )}
    >
      {status}
    </div>
  );
}
