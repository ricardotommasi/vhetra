import { NavBar } from "../components/NavBar";
import BlenderModel from "../components/BlenderModel";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-[calc(100vh-200px)] w-full relative">
        {children}
        <div className="absolute bottom-[2%] -right-50 h-[40%]">
          <BlenderModel path={'/vhetra-logo.glb'} type="animated" scale={2.5} />
        </div>
      </div>
    </>
  );
}
