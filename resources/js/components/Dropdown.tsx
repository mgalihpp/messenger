import { Transition } from "@headlessui/react";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

const DropDownContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: () => void;
}>({
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
});

const Dropdown = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }: PropsWithChildren) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-background text-foreground",
  className,
  children,
}: PropsWithChildren<{
  align?: "left" | "right" | "center" | "top-left" | "top-right";
  width?: "48";
  contentClasses?: string;
  className?: string;
}>) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0 mt-2";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0 mt-2";
  } else if (align === "top-left") {
    alignmentClasses = "origin-bottom-left bottom-0 end-0 sm:start-0 mb-2";
  } else if (align === "top-right") {
    alignmentClasses = "origin-bottom-right bottom-0 start-0 sm:end-0 mb-2";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
  }

  return (
    <>
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className={`absolute z-50 ${alignmentClasses} ${widthClasses}`}
          onClick={() => setOpen(false)}
        >
          <div
            className={
              `rounded-lg !p-2 shadow-md ring-1 ring-black ring-opacity-5 dark:ring-secondary ` +
              contentClasses +
              " " +
              className
            }
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink = ({
  className = "",
  children,
  ...props
}: InertiaLinkProps) => {
  return (
    <Link
      {...props}
      className={
        "block w-full rounded-md px-4 py-2 text-start text-sm leading-5 text-foreground transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none " +
        className
      }
    >
      {children}
    </Link>
  );
};

const DropdownButton = ({
  className = "",
  children,
  ...props
}: React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      {...props}
      className={
        "block w-full rounded-md px-4 py-2 text-start text-sm leading-5 text-foreground transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none " +
        className
      }
    >
      {children}
    </button>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;

export default Dropdown;
