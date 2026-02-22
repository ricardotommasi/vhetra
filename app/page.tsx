"use client";
import { useState } from "react";
import BlenderModel from "./components/BlenderModel";
import { NavBar } from "./components/NavBar";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [exiting, setExiting] = useState(false);

  const specialAction = async () => {
    return new Promise<void>((resolve) => {
      setExiting(true);
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <NavBar specialAction={specialAction} />
      <div className="flex flex-col h-[calc(100vh-200px)] w-full relative">
        <div className="w-[80%] h-[40%] mx-[10%] relative">
          <div
            className={twMerge(
              "w-full h-full absolute transition-all duration-1000 ease-in-out",
              exiting ? "translate-y-[120%] translate-x-[80%]" : "top-0 left-0",
            )}
          >
            <BlenderModel
              path={"/vhetra-logo.glb"}
              type="animated"
              scale={2.5}
              canInteract={true}
            />
          </div>
        </div>
        <div className={"w-[90%] h-[25%] mx-[5%] relative"}>
          <div
            className={twMerge(
              "w-full h-full absolute transition-all duration-1000 ease-in-out",
              exiting ? "-translate-y-[270%]" : "top-0 left-0",
            )}
          >
            <BlenderModel
              path={"/vhetra-texto.glb"}
              type="simple"
              scale={1.8}
            />
          </div>
        </div>
      </div>
    </>
  );
}
