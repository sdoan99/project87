import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface HyvorTalkProps {
  isPrivate?: boolean;
}

export const HyvorTalk: FC<HyvorTalkProps> = ({ isPrivate = false }) => {
  const { id } = useParams();

  useEffect(() => {
    // Load Hyvor Talk script
    const script = document.createElement('script');
    script.src = 'https://talk.hyvor.com/embed/embed.js';
    script.type = 'module';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  if (isPrivate) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg text-gray-300">
        Comments are disabled for private strategies
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg text-white font-semibold mb-4">Discussion</h3>
      <div className="bg-gray-800 rounded-lg p-4">
        <hyvor-talk-comments
          website-id="13022"
          page-id={`strategy-${id}`}
        ></hyvor-talk-comments>
      </div>
    </div>
  );
};
