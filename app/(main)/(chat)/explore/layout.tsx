import NewsHeader from "./ExploreHeader";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-6 pb-12 space-y-20 relative">
      <NewsHeader />
      {children}
    </section>
  );
}
