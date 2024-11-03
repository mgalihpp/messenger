import { FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatListSearch from "@/components/chats/ChatListSearch";
import ChatList from "@/components/chats/ChatList";
import { useChatContext } from "@/context/ChatContext";

export default function Sidebar() {
  const { chats } = useChatContext();
  const [search, setSearch] = useState("");

  return (
    <div className="group/chat-scroll order-1 flex flex-1 shrink-0 flex-col sm:order-2 sm:w-[320px] sm:flex-initial sm:border-l-2 sm:border-secondary lg:w-[360px]">
      <div className="flex items-center justify-between px-2 pt-2 sm:pb-0">
        <h3 className="text-2xl font-semibold">Chats</h3>
        <Button className="flex h-6 w-6" size="circle">
          <FaUsers />
        </Button>
      </div>

      {/* searching */}
      <ChatListSearch search={search} setSearch={setSearch} />

      {/* chats recently */}
      <ChatList search={search} href="chats.show" type="chats" />

      {/* message user not found */}
      {chats.length === 0 && search.length === 0 && (
        <p className="flex h-full flex-1 items-center justify-center">
          No chat yet
        </p>
      )}

      {chats.length === 0 && search.length > 0 && (
        <p className="flex h-full flex-1 items-center justify-center">
          User not found
        </p>
      )}
    </div>
  );
}
