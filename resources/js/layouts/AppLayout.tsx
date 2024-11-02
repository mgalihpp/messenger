import { AppProvider } from "@/context/AppContext";
import { Head } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function AppLayout({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <AppProvider>
      <Head title={title} />
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground sm:flex-row">
        {children}
      </div>
    </AppProvider>
  );
}
