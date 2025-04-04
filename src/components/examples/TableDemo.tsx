import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Globe } from "lucide-react";

// Items array remains the same
const items = [
  {
    id: "1",
    name: "Full and Historical Transparency",
    moneyPrinter: "✅",
    otherCopyPlatforms: "✅",
    financialGuru: "❌",
    mainstreamMedia: "❌",
  },
  {
    id: "2",
    name: "Multi Asset Coverage",
    moneyPrinter: "✅",
    otherCopyPlatforms: "✅",
    financialGuru: "✅",
    mainstreamMedia: "✅",
  },
  {
    id: "3",
    name: "Multi Market Coverage",
    moneyPrinter: "✅",
    otherCopyPlatforms: "❌",
    financialGuru: "❌",
    mainstreamMedia: "✅",
  },
  {
    id: "4",
    name: "A la Carte Services",
    moneyPrinter: "✅",
    otherCopyPlatforms: "✅",
    financialGuru: "❌",
    mainstreamMedia: "❌",
  },
  {
    id: "5",
    name: "1000+ Hours of Educational Resources",
    moneyPrinter: "✅",
    otherCopyPlatforms: "❌",
    financialGuru: "✅",
    mainstreamMedia: "❌",
  },
  {
    id: "6",
    name: "Community Group Chats",
    moneyPrinter: "✅",
    otherCopyPlatforms: "❌",
    financialGuru: "✅",
    mainstreamMedia: "❌",
  },
  {
    id: "7",
    name: "Live Trading Session",
    moneyPrinter: "✅",
    otherCopyPlatforms: "❌",
    financialGuru: "✅",
    mainstreamMedia: "❌",
  },
  {
    id: "8",
    name: "Economic and Trading Insights",
    moneyPrinter: "✅",
    otherCopyPlatforms: "❌",
    financialGuru: "✅",
    mainstreamMedia: "❌",
  },
];

export function TableDemo() {
  return (
    <div className="p-6 bg-background rounded-lg border border-border">
      <h2 className="text-2xl font-bold mb-6">User Accounts</h2>
      <Table>
        <TableHeader className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-foreground">Features</TableHead>
            <TableHead className="font-bold text-foreground">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-default">
                      StratsPro <span className="ml-1">ℹ️</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="dark py-3">
                    <div className="flex gap-3">
                      <Globe
                        className="mt-0.5 shrink-0 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="text-[13px] font-medium">StratsPro</p>
                        <p className="text-xs text-muted-foreground">
                          A comprehensive financial platform offering trading tools, 
                          educational resources, live market insights, and real facts.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
            <TableHead className="font-bold text-foreground">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-default">
                      Other Copy Platforms <span className="ml-1">ℹ️</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="dark py-3">
                    <div className="flex gap-3">
                      <Globe
                        className="mt-0.5 shrink-0 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="text-[13px] font-medium">Copy That.</p>
                        <p className="text-xs text-muted-foreground">
                          Prices and fees are often obscured, requiring downloads or signups to access basic info, what else are they hiding. Additionally, Trades can be delayed by months with congressmen and institutional funds are not required to disclose their transactions for up to 45+ days or just 4 times a year.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
            <TableHead className="font-bold text-foreground">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-default">
                      Financial Guru <span className="ml-1">ℹ️</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="dark py-3">
                    <div className="flex gap-3">
                      <Globe
                        className="mt-0.5 shrink-0 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="text-[13px] font-medium">Too Good to be True?</p>
                        <p className="text-xs text-muted-foreground">
                          Discord, Substack, Twitter, TikTok, YouTube -- financial tips, courses, and stock bets are everywhere. Whether it’s hype-driven marketing, Pump & Dump exit liquidity, our platform brings transparency and helps you decide.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
            <TableHead className="font-bold text-foreground">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-default">
                      Mainstream Media <span className="ml-1">ℹ️</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="dark py-3">
                    <div className="flex gap-3">
                      <Globe
                        className="mt-0.5 shrink-0 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="text-[13px] font-medium">Trust at historical lows.</p>
                        <p className="text-xs text-muted-foreground">
                          WaPo, NYT, FT, WSJ, Economist, CNBC -- modern media runs on attention, ad dollars, and private funding. Whether it’s biased or agenda-driven is up for debate, but relying on it for financial news can be very bad news.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-muted-foreground">
                {item.name}
              </TableCell>
              <TableCell className="text-center">{item.moneyPrinter}</TableCell>
              <TableCell className="text-center">{item.otherCopyPlatforms}</TableCell>
              <TableCell className="text-center">{item.financialGuru}</TableCell>
              <TableCell className="text-center">{item.mainstreamMedia}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell>Monthly Subscription Cost</TableCell>
            <TableCell className="text-center font-bold text-foreground">$35</TableCell>
            <TableCell className="text-center font-bold text-foreground">$30</TableCell>
            <TableCell className="text-center font-bold text-foreground">$200</TableCell>
            <TableCell className="text-center font-bold text-foreground">$12</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}