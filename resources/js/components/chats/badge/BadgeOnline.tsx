import { cn } from "@/lib/utils";

export default function BadgeOnline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute bottom-1 right-0 h-2 w-2 rounded-full bg-success ring-2 ring-white dark:bg-success/75 dark:ring-gray-200",
        className,
      )}
    />
  );
}
