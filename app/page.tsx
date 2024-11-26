import { Suspense } from 'react'
import { List } from './_components/list'

export default function Home() {
  return (
    <main className='flex flex-col'>
      <Suspense fallback={<div>Loading...</div>}>
        <List />
      </Suspense>
    </main>
  )
}
