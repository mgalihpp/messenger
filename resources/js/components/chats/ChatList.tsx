import { Link } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat } from "@/types/chat";
import BadgeOnline from "@/components/chats/badge/BadgeOnline";
import { cn, relativeTime } from "@/lib/utils";
import { useChatContext } from "@/context/ChatContext";
import BadgeChatNotification from "@/components/chats/badge/BadgeChatNotification";

interface ChatListProps {
  search: string;
  href: string;
  type: "chats" | "archived_chats";
  className?: string;
}

export default function ChatList({
  search,
  href,
  type,
  className,
}: ChatListProps) {
  const { chats } = useChatContext();

  const handleMarkAsRead = (chat: Chat) => {
    // TODO : mark chat as read
  };

  if (chats.length === 0) {
    return;
  }

  return (
    <div
      className={cn(
        "chat-scroll relative max-h-[calc(100vh-158px)] flex-1 overflow-y-auto px-2 pb-1 sm:max-h-max sm:pb-2",
        className,
      )}
    >
      {chats
        .sort((a, b) => {
          if (search.length === 0)
            return b.created_at.localeCompare(a.created_at);

          return a.name.localeCompare(b.name);
        })
        .map((chat) => (
          <div key={chat.id} className="group relative flex items-center">
            <Link
              href={route(href, chat.id)}
              as="button"
              onClick={() => handleMarkAsRead(chat)}
              className={cn(
                "relative flex w-full flex-1 items-center gap-3 rounded-lg p-3 text-left transition-all group-hover:bg-secondary",
              )}
            >
              {search.length === 0 && chat.created_at ? (
                <>
                  <div className="relative shrink-0">
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    {!!chat.is_online && <BadgeOnline />}
                  </div>

                  <div className="overflow-hidden">
                    <h5 className="truncate font-medium">{chat.name}</h5>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <p
                        className={cn("truncate", {
                          "font-medium text-foreground": !chat.is_read,
                        })}
                        dangerouslySetInnerHTML={{ __html: chat.body }}
                      />
                      <span className="mx-1">.</span>
                      <span className="shrink-0">
                        {relativeTime(chat.created_at)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative shrink-0">
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    {!!chat.is_online && <BadgeOnline />}
                  </div>

                  <div className="overflow-hidden">
                    <h5 className="truncate font-medium">{chat.name}</h5>
                  </div>
                </>
              )}

              {!chat.is_read && <BadgeChatNotification />}
            </Link>
          </div>
        ))}
    </div>
  );
}
