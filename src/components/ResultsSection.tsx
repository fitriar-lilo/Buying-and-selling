import React, { useState, useEffect } from 'react';
import {
  Download,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, UserProgress } from '../types/math';
import { calculateGrade, isAnswerCorrect, generatePdfReport } from '../utils/pdfGenerator';

interface ResultsSectionProps {
  questions: Question[];
  progress: UserProgress;
  onRetake: () => void;
  onGoToLearn: () => void;
  onUpdateStudentName: (name: string) => void;
}

export function ResultsSection({
  questions,
  progress,
  onRetake,
  onGoToLearn,
  onUpdateStudentName,
}: ResultsSectionProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [localStudentName, setLocalStudentName] = useState<string>(
    progress.studentName || 'IGCSE Student'
  );

  const evaluation = calculateGrade(progress.score, questions.length);
  const percentage = Math.round((progress.score / questions.length) * 100);

  // Trigger celebration confetti on high score
  useEffect(() => {
    if (progress.score >= 4) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [progress.score]);

  const toggleExpand = (id: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    try {
      generatePdfReport(questions, progress, localStudentName);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handleNameBlur = () => {
    onUpdateStudentName(localStudentName);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Score Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Assessment Completed · Cambridge IGCSE 0580</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Performance Review & Score
            </h1>
            <p className="text-xs text-slate-500">
              Detailed diagnostic breakdown of your answers against the official Cambridge 0580 mark scheme
            </p>
          </div>

          {/* Big Score Visual Circle / Box */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Cambridge Equivalent</div>
              <div className="text-sm font-bold text-slate-900">{evaluation.grade}</div>
              <div className="text-xs text-slate-500">{evaluation.verdict}</div>
            </div>

            <div className="w-16 h-16 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-mono font-bold shadow-xs">
              <span className="text-xl leading-none">{progress.score}/{questions.length}</span>
              <span className="text-[10px] text-slate-400 mt-1">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Student Name & Report Meta Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 space-y-1">
            <label className="text-slate-500 font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Student / Candidate Name:</span>
            </label>
            <input
              type="text"
              value={localStudentName}
              onChange={(e) => setLocalStudentName(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="Your Full Name"
              className="w-full bg-white px-2.5 py-1.5 rounded border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 space-y-1">
            <div className="text-slate-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Submission Timestamp:</span>
            </div>
            <div className="font-semibold text-slate-800 py-1.5">
              {progress.submittedAt
                ? new Date(progress.submittedAt).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 space-y-1">
            <div className="text-slate-500 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              <span>Accuracy Rating:</span>
            </div>
            <div className="font-semibold text-slate-800 py-1.5 flex items-center gap-2">
              <span>{progress.score} Correct</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-rose-600">{questions.length - progress.score} To Revise</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Retake Exercise</span>
            </button>
            <button
              type="button"
              onClick={onGoToLearn}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Review Learning Materials</span>
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Compiling PDF Report...' : 'Download PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* Itemized Questions Review Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Itemized Mark Scheme & Worked Solutions
          </h2>
          <span className="text-xs text-slate-500">
            Click any question to expand or collapse step-by-step working
          </span>
        </div>

        {questions.map((q) => {
          const rawAns = progress.answers[q.id];
          const isCorrect = isAnswerCorrect(rawAns, q);
          const isExpanded = !!expandedQuestions[q.id];

          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border transition-all overflow-hidden ${
                isCorrect ? 'border-emerald-200' : 'border-rose-200'
              }`}
            >
              {/* Question summary strip */}
              <div
                onClick={() => toggleExpand(q.id)}
                className={`p-5 flex items-center justify-between cursor-pointer select-none transition-colors ${
                  isCorrect ? 'bg-emerald-50/30 hover:bg-emerald-50/50' : 'bg-rose-50/30 hover:bg-rose-50/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="pt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700">Question {q.number}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{q.topic}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{q.title}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isCorrect ? '1 / 1 Mark' : '0 / 1 Mark'}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-100 space-y-5 bg-white">
                  {/* Question context */}
                  <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/60">
                    <strong className="text-slate-800">Problem Statement: </strong>
                    {q.questionText}
                  </div>

                  {/* Answer Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className={`p-3.5 rounded-lg border text-xs space-y-1 ${
                        isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/50 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="text-slate-500 font-medium">Your Submitted Answer:</div>
                      <div className="text-base font-mono font-bold">
                        {rawAns && rawAns.trim() !== ''
                          ? `${q.unitPosition === 'prefix' ? q.answerUnit : ''}${rawAns}${
                              q.unitPosition === 'suffix' ? q.answerUnit : ''
                            }`
                          : '[No answer recorded]'}
                      </div>
                      <div className="text-[11px] font-medium pt-1">
                        {isCorrect ? '✓ Exact match to Cambridge criteria' : '✗ Incorrect calculation'}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 text-xs space-y-1">
                      <div className="text-slate-500 font-medium">Official Mark Scheme Answer:</div>
                      <div className="text-base font-mono font-bold text-emerald-800">
                        {q.unitPosition === 'prefix' ? q.answerUnit : ''}
                        {q.targetValue}
                        {q.unitPosition === 'suffix' ? q.answerUnit : ''}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium pt-1">
                        Full marks awarded for correct numerical value
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Mark Scheme Working */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Official Working & Method Steps
                    </div>

                    <div className="space-y-2">
                      {q.solutionSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                        >
                          <div className="font-semibold text-slate-700 flex items-center justify-between">
                            <span>Step {idx + 1}: {step.step}</span>
                          </div>
                          <div className="font-mono text-indigo-900 font-semibold bg-white px-2.5 py-1.5 rounded border border-slate-200/60 inline-block">
                            {step.math}
                          </div>
                          {step.note && (
                            <p className="text-[11px] text-slate-500 italic pt-0.5">{step.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Pitfall & Examiner Tip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
                    <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 text-amber-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Common Cambridge Pitfall</span>
                      </div>
                      <p className="text-amber-900/90 leading-relaxed">{q.commonMistake}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200/60 text-indigo-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                        <Award className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Examiner Scoring Tip</span>
                      </div>
                      <p className="text-indigo-900/90 leading-relaxed">{q.examTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Download Card */}
      <div className="bg-slate-900 text-white rounded-xl p-6 md:p-8 flex items-center justify-between flex-wrap gap-4 shadow-sm">
        <div className="space-y-1 max-w-md">
          <h3 className="text-lg font-bold">Download Your Assessment Report</h3>
          <p className="text-xs text-slate-400">
            Export a clean, printable PDF containing your score, complete question audit, and Cambridge mark scheme solutions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Preparing PDF...' : 'Download PDF Report'}</span>
        </button>
      </div>
    </div>
  );
}
