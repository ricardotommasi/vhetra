import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

const baseClasses = "contact-card w-full min-h-20 sm:min-h-22 min-[1800px]:min-h-28 p-3 sm:p-4 min-[1800px]:p-5 gap-3 sm:gap-5 min-[1800px]:gap-6 relative flex flex-row items-center text-tiza bg-card rounded-sm shadow-[5px_5px_5px_0px_rgba(16,17,17,0.55)] overflow-hidden";

const CardContacto = ({ id, img, title, action, href }: { id: number, img: string, title: string, action: ReactNode, href: string }) => {
    return (
        <Link href={href} id={`card-${id}`}
            className={twMerge(baseClasses, "ripple-btn", id % 2 === 0 && "sm:ml-[40px]")}>
            <Image className="flex h-10 w-11 shrink-0 sm:h-12 sm:w-14 min-[1800px]:h-16 min-[1800px]:w-20" src={img} alt={title} width={65} height={60} />
            <div className="flex min-w-0 flex-col">
                <div className="text-left justify-start text-[clamp(1rem,5vw,1.25rem)] min-[1800px]:!text-[1.65rem] leading-tight">{title}</div>
                <div className="text-left justify-start text-[clamp(0.82rem,3.8vw,1rem)] min-[1800px]:!text-[1.25rem] leading-tight">{action}</div>
            </div>
        </Link>)
}

export default CardContacto;
