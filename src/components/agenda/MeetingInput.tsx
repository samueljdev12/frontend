import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface MeetingInputProps {
  onGenerate: (title: string) => void;
  onOpenTemplates?: () => void;
  isGenerating: boolean;
}

export default function MeetingInput({ onGenerate, onOpenTemplates, isGenerating }: MeetingInputProps) {
  const [meetingTitle, setMeetingTitle] = useState('');

  const handleSubmit = () => {
    if (meetingTitle.trim()) {
      onGenerate(meetingTitle);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <Input
        value={meetingTitle}
        onChange={(e) => setMeetingTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What's your meeting about?"
        autoFocus
      />
      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!meetingTitle.trim() || isGenerating}
          className="flex-1 py-4"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </div>
          ) : (
            'Generate Agenda'
          )}
        </Button>
        {onOpenTemplates && (
          <Button
            onClick={onOpenTemplates}
            variant="secondary"
            className="px-4 py-4"
            disabled={isGenerating}
          >
            Templates
          </Button>
        )}
      </div>
    </div>
  );
}
