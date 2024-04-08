import GlobalChat from "@/components/ui/chat/GlobalChat";

export default async function MainPage() {
  return (
    <section className="grid grid-rows-[1fr,5rem] grid-cols-1 h-full message-list">
      <GlobalChat />
    </section>
  );
}
