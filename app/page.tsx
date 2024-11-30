import { Suspense } from 'react'
import { List } from './_components/list'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <List />
    </Suspense>
  )
}
