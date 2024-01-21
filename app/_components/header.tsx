import { STIX_Two_Text } from 'next/font/google'
import Link from 'next/link'

const italicFont = STIX_Two_Text({
    style: 'italic',
    subsets: ['latin']
})

export function Header(): JSX.Element {
    return (
        <header>
            <Link className="flex flex-col justify-center items-center mb-9" href="/">
                <h1 className="font-medium tracking-tight text-6xl leading-8">RICOH</h1>
                <div className="flex gap-2">
                    <h2 className={`${italicFont.className} text-5xl`}>recipes</h2>
                    <div className="border-[0.5px] text-lg border-current rounded-[50%] w-fit h-fit px-4 py-2">GR III<span className="text-xs">(x)</span></div>
                </div>
            </Link>
        </header>
    )
}