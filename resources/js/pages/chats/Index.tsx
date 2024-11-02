import ContentEmpty from "@/components/chats/ContentEmpty";
import Sidebar from "@/components/chats/Sidebar";
import { ModalProvider } from "@/context/ModalContext";
import AppLayout from "@/layouts/AppLayout";
import SidebarMini from "@/layouts/partials/SidebarMini";

export default function Chats() {
  return (
    <AppLayout title="Chats">
      <ModalProvider>
        <SidebarMini />
        <Sidebar />
        <ContentEmpty />
      </ModalProvider>
    </AppLayout>
  );
}
