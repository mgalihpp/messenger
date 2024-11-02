import { cn } from "@/lib/utils";
import React, { Fragment, PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { BsX } from "react-icons/bs";

function Modal({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex flex-col gap-4 p-4 text-foreground", className)}>
      {children}
    </div>
  );
}

const Header = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <div className="flex items-center">
      <h2 className="text-lg font-medium">{title}</h2>
      <Button variant="ghost" className="ml-auto" onClick={onClose}>
        <BsX />
      </Button>
    </div>
  );
};

const Content = ({
  className,
  children,
  as: Component = "div",
}: PropsWithChildren<{ className?: string; as?: React.ElementType }>) => {
  return Component === Fragment ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Component className={className}>{children}</Component>
  );
};

const Footer = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={className}>{children}</div>;
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
