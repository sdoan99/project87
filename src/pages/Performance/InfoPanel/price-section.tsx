import { FC } from 'react'

export const PriceSection: FC = () => {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl text-white font-semibold">4,022.03</span>
        <span className="text-sm text-gray-400">USD</span>
      </div>
      <div className="flex items-center gap-2 text-emerald-400">
        <span>+233.10</span>
        <span>+6.15%</span>
        <span className="text-sm">Market open</span>
      </div>
    </div>
  )
}

