export default function ContentEmpty() {
  return (
    <div className="order-3 hidden h-screen w-full flex-1 flex-col items-center justify-center gap-4 border-l-2 border-secondary sm:flex">
      <img
        src="/images/message-empty.png"
        alt="message-empty"
        className="w-[245px]"
      />
      <h5 className="text-xl font-medium">No Chats Selected.</h5>
    </div>
  );
}
