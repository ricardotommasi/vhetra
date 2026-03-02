import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const baseClasses = "w-full sm:w-[65%] h-28 p-4 gap-2 relative flex flex-row items-center text-tiza bg-card rounded-lg shadow-[5px_5px_5px_0px_rgba(16,17,17,0.55)] overflow-hidden";

const CardContacto = ({ id, img, title, action, href }: { id: number, img: string, title: string, action: string, href: string }) => {
    return (
        <Link href={href} id={`card-${id}`}
            className={twMerge(baseClasses, id % 2 === 0 && "sm:ml-[40px]")}>
            <Image className="flex w-16 h-14" src={img} alt={title} width={65} height={60} />
            <div className="flex flex-col">
                <div className="text-left justify-start text-xl">{title}</div>
                <div className="text-left justify-start text-base">{action}</div>
            </div>
        </Link>)
}

export default CardContacto;