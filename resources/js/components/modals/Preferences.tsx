import { useAppContext } from "@/contexts/AppContext";
import { useModalContext } from "@/contexts/ModalContext";
import Modal from "@/components/modals/Modal";
import { Fragment } from "react";
import { BsAppIndicator, BsChevronDown, BsCircleHalf } from "react-icons/bs";
import Dropdown from "@/components/Dropdown";
import { Button } from "../ui/button";
import { Switch } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { updateUser } from "@/api/user";

export default function Preferences() {
  const { theme, auth, setTheme, setAuth } = useAppContext();

  const { closeModal } = useModalContext();

  const toggleActiveStatus = (status: boolean) => {
    updateUser(auth, {
      active_status: status,
    });
    setAuth({
      ...auth,
      active_status: status,
    });
  };

  return (
    <Modal>
      <Modal.Header title="Preferences" onClose={closeModal} />
      <Modal.Content as={Fragment}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-sm">
            <BsCircleHalf />
            Theme
          </div>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="secondary">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                <BsChevronDown />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Button onClick={() => setTheme("system")}>
                System
              </Dropdown.Button>
              <Dropdown.Button onClick={() => setTheme("dark")}>
                Dark
              </Dropdown.Button>
              <Dropdown.Button onClick={() => setTheme("light")}>
                Light
              </Dropdown.Button>
            </Dropdown.Content>
          </Dropdown>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-sm">
            <BsAppIndicator />
            Active Status
          </div>

          <Switch
            checked={auth.active_status}
            onChange={toggleActiveStatus}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full",
              {
                "bg-primary": auth.active_status,
                "bg-secondary": !auth.active_status,
              },
            )}
          >
            <span className="sr-only">Enable Status</span>
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition",
                {
                  "translate-x-6": auth.active_status,
                  "translate-x-1": !auth.active_status,
                },
              )}
            ></span>
          </Switch>
        </div>
      </Modal.Content>
    </Modal>
  );
}
