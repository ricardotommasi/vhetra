export default function TarjetaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full min-h-0 overflow-y-auto flex flex-col">
      {children}
    </div>
  );
}
