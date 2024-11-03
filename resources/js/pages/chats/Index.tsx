import ContentEmpty from "@/components/chats/ContentEmpty";
import Sidebar from "@/components/chats/Sidebar";
import { ChatProvider } from "@/contexts/ChatContext";
import { ModalProvider } from "@/contexts/ModalContext";
import AppLayout from "@/layouts/AppLayout";
import SidebarMini from "@/layouts/partials/SidebarMini";

export default function Chats() {
  return (
    <AppLayout title="Chats">
      <ChatProvider>
        <ModalProvider>
          <SidebarMini />
          <Sidebar />
          <ContentEmpty />
        </ModalProvider>
      </ChatProvider>
    </AppLayout>
  );
}
