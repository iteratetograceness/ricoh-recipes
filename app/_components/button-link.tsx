import Link from "next/link";
import { ReactNode } from "react";

export function ButtonLink({
    children,
    href = '/',
    className,
}: {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}): JSX.Element {
    return <Link href={href} className={`flex items-center justify-center border-[0.5px] border-solid border-current rounded-[50%] w-fit px-5 py-3 ${className}`}>{children}</Link>;
}