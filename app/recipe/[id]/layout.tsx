import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { ButtonLink } from "~/app/_components/button-link";

export default function RecipeLayout({ children }: {
    children: ReactNode;
}): JSX.Element {
    return (
        <section className="flex flex-col gap-6">
            <ButtonLink href="/">
                <div className="font-medium flex items-center gap-1">
                    <ArrowLeftIcon strokeWidth="10px" />
                    GO BACK
                </div>
            </ButtonLink>
            {children}
        </section>
    )
}