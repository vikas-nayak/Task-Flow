"use client";
import { Button } from '@/components/ui/button';

export default function page() {
  const handleConnect = async () => {
    try {
      const response = await fetch('/api/auth/gmail/connect');
      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('Failed to initiate Gmail connection:', error);
    }
  };

  return (
    <Button 
      onClick={handleConnect}
      className="flex items-center gap-2"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
      Connect Gmail
    </Button>
  );
}