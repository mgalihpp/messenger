import BadgeNotification from "@/components/chats/badge/BadgeNotification";
import Dropdown from "@/components/Dropdown";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import { useModalContext } from "@/contexts/ModalContext";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import {
  BsArchive,
  BsBoxArrowRight,
  BsChat,
  BsGear,
  BsPeople,
  BsPersonCircle,
} from "react-icons/bs";

export default function SidebarMini() {
  const user = useAppContext().auth;
  const { openModal } = useModalContext();

  const openModalPreferences = () => {
    openModal({
      view: "PREFERENCES",
      size: "lg",
    });
  };

  return (
    <div className="order-2 mt-auto flex flex-row justify-between gap-1 border-t-2 border-secondary bg-background sm:order-1 sm:mt-0 sm:flex-col sm:items-center sm:justify-center sm:border-none sm:p-2">
      <Link
        href={route("chats.index")}
        className={cn(
          "relative flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
          {
            "bg-secondary": route().current("chats.*"),
          },
        )}
      >
        <BsChat className="size-6" />
        <BadgeNotification />
      </Link>

      <Link
        href={route("contacts.index")}
        className={cn(
          "relative flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
          {
            "bg-secondary": route().current("contacts.index"),
          },
        )}
      >
        <BsPeople className="size-6" />
      </Link>

      <Link
        href={route("archived_chats.index")}
        className={cn(
          "relative flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
          {
            "bg-secondary": route().current("archived_chats.index"),
          },
        )}
      >
        <BsArchive className="size-6" />
      </Link>

      <div className="relative flex flex-1 cursor-pointer justify-center rounded-lg px-3 transition-all hover:bg-muted sm:mt-auto sm:flex-initial sm:px-0 sm:hover:bg-transparent">
        <Dropdown>
          <Dropdown.Trigger>
            <Avatar>
              <AvatarImage className="h-9 w-9 rounded-full" src={user.avatar} />
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Content align="top-left" className="mb-12 sm:mb-10">
            <Dropdown.Button onClick={openModalPreferences}>
              <div className="flex items-center gap-2">
                <BsGear />
                Preferences
              </div>
            </Dropdown.Button>
            <Dropdown.Link href={route("profile.edit")}>
              <div className="flex items-center gap-2">
                <BsPersonCircle />
                Profile
              </div>
            </Dropdown.Link>
            <Dropdown.Link href={route("logout")} method="post" as="button">
              <div className="flex items-center gap-2">
                <BsBoxArrowRight />
                Log out
              </div>
            </Dropdown.Link>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </div>
  );
}
