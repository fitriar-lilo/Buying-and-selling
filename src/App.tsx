import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { MaterialsSection } from './components/MaterialsSection';
import { PracticeSection } from './components/PracticeSection';
import { ResultsSection } from './components/ResultsSection';
import { questionsData } from './data/questionsData';
import { TabType, UserProgress } from './types/math';
import { isAnswerCorrect } from './utils/pdfGenerator';

const STORAGE_KEY = 'igcse_0580_buying_selling_v1';

const initialProgress: UserProgress = {
  studentName: '',
  currentQuestionIndex: 0,
  answers: {},
  hintsRevealed: {},
  isSubmitted: false,
  score: 0,
  totalQuestions: questionsData.length,
  submittedAt: null,
  lastSavedAt: null,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('learn');
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved progress from localStorage:', e);
    }
    return initialProgress;
  });

  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  const handleSaveWork = useCallback(() => {
    const now = new Date().toISOString();
    setProgress((prev) => {
      const updated = { ...prev, lastSavedAt: now };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to explicitly save to localStorage:', e);
      }
      return updated;
    });

    setSaveMessage('Saved to device');
    setTimeout(() => {
      setSaveMessage(null);
    }, 2200);
  }, []);

  const handleAnswerChange = (questionId: number, value: string) => {
    setProgress((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };

  const handleToggleHint = (questionId: number) => {
    setProgress((prev) => ({
      ...prev,
      hintsRevealed: {
        ...prev.hintsRevealed,
        [questionId]: !prev.hintsRevealed[questionId],
      },
    }));
  };

  const handleNavigateQuestion = (index: number) => {
    setProgress((prev) => ({
      ...prev,
      currentQuestionIndex: index,
    }));
  };

  const handleSubmitAndGrade = () => {
    let earnedMarks = 0;
    questionsData.forEach((q) => {
      if (isAnswerCorrect(progress.answers[q.id], q)) {
        earnedMarks += 1;
      }
    });

    const now = new Date().toISOString();
    setProgress((prev) => ({
      ...prev,
      isSubmitted: true,
      score: earnedMarks,
      submittedAt: now,
      lastSavedAt: now,
    }));

    setActiveTab('review');
    setSaveMessage('Graded & Saved');
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all progress and answers? This will clear your saved work.')) {
      setProgress(initialProgress);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
      setActiveTab('learn');
      setSaveMessage('Progress Cleared');
      setTimeout(() => setSaveMessage(null), 2000);
    }
  };

  const handleRetake = () => {
    setProgress((prev) => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: {},
      hintsRevealed: {},
      isSubmitted: false,
      score: 0,
      submittedAt: null,
      lastSavedAt: new Date().toISOString(),
    }));
    setActiveTab('practice');
  };

  const handleUpdateStudentName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar Contract (3 zones) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSaveWork={handleSaveWork}
        onResetProgress={handleResetProgress}
        saveMessage={saveMessage}
        lastSavedAt={progress.lastSavedAt}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {activeTab === 'learn' && (
          <MaterialsSection onStartPractice={() => setActiveTab('practice')} />
        )}

        {activeTab === 'practice' && (
          <PracticeSection
            questions={questionsData}
            progress={progress}
            onAnswerChange={handleAnswerChange}
            onToggleHint={handleToggleHint}
            onNavigateQuestion={handleNavigateQuestion}
            onSubmitAndGrade={handleSubmitAndGrade}
            onSaveWork={handleSaveWork}
            onResetAnswers={handleRetake}
            saveMessage={saveMessage}
          />
        )}

        {activeTab === 'review' && (
          <ResultsSection
            questions={questionsData}
            progress={progress}
            onRetake={handleRetake}
            onGoToLearn={() => setActiveTab('learn')}
            onUpdateStudentName={handleUpdateStudentName}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Cambridge IGCSE 0580</span>
            <span aria-hidden="true">·</span>
            <span>Financial Mathematics: Buying & Selling</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right">
            Designed for student revision and classroom formative assessment.
          </div>
        </div>
      </footer>
    </div>
  );
}
