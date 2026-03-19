import { PageTransition } from "@/app/components/PageTransition";
import { SharedHero } from "@/app/components/SharedHero";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SharedHero>
      <div className="h-full min-h-0 overflow-y-auto">
        <PageTransition>{children}</PageTransition>
      </div>
    </SharedHero>
  );
}
