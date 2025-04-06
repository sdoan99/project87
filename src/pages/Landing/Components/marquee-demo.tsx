import { Marquee } from "./marquee"
import { Printer, Framer, Laptop2, Cloud } from 'lucide-react'

const Logos = {
  tailwindcss: () => (
    <div className="flex items-center gap-2 text-cyan-500">
      <Laptop2 className="h-8 w-8" />
      <span className="text-xl font-bold">NYSE</span>
    </div>
  ),
  nextjs: () => (
    <div className="flex items-center gap-2 text-primary">
      <Printer className="h-8 w-8" />
      <span className="text-xl font-bold">NIKKEI</span>
    </div>
  ),
  LSE: () => (
    <div className="flex items-center gap-2 text-primary">
      <Laptop2 className="h-8 w-8" />
      <span className="text-xl font-bold">LSE</span>
    </div>
  ),
  framer: () => (
    <div className="flex items-center gap-2 text-primary">
      <Framer className="h-8 w-8" />
      <span className="text-xl font-bold">MLB</span>
    </div>
  ),
  aws: () => (
    <div className="flex items-center gap-2 text-primary">
      <Cloud className="h-8 w-8" />
      <span className="text-xl font-bold">BTC</span>
    </div>
  ),
};

export function MarqueeDemo() {
  const arr = [Logos.tailwindcss, Logos.LSE, Logos.framer, Logos.nextjs, Logos.aws]

  return (
    <Marquee>
      {arr.map((Logo, index) => (
        <div
          key={index}
          className="relative h-full w-fit mx-[4rem] flex items-center justify-start"
        >
          <Logo />
        </div>
      ))}
    </Marquee>
  )
}