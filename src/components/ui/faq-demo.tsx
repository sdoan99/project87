import { FaqSection } from "./faq-section";

const DEMO_FAQS = [
  {
    question: "What makes Money Printer different from other stock research tools",
    answer: "Money Printer stands apart as the open book of financial trading and investing strategies -- delivering live, transparent profit-and-loss tracking for strategies that were once reserved for the wealthy. By making these once exclusive and private approaches open, the platform democratizes access, and makes powerful financial education and tools accesible to everyone.",
  },
  {
    question: "How do I find trading strategies that match my risk level?",
    answer: "Risk tolerance is highly personal, influenced by factors like beginning portfolio size, bet sizing, drawdown tolerance, variance, and individual goals—all of which can vary significantly. Our algorithms analyze these variables and generate long-term performance records for a wide range of strategies. This transparency helps our community make more informed decisions, offering insights that many have found invaluable."
  },
  {
    question: "How can I compare different trading strategies?",
    answer: "Our platform features strategies across multiple asset classes and markets, including stocks, options, futures, debt instruments, and emerging alternatives like cryptocurrencies, peer-to-peer sports analytics, and even Pokémon markets. If a unique trading or investing strategy exists, it finds its way here. You can explore and customize metrics for these strategies on the [Strategies Page]."
  },
  {
    question: "How can I tell if a strategy is good for someone new to investing?",
    answer: "Look for strategies marked as “Beginner-Friendly” in the strategy’s profile. Additionally, read user reviews—many reviewers mention if a strategy was easy to understand or implement as a beginner. Strategies with clear instructions, low risk, and minimal complexity are often best for new investors. Investing and trading is a great journey to embark on and the first step is finding one that is beginner friendly."
  },
  {
    question: "Will the premium plan be too advanced for someone new to trading?",
    answer: "Not at all! While the premium plan includes advanced features like leverage, corporate terminology, and multi input trading, we’ve designed the platform to be open and accessible for all users. You’ll find beginner-friendly tutorials and tooltips to help you navigate. You can also start with the basics and explore advanced tools as you gain experience and confidence."
  },
  {
    question: "What payment methods can I use to subscribe?",
    answer: "We process payments securely through Stripe, which supports major credit and debit cards (Visa, MasterCard, American Express), as well as PayPal and Apple Pay. You can choose your preferred payment method at checkout on the Subscriptions page. We're continually expanding our payment options, so stay tuned for updates!"
  },
  {
    question: "Can I pay for my subscription with cryptocurrency?",
    answer: "We also accept cryptocurrency payments in addition to traditional payment processing through Stripe. As a global platform with users worldwide, we recognize that cryptocurrency is a preferred payment method for many of our community members. We're committed to meeting the needs of all users, no matter where they are."
  },
  {
    question: "What is the refund policy for subscriptions?",
    answer: "We are proud to offer a Free, Premium, and Premium+ tier for our community members. The Free tier offers a preview of the platform features free forever with Premium and Premium+ providing an edge to the markets that would normally take several months to multiple years for people to discover. Our community members will find a lot of value in the various product offerings, and we fully believe this is a very unique value opportunity to our subscribers at this level."
  },
  {
    question: "How can I add real-time data to my account?",
    answer: "You can add real-time data by upgrading to a premium plan or purchasing it as an add-on. Go to your account settings, select “Subscriptions,” and choose the “Add Real-Time Data” option. Follow the prompts to complete your purchase, and the data will be available immediately."
  },
  {
    question: "What markets are covered by the real-time data add-on?",
    answer: "Our real-time data add-on covers major markets, including stocks, options, forex, cryptocurrencies, and commodities. You can view the full list of supported markets on the “Real-Time Data” page under your account settings. If you need data for a specific market, contact support to confirm availability."
  },
  {
    question: "How can I respond to a review of my strategy?",
    answer: "To respond to a review, go to your strategy’s profile page and find the review under the “Reviews” section. Click “Reply” next to the review, type your response, and submit. Your reply will be visible to all users after a quick moderation check, typically within 24 hours."
  },
  {
    question: "Can I report a review if I think it’s unfair?",
    answer: "Yes, you can report a review by clicking the “Report” button next to it on your strategy’s profile page. Select a reason for the report (e.g., “Inappropriate Content,” “False Information”) and submit. Our moderation team will review the report and take action if necessary."
  }
];

export function FaqSectionDemo() {
  return (
    <div className="w-full flex justify-center items-start py-4 sm:py-8">
      <FaqSection
        title="Frequently Asked Questions"
        items={DEMO_FAQS}
        contactInfo={{
          title: "Still have questions?",
          description: "We're here to help you",
          buttonText: "Contact Support",
          onContact: () => console.log("Contact support clicked"),
        }}
      />
    </div>
  );
}