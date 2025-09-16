'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Agenda } from '@/types/agenda';
import { AgendaService } from '@/lib/agendaService';
import MeetingInput from '@/components/agenda/MeetingInput';
import AgendaDisplay from '@/components/agenda/AgendaDisplay';
import TemplateSelector from '@/components/templates/TemplateSelector';
import { AgendaTemplateItem } from '@/lib/templates';
import Header from '@/components/layout/Header';

function GeneratorContent() {
  const searchParams = useSearchParams();
  const [meetingTitle, setMeetingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [, setSavedAgendaId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoadingShared, setIsLoadingShared] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  // Load shared agenda on page load
  useEffect(() => {
    const loadSharedAgenda = async () => {
      const token = searchParams.get('token');
      if (token) {
        setIsLoadingShared(true);
        try {
          const sharedAgenda = await AgendaService.getAgendaByShareToken(token);
          if (sharedAgenda) {
            setAgenda(AgendaService.toAgenda(sharedAgenda));
            setMeetingTitle(sharedAgenda.meeting_title);
            setShareToken(sharedAgenda.share_token);
            setIsConfirmed(true);
            setShowSuccessMessage(false);
          } else {
            setError('Agenda not found or is not public.');
          }
        } catch (err: unknown) {
          setError('Failed to load shared agenda.');
          console.error('Error loading shared agenda:', err);
        } finally {
          setIsLoadingShared(false);
        }
      }
    };

    loadSharedAgenda();
  }, [searchParams]);

  const handleGenerateAgenda = async (title: string) => {
    setMeetingTitle(title);
    setIsGenerating(true);
    setIsConfirmed(false);
    setShareToken(null);
    setSavedAgendaId(null);
    setError('');

    try {
      const res = await fetch('/api/generate-agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingTitle: title })
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg?.error || 'Failed to generate agenda');
      }

      const data = (await res.json()) as Agenda;
      setAgenda(data);
    } catch (e: unknown) {
      const error = e as Error;
      setError(error?.message || 'Failed to generate agenda');
      setAgenda(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!shareToken) return;
    const shareUrl = `${window.location.origin}/generate?token=${shareToken}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Agenda link copied to clipboard!');
    } catch (err: unknown) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleAgendaUpdate = (updatedAgenda: Agenda) => {
    setAgenda(updatedAgenda);
  };

  const handleConfirmAgenda = async () => {
    if (!agenda) return;
    setIsSaving(true);
    setError('');
    try {
      const agendaRecord = await AgendaService.createAgenda({
        meeting_title: meetingTitle,
        opening: agenda.opening,
        topics: agenda.topics,
        wrap_up: agenda.wrapUp,
        is_public: true
      });
      setSavedAgendaId(agendaRecord.id);
      setShareToken(agendaRecord.share_token);
      const savedAgenda = await AgendaService.getAgendaById(agendaRecord.id);
      if (savedAgenda) {
        setAgenda(AgendaService.toAgenda(savedAgenda));
        setMeetingTitle(savedAgenda.meeting_title);
      }
      setIsConfirmed(true);
      setShowSuccessMessage(true);
      alert('Agenda saved successfully!');
    } catch (err: unknown) {
      setError('Failed to save agenda. Please try again.');
      console.error('Error saving agenda:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-6">
          <MeetingInput onGenerate={handleGenerateAgenda} onOpenTemplates={() => setShowTemplates(true)} isGenerating={isGenerating} />

          {isLoadingShared && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading shared agenda...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {agenda && (
            <AgendaDisplay
              agenda={agenda}
              onShare={handleShare}
              onUpdate={handleAgendaUpdate}
              onConfirm={handleConfirmAgenda}
              isSaving={isSaving}
              isConfirmed={isConfirmed}
              isPreview={isConfirmed}
            />
          )}

          {showSuccessMessage && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700 font-medium">Agenda saved successfully!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <p className="text-xs text-gray-400">Powered by AI</p>
        </div>
      </main>

      {showTemplates && (
        <TemplateSelector
          onClose={() => setShowTemplates(false)}
          onSelect={(t: AgendaTemplateItem) => {
            setMeetingTitle(t.name);
            setAgenda({ opening: t.agenda.opening, topics: t.agenda.topics.map(tp => ({ ...tp })), wrapUp: t.agenda.wrapUp });
            setIsConfirmed(false);
            setShareToken(null);
            setShowSuccessMessage(false);
            setShowTemplates(false);
            if (typeof window !== 'undefined') {
              window.history.replaceState(null, '', '/generate');
            }
          }}
        />
      )}
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <GeneratorContent />
    </Suspense>
  );
}


