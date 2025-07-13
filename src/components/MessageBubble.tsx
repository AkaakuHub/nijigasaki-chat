'use client';

import { Message } from '@/types/character';

interface MessageBubbleProps {
  message: Message;
  characterName?: string;
}

export default function MessageBubble({
  message,
  characterName,
}: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center mb-4">
        <div className="bg-system-notification border border-system-notification-border text-system-notification-foreground px-4 py-2 rounded-lg text-sm max-w-[80%] text-center">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-primary text-primary-foreground ml-auto'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {!isUser && characterName && (
          <div className="text-xs text-accent-foreground mb-1 font-semibold">
            {characterName}
          </div>
        )}
        <div className="text-sm">{message.text}</div>
        {message.rinaBoardState && (
          <div className="mt-2 px-2 py-1 bg-accent border border-border rounded text-xs text-accent-foreground">
            <span className="font-semibold">璃奈ちゃんボード:</span>{' '}
            {message.rinaBoardState}
          </div>
        )}
        <div className="text-xs opacity-70 mt-1">
          {new Date(message.timestamp).toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
