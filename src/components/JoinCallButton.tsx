import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { getUserToken } from '../lib/user-auth';

interface JoinCallButtonProps {
  sessionId: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function JoinCallButton({ 
  sessionId, 
  className,
  variant = "outline",
  size = "sm" 
}: JoinCallButtonProps) {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinCall = async () => {
    try {
      setIsJoining(true);
      const token = getUserToken();
      const res = await fetch(`/api/user/sessions/${sessionId}/join`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to join session');
        setIsJoining(false);
        return;
      }
      if (data.joinUrl) {
        window.location.href = data.joinUrl;
      }
    } catch (err) {
      console.error('Error joining session:', err);
      alert('Network error. Please try again.');
      setIsJoining(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      disabled={isJoining}
      onClick={handleJoinCall}
      className={className || "border-primary/30 text-primary hover:text-[#0A0B0E] hover:bg-primary cursor-pointer shrink-0 text-xs rounded-lg px-4 h-9 font-bold bg-primary/10"}
    >
      {isJoining ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
          Connecting...
        </span>
      ) : (
        <span className="flex items-center gap-1">
          Join Call <ExternalLink size={11} className="ml-1" />
        </span>
      )}
    </Button>
  );
}
