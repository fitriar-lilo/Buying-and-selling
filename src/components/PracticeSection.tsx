import { useState } from 'react';
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { Question, UserProgress } from '../types/math';

interface PracticeSectionProps {
  questions: Question[];
  progress: UserProgress;
  onAnswerChange: (questionId: number, value: string) => void;
  onToggleHint: (questionId: number) => void;
  onNavigateQuestion: (index: number) => void;
  onSubmitAndGrade: () => void;
  onSaveWork: () => void;
  onResetAnswers: () => void;
  saveMessage: string | null;
}

export function PracticeSection({
  questions,
  progress,
  onAnswerChange,
  onToggleHint,
  onNavigateQuestion,
  onSubmitAndGrade,
  onSaveWork,
  onResetAnswers,
  saveMessage,
}: PracticeSectionProps) {
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  const currentIndex = progress.currentQuestionIndex;
  const currentQuestion = questions[currentIndex] || questions[0];

  const currentAnswer = progress.answers[currentQuestion.id] || '';
  const isHintOpen = !!progress.hintsRevealed[currentQuestion.id];

  const totalQuestions = questions.length;
  const answeredCount = questions.filter(
    (q) => progress.answers[q.id] && progress.answers[q.id].trim() !== ''
  ).length;

  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      onNavigateQuestion(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigateQuestion(currentIndex - 1);
    }
  };

  const handleTriggerSubmit = () => {
    if (answeredCount < totalQuestions) {
      setShowSubmitModal(true);
    } else {
      onSubmitAndGrade();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Exercise Header & Progress Indicator */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 font-bold font-mono flex items-center justify-center text-sm">
            {currentIndex + 1}/{totalQuestions}
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Cambridge 0580 Guided Assessment</div>
            <h2 className="text-base font-bold text-slate-900">
              Exercise {currentIndex + 1}: {currentQuestion.title}
            </h2>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {saveMessage && (
            <span className="text-xs text-emerald-600 font-medium animate-fade-in flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {saveMessage}
            </span>
          )}

          <button
            type="button"
            onClick={onSaveWork}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Save current answers to browser local storage"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            <span>Save Work</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Reset exercise answers"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Jumper Tabs & Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Progress:</span>
            <span>
              {answeredCount} of {totalQuestions} answered
            </span>
          </div>
          <span className="font-mono text-slate-500 font-medium">
            {Math.round((answeredCount / totalQuestions) * 100)}% Complete
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Step Buttons (1 - 5) */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {questions.map((q, idx) => {
            const hasAns = progress.answers[q.id] && progress.answers[q.id].trim() !== '';
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onNavigateQuestion(idx)}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all flex flex-col items-center gap-0.5 ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                    : hasAns
                    ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/50'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span>Q{idx + 1}</span>
                  {hasAns && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                </div>
                <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">
                  {hasAns ? 'Answered' : 'Pending'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
        {/* Question Header & Context */}
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-indigo-600 uppercase tracking-wider">
                Question {currentQuestion.number} of {totalQuestions}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">{currentQuestion.topic}</span>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Difficulty: <span className="text-slate-800 font-semibold">{currentQuestion.difficulty}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.questionText}
          </h3>
        </div>

        {/* Given Parameters Card */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Given Exam Data</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {currentQuestion.given.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-2.5 rounded-md border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <span className="text-slate-500">{item.label}</span>
                <span className="font-mono font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Answer Input Box */}
        <div className="p-6 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`question-input-${currentQuestion.id}`}
              className="text-sm font-semibold text-slate-800"
            >
              Enter Your Numerical Answer:
            </label>
            <span className="text-xs text-slate-500">
              Unit required: <strong className="text-slate-800 font-mono">{currentQuestion.answerUnit}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              {currentQuestion.unitPosition === 'prefix' && (
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-mono font-bold text-base">
                  {currentQuestion.answerUnit}
                </div>
              )}

              <input
                id={`question-input-${currentQuestion.id}`}
                type="text"
                inputMode="decimal"
                value={currentAnswer}
                onChange={(e) => onAnswerChange(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.unitPosition === 'prefix' ? '0.00' : '0'}
                className={`w-full py-2.5 rounded-lg border border-slate-300 bg-white text-base font-mono font-semibold text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                  currentQuestion.unitPosition === 'prefix' ? 'pl-8 pr-4' : 'pl-4 pr-9'
                }`}
              />

              {currentQuestion.unitPosition === 'suffix' && (
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500 font-mono font-bold text-base">
                  {currentQuestion.answerUnit}
                </div>
              )}
            </div>

            {/* Answered Status Pill */}
            {currentAnswer.trim() !== '' ? (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Recorded
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium px-3 py-2">
                Awaiting input
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Tip: You may enter just the number (e.g.{' '}
            <code className="text-slate-700 font-mono">
              {currentQuestion.targetValue}
            </code>
            ). Currency symbols or percentage signs are handled automatically.
          </p>
        </div>

        {/* Hint Toggle Button & Accordion Box */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onToggleHint(currentQuestion.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200/60"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>{isHintOpen ? 'Hide Hint' : 'Show Hint'}</span>
            </button>

            <span className="text-xs text-slate-400">
              Exam Hint Available
            </span>
          </div>

          {isHintOpen && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <span>Guidance Hint for Question {currentQuestion.number}:</span>
              </div>

              <p className="text-xs leading-relaxed text-amber-900/90 font-medium">
                {currentQuestion.hint}
              </p>

              {currentQuestion.hintSteps && (
                <div className="pt-2 border-t border-amber-200/60 space-y-1 text-xs font-mono text-amber-900">
                  {currentQuestion.hintSteps.map((st, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-amber-600">›</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Bar (Prev, Next, Submit) */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold border transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400 bg-slate-50'
                : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>

          <div className="flex items-center gap-3">
            {!isLastQuestion ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleTriggerSubmit}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Grade</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Early Submission */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Unanswered Questions Remaining</h4>
                <p className="text-xs text-slate-600 mt-1">
                  You have completed <strong>{answeredCount}</strong> out of {totalQuestions} questions.
                  Any unanswered question will be graded as 0 marks. Do you wish to proceed?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Return to Questions
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmitAndGrade();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                Grade Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Resetting */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Reset All Answers?</h4>
                <p className="text-xs text-slate-600 mt-1">
                  This will clear all 5 entered responses so you can practice again from scratch.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  onResetAnswers();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors"
              >
                Clear Answers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
