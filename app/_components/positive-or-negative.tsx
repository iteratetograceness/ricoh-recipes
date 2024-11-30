import { ReactNode } from 'react'

export function PositiveOrNegative({
  value,
}: {
  value?: number | null
}): ReactNode {
  if (value === null || value === undefined) return null
  const stringValue = value > 0 ? `+${value}` : `${value}`
  return (
    <span className='flex items-center justify-center bg-primary-foreground rounded-full text-primary-background w-8 py-[0.5px] text-xs md:text-sm'>
      {stringValue}
    </span>
  )
}
