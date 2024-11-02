import { Button } from "@/components/ui/button";
import React from "react";

export default function Test() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-12">
      <div className="flex flex-col gap-4">
        <Button>hello</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-primary">kontol</p>
        <p className="text-secondary">kontol</p>
        <p className="text-destructive">kontol</p>
        <p className="text-muted">kontol</p>
        <p className="text-card">kontol</p>
        <p className="text-popover">kontol</p>
        <p className="text-accent">kontol</p>
        <p className="text-border">kontol</p>
        <p className="text-input">kontol</p>
        <p className="text-ring">kontol</p>
        <p className="text-foreground">kontol</p>
        <p className="text-background">kontol</p>
        <p className="text-primary-foreground">kontol</p>
        <p className="text-secondary-foreground">kontol</p>
        <p className="text-card-foreground">kontol</p>
        <p className="text-popover-foreground">kontol</p>
        <p className="text-muted-foreground">kontol</p>
        <p className="text-accent-foreground">kontol</p>
        <p className="text-destructive-foreground">kontol</p>
        <p className="text-success">kontol</p>
      </div>
    </div>
  );
}
