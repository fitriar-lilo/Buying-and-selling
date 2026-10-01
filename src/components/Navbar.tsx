import { Save, CheckCircle2, RotateCcw } from 'lucide-react';
import { TabType } from '../types/math';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onSaveWork: () => void;
  onResetProgress: () => void;
  saveMessage: string | null;
  lastSavedAt: string | null;
}

export function Navbar({
  activeTab,
  onSelectTab,
  onSaveWork,
  onResetProgress,
  saveMessage,
  lastSavedAt,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('learn');
            }}
            className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap"
          >
            IGCSE Math 0580
          </a>
        </div>

        {/* Zone 2: Navigation Links (single line, no pill badges) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onSelectTab('learn')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'learn'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Learn (Materials)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('practice')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'practice'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Practice (Exercises)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('review')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'review'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Review (Results)
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Save Work, quick reset) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {saveMessage ? (
            <span className="text-xs text-emerald-600 font-semibold hidden md:flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{saveMessage}</span>
            </span>
          ) : lastSavedAt ? (
            <span className="text-[11px] text-slate-400 font-mono hidden lg:inline">
              Saved {new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : null}

          <button
            type="button"
            onClick={onSaveWork}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs whitespace-nowrap"
            title="Save your work to browser local storage"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Work</span>
          </button>

          <button
            type="button"
            onClick={onResetProgress}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset All Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
