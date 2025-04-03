import React, { useEffect } from 'react';
import { Pricing } from '../../components/ui/pricing';
import { TableDemo } from '../../components/examples/TableDemo';

const demoPlans = [
  {
    name: "Community",
    price: "0",
    yearlyPrice: "0",
    period: "Forever",
    features: [
      "Live PnL Tracking",
      "Basic Strategy Metrics",
      "Tested Performance History",
      "Community Chat",
      "Token Rewards",
      "Educational Resources",
      "Unbiased News",
    ],
    description: "Perfect for simulation and educational insights",
    buttonText: "Join Free Now",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "Premium",
    price: "42",
    yearlyPrice: "35",
    period: "per month",
    features: [
      "Everything in Community",
      "Full Backtest History",
      "Advanced Metrics",
      "Upload Your Trades for Personalized PnL",
      "Premium Educational Content",
      "Priority for selecting the next backtest strategy",
      "Strategy Alerts",
      "Real-Time Trade Syncing",
      "5x Community Rewards",
      "Unlimited Backtesting",
    ],
    description: "Ideal for researching and finding new markets",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "Premium+ Pro Max",
    price: "66",
    yearlyPrice: "55",
    period: "per month",
    features: [
      "Everything in Premium",
      "Real-Time Strategy Simulator",
      "Exclusive Metrics Dashboard",
      "Priority Community Access",
      "Alerts for confluence across strategies",
      "Copy Trading",
      "15x Community Rewards",
    ],
    description: "For the large sized Speculator",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

export default function Price() {
  // Listen to theme changes and update body class
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          document.body.style.backgroundColor = isDark ? '#111827' : '#ffffff';
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <div className="flex-grow pt-16">
        <Pricing 
          plans={demoPlans}
          title="Simple, Transparent Pricing"
          description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
        />
        
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Our Active Subscribers
          </h2>
          <TableDemo />
        </div>
      </div>
    </div>
  );
}