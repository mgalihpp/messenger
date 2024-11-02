import { FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="sm:border-1 order-1 flex flex-1 shrink-0 flex-col sm:order-2 sm:w-[320px] sm:flex-initial sm:border-secondary lg:w-[360px]">
      <div className="flex items-center justify-between px-2 pt-2 sm:pb-0">
        <h3 className="text-2xl font-semibold">Chats</h3>
        <Button className="flex h-6 w-6" size="circle">
          <FaUsers />
        </Button>
      </div>
    </div>
  );
}
