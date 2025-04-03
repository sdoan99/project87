import { Marquee } from "./marquee"
import { Printer, Framer, Laptop2, Cloud } from 'lucide-react'

const Logos = {


  aws: () => (
    <div className="flex items-center gap-2 text-primary">
      <Cloud className="h-8 w-8" />
      <span className="text-xl font-bold">EURO</span>
    </div>
  ),
  tailwindcss: () => (
    <div className="flex items-center gap-2 text-cyan-500">
      <Laptop2 className="h-8 w-8" />
      <span className="text-xl font-bold">NFL</span>
    </div>
  ),
  nextjs: () => (
    <div className="flex items-center gap-2 text-primary">
      <Printer className="h-8 w-8" />
      <span className="text-xl font-bold">GOLD</span>
    </div>
  ),
  SOL: () => (
    <div className="flex items-center gap-2 text-primary">
      <Cloud className="h-8 w-8" />
      <span className="text-xl font-bold">SOL</span>
    </div>
  ),
    framer: () => (
    <div className="flex items-center gap-2 text-primary">
      <Framer className="h-8 w-8" />
      <span className="text-xl font-bold">NASDAQ</span>
    </div>
  ),
};

export function MarqueeDemo2() {
  const arr = [ Logos.nextjs, Logos.aws, Logos.tailwindcss, Logos.framer, Logos.SOL]

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