import { FC, useEffect } from 'react';

export const HyvorNewsletter: FC = () => {
  useEffect(() => {
    // Load Hyvor Newsletter script
    const script = document.createElement('script');
    script.src = 'https://talk.hyvor.com/embed/newsletter.js';
    script.type = 'module';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-lg text-white font-semibold mb-4">Subscribe to Updates</h3>
      <div className="bg-gray-800 rounded-lg p-4">
        <hyvor-talk-newsletter website-id="13022"></hyvor-talk-newsletter>
      </div>
    </div>
  );
};
