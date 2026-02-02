'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function AnimatedLink(props: { className: string, href: string, children: ReactNode, specialAction?: () => Promise<void> }) {
    const router = useRouter();
    const { href, children, specialAction, className } = props;

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (specialAction) await specialAction();
        router.push(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
