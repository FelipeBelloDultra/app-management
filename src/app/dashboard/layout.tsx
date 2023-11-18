import { Header, Sidebar } from "~/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-y-auto h-full">
      <Header />

      <div className="flex h-[calc(100%-4rem)]">
        <Sidebar />

        <div className="relative flex-1">
          <div className="px-14 py-10 absolute inset-0 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
