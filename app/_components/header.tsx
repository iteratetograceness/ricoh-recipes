import Link from 'next/link'
import localFont from 'next/font/local'
import cn from 'classnames'

const kosans = localFont({
  src: './kosans.woff2',
  display: 'block',
})

export function Header(): JSX.Element {
  return (
    <header className='w-full p-5'>
      <Link
        className={cn(
          'flex flex-col justify-center items-center',
          kosans.className
        )}
        href='/'
      >
        <h1
          className='text-7xl sm:text-[126px] tracking-widest text-center pl-1.5'
          aria-hidden='true'
        >
          RICH RECIPES
        </h1>
        <span className='sr-only'>Ricoh Recipes</span>
      </Link>
      <div className='flex justify-between font-light text-2xl md:text-3xl lg:text-4xl w-full'>
        <h2>COLLECTION OF RECIPES</h2>
        <h2>FOR YOUR</h2>
        <h2>RICOH GR III(X)</h2>
      </div>
    </header>
  )
}
