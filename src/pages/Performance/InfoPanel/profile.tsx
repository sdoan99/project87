import { FC } from 'react'
import { ExternalLink, MessageSquare, Twitter, Youtube, Facebook, Instagram, Music2, MessageCircle, Globe, Mail } from 'lucide-react'
import { Button } from '../ui/button.tsx'

export const Profile: FC = () => {
  return (
    <div>
      <h3 className="text-lg text-white font-semibold mb-2">Profile</h3>
      <div className="space-y-2">
        {[
          { label: "Message", icon: MessageSquare, url: "" },
          { label: "Twitter", icon: Twitter, url: "" },
          { label: "Youtube", icon: Youtube, url: "" },
          { label: "Facebook", icon: Facebook, url: "" },
          { label: "Instagram", icon: Instagram, url: "" },
          { label: "Tiktok", icon: Music2, url: "" },
          { label: "Discord", icon: MessageCircle, url: "" },
          { label: "Website", icon: Globe, url: "" },
          { label: "Email", icon: Mail, url: "" },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-gray-400">{item.label}</span>
            <div className="flex items-center">
              <span className="text-sm text-blue-400 mr-2">{item.url}</span>
              <Button variant="link" className="text-blue-400 h-auto p-0">
                <item.icon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}