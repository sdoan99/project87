import React from 'react';

function Changelog() {
  const changelogs = [
    {
      version: 'v 1.0.3',
      date: 'April 21, 2025',
      title: 'Alpaca Integration',
      bannerBg: 'bg-gradient-to-r from-[#1a8cff] to-[#2ce1c2]',
      bannerText: 'Alpaca Live Data',
      heading: 'Seamless Trading with Alpaca',
      subtitle: 'Investment grade data now available',
      bullets: [
        'Alpaca data connected to enable live testing and real-time market data from Strats.Pro',
        'Automate strategy testing with real market orders',
        'Supports both paper and live trading accounts',
        'Automated trading and live brokerage connectivity coming soon',
      ],
    },
    /*
    {
      version: 'v 1.0.2',
      date: 'April 20, 2025',
      title: 'Clerk Sign In and Web 3 Integration',
      bannerBg: 'bg-gradient-to-r from-[#bb0999] to-[#df801c]',
      bannerText: 'Easy Sign In + Borderless Wallets',
      heading: 'One small step for StratsPro, an even smaller step for onboarding',
      subtitle: '',
      bullets: [
        'Clerk enables google, email, + user signin without entering sensitive email info',
        'Clerk has Web3 crypto wallet integration to enable token verification',
        'Web3 and crypto is an emerging technology class that aligns perfectly with financial innovation and wellness',
        'Additional user authorization methods will be added in the future',
      ],
    },
		*/
    {
      version: 'v 1.0.1',
      date: 'April 3, 2025',
      title: 'Website Launched',
      bannerBg: 'bg-blue-600',
      bannerText: 'Strats.Pro',
      heading: 'Website soft launched',
      subtitle: '',
      bullets: [
        'Early alpha version of Strats.Pro launched',
        'Current v 1.0.1 includes Strategy Builder, Strategy Browser, Performance Monitor, and Trade Journalling',
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-900 pt-24'>
      <main className='container mx-auto py-12 flex flex-col gap-12 px-6 sm:px-9 lg:px-56'>
        {changelogs.map((log, idx) => (
          <div key={idx} className='bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-800'>
            <h3 className='text-xl font-semibold mb-2'>{log.title}</h3>
            <div
              className={`${log.bannerBg} rounded-lg mb-4 w-full max-w-2xl h-40 flex items-center justify-center`}
            >
              <h4 className='text-white text-5xl font-bold pl-10'>{log.bannerText}</h4>
            </div>
            <div className='mb-4'>
              <span className='inline-block bg-gray-800 text-xs rounded px-2 py-1 font-mono mb-2'>
                {log.version}
              </span>
              <span className='ml-2 text-sm text-gray-400'>{log.date}</span>
            </div>
            <h3 className='text-xl font-semibold mb-2'>{log.heading}</h3>
            {log.subtitle && <div className='text-base text-gray-300 mb-4'>{log.subtitle}</div>}
            <ul className='list-disc ml-6 text-gray-200'>
              {log.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Changelog;
