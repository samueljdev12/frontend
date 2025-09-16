import { TEMPLATES, AgendaTemplateItem } from '@/lib/templates';

type Props = {
  onSelect: (template: AgendaTemplateItem) => void;
  onClose: () => void;
};

export default function TemplateSelector({ onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Choose a Template</h3>
            <p className="text-sm text-gray-500">Start with a proven agenda structure</p>
          </div>
          <button
            aria-label="Close templates"
            onClick={onClose}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="max-h-[70vh] space-y-3 overflow-y-auto px-6 py-4">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{t.name}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-gray-600">{t.agenda.opening}</div>
                </div>
                <svg className="h-4 w-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


