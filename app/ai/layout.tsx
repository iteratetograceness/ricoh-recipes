import { ReactNode } from 'react';
import { AI } from './actions';

export default function AILayout({ children }: {
    children: ReactNode;
}) {
    return (
        <AI>
            {children}
        </AI>
    )
}