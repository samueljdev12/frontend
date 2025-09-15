import { useState } from 'react';
import { Agenda } from '@/types/agenda';
import Button from '@/components/ui/Button';

interface AgendaDisplayProps {
  agenda: Agenda;
  onShare: () => void;
  onUpdate: (updatedAgenda: Agenda) => void;
  onConfirm: () => void;
  isSaving?: boolean;
  isConfirmed?: boolean;
  isPreview?: boolean; // New prop to indicate if this is a preview (read-only)
}

export default function AgendaDisplay({ 
  agenda, 
  onShare,
  onUpdate,
  onConfirm,
  isSaving = false,
  isConfirmed = false,
  isPreview = false
}: AgendaDisplayProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Agenda>(agenda);

  const handleEdit = (section: string, value: string) => {
    const updated = { ...editedContent };
    if (section === 'opening') {
      updated.opening = value;
    } else if (section === 'wrapUp') {
      updated.wrapUp = value;
    }
    setEditedContent(updated);
  };

  const handleTopicEdit = (index: number, field: 'name' | 'duration', value: string) => {
    const updated = { ...editedContent };
    updated.topics[index] = { ...updated.topics[index], [field]: value };
    setEditedContent(updated);
  };

  const handleAddTopic = () => {
    const updated = { ...editedContent };
    updated.topics.push({ name: '', duration: '5 min' });
    setEditedContent(updated);
  };

  const handleRemoveTopic = (index: number) => {
    const updated = { ...editedContent };
    updated.topics.splice(index, 1);
    setEditedContent(updated);
  };

  const handleSave = () => {
    onUpdate(editedContent);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditedContent(agenda);
    setEditingSection(null);
  };
  return (
    <div className="space-y-8 pt-8 border-t border-gray-200">
      {/* Opening */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Opening</h2>
          {!isPreview && (
            <button
              onClick={() => setEditingSection(editingSection === 'opening' ? null : 'opening')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {editingSection === 'opening' ? 'Cancel' : 'Edit'}
            </button>
          )}
        </div>
        {editingSection === 'opening' ? (
          <div className="space-y-3">
            <textarea
              value={editedContent.opening}
              onChange={(e) => handleEdit('opening', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none resize-none text-gray-900 placeholder-gray-400"
              rows={3}
              placeholder="Enter opening remarks and time allocation..."
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="primary" className="text-sm py-2 px-3">
                Save
              </Button>
              <Button onClick={handleCancel} variant="secondary" className="text-sm py-2 px-3">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed">{editedContent.opening}</p>
        )}
      </div>

      {/* Topics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Topics</h2>
          {!isPreview && (
            <button
              onClick={() => setEditingSection(editingSection === 'topics' ? null : 'topics')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {editingSection === 'topics' ? 'Cancel' : 'Edit'}
            </button>
          )}
        </div>
        <div className="space-y-3">
          {editedContent.topics.map((topic, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
            >
              {editingSection === 'topics' ? (
                <div className="flex-1 flex items-center gap-3">
                  <input
                    type="text"
                    value={topic.name}
                    onChange={(e) => handleTopicEdit(index, 'name', e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded focus:border-gray-900 focus:outline-none text-sm text-gray-900 placeholder-gray-400"
                    placeholder="Enter topic name..."
                  />
                  <input
                    type="text"
                    value={topic.duration}
                    onChange={(e) => handleTopicEdit(index, 'duration', e.target.value)}
                    className="w-24 p-2 border border-gray-200 rounded focus:border-gray-900 focus:outline-none text-sm text-gray-900 placeholder-gray-400"
                    placeholder="5 min"
                  />
                  <button
                    onClick={() => handleRemoveTopic(index)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                    title="Remove topic"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-900 font-medium">{topic.name}</span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {topic.duration}
                  </span>
                </>
              )}
            </div>
          ))}
          {editingSection === 'topics' && (
            <button
              onClick={handleAddTopic}
              className="w-full p-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Topic
            </button>
          )}
        </div>
        {editingSection === 'topics' && (
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} variant="primary" className="text-sm py-2 px-3">
              Save
            </Button>
            <Button onClick={handleCancel} variant="secondary" className="text-sm py-2 px-3">
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Wrap-Up */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Wrap-Up</h2>
          {!isPreview && (
            <button
              onClick={() => setEditingSection(editingSection === 'wrapUp' ? null : 'wrapUp')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {editingSection === 'wrapUp' ? 'Cancel' : 'Edit'}
            </button>
          )}
        </div>
        {editingSection === 'wrapUp' ? (
          <div className="space-y-3">
            <textarea
              value={editedContent.wrapUp}
              onChange={(e) => handleEdit('wrapUp', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none resize-none text-gray-900 placeholder-gray-400"
              rows={3}
              placeholder="Enter wrap-up notes and action items..."
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="primary" className="text-sm py-2 px-3">
                Save
              </Button>
              <Button onClick={handleCancel} variant="secondary" className="text-sm py-2 px-3">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed">{editedContent.wrapUp}</p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-4 pt-6">
        {isConfirmed && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important:</p>
                <p>This is the only way to access your agenda. Copy the URL to share with meeting participants or save it for your records.</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          {isConfirmed ? (
            <Button onClick={onShare} variant="primary" className="flex-1">
              Copy URL
            </Button>
          ) : (
            <Button 
              onClick={onConfirm} 
              variant="primary" 
              className="flex-1"
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                'Save Agenda'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
