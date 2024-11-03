import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";
import { useChatContext } from "@/context/ChatContext";
import { fetchChats } from "@/api/chat";
import useDebounce from "@/hooks/useDebounce";
import useMounted from "@/hooks/useMounted";

interface ChatListSearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatListSearch({
  search,
  setSearch,
}: ChatListSearchProps) {
  const { setChats, setPaginate } = useChatContext();
  const isMounted = useMounted();
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (isMounted) {
      fetchChats(debouncedSearch).then(({ data }) => {
        setChats(data.data.data);
        setPaginate(data.data);
      });
    }
  }, [debouncedSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="relative flex items-center px-2 py-0">
      <span className="absolute left-5">
        <BiSearch className="text-2xl text-secondary-foreground" />
      </span>

      <Input
        variant="search_input"
        placeholder="Search Messenger"
        value={search}
        onChange={handleSearch}
        type="text"
      />
    </div>
  );
}
