import { ReactNode } from "react";

export default function RecipeLayout({ children }: {
    children: ReactNode;
}): JSX.Element {
    return (
        <section className="flex flex-col gap-6">
            {children}
        </section>
    )
}