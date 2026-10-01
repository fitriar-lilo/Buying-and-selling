import { useState } from 'react';
import { BookOpen, AlertTriangle, ArrowRight, Lightbulb, CheckCircle2, Bookmark } from 'lucide-react';
import { coreConcepts, examTechniqueTips } from '../data/materialsData';
import { InteractiveCalculator } from './InteractiveCalculator';

interface MaterialsSectionProps {
  onStartPractice: () => void;
}

export function MaterialsSection({ onStartPractice }: MaterialsSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const handleCopy = (formulaText: string, id: string) => {
    navigator.clipboard?.writeText(formulaText);
    setCopiedFormula(id);
    setTimeout(() => setCopiedFormula(null), 1800);
  };

  const filteredConcepts =
    selectedTopic === 'all'
      ? coreConcepts
      : coreConcepts.filter((c) => c.id === selectedTopic);

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header Banner & Syllabus Overview */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-8 md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Cambridge IGCSE 0580 · Financial Mathematics</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              Buying & Selling
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Master the foundational financial mathematics required for Cambridge IGCSE Mathematics 0580.
              Learn how to determine Cost Price, Selling Price, monetary Profit and Loss, calculate percentage
              returns, and confidently solve tricky reverse percentage exam questions.
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap text-xs text-slate-500 font-medium">
              <span>Syllabus C1.12 & E1.12</span>
              <span aria-hidden="true">·</span>
              <span>Core & Extended</span>
              <span aria-hidden="true">·</span>
              <span>Paper 2 & Paper 4</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onStartPractice}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <span>Jump to Practice (5 Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-5 relative h-56 md:h-full min-h-[220px] bg-slate-100 overflow-hidden border-t md:border-t-0 md:border-l border-slate-200">
            <img
              src="/src/assets/images/igcse_math_finance_1790608322752.jpg"
              alt="IGCSE Mathematics Buying and Selling Financial Concepts"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // styled fallback if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback container if image fails or loading */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-800 p-6 flex flex-col justify-end text-white -z-10">
              <div className="font-mono text-xs text-indigo-300">CP · SP · % Profit · Reverse %</div>
              <div className="text-base font-semibold text-white mt-1">Formula & Concept Engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Simulator */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Dynamic Concept Visualizer</h2>
            <p className="text-xs text-slate-500">
              Manipulate values in real time to develop visual intuition for Cost Price versus Selling Price
            </p>
          </div>
        </div>
        <InteractiveCalculator />
      </section>

      {/* Topic Filter Tabs */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Key Syllabus Formulas & Rules</h2>
            <p className="text-xs text-slate-500">
              Memorize the standard Cambridge methods and highlighted formula structures
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedTopic === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Topics
            </button>
            <button
              type="button"
              onClick={() => setSelectedTopic('definitions')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedTopic === 'definitions'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Definitions
            </button>
            <button
              type="button"
              onClick={() => setSelectedTopic('percentages')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedTopic === 'percentages'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. % Profit / Loss
            </button>
            <button
              type="button"
              onClick={() => setSelectedTopic('finding-sp')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedTopic === 'finding-sp'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Finding SP
            </button>
            <button
              type="button"
              onClick={() => setSelectedTopic('reverse-percentage')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedTopic === 'reverse-percentage'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Reverse %
            </button>
          </div>
        </div>

        {/* Concept Blocks */}
        <div className="space-y-6">
          {filteredConcepts.map((concept) => (
            <div
              key={concept.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5"
            >
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                    {concept.subtitle}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{concept.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{concept.description}</p>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Core Principles
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {concept.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formula Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concept.formulas.map((f) => (
                  <div
                    key={f.id}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800">{f.name}</span>
                        {f.condition && (
                          <span className="text-[11px] font-medium text-slate-500 font-mono">
                            {f.condition}
                          </span>
                        )}
                      </div>

                      {/* Highlighted Formula Box */}
                      <div className="mt-2.5 p-3 rounded-md bg-white border border-indigo-100 shadow-xs flex items-center justify-between gap-3">
                        <code className="text-sm font-mono font-bold text-indigo-900">
                          {f.formula}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopy(f.formula, f.id)}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium shrink-0"
                          title="Copy formula text"
                        >
                          {copiedFormula === f.id ? (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Copied
                            </span>
                          ) : (
                            'Copy'
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 mt-2">{f.explanation}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-500 bg-white/60 p-2 rounded">
                      <strong className="text-slate-700">Worked Example: </strong>
                      {f.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* Caution Callout */}
              {concept.caution && (
                <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-amber-950">IGCSE Examiner Alert: </strong>
                    {concept.caution}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Exam Strategy Section */}
      <section className="bg-slate-900 text-white rounded-xl p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-2.5 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4" />
          <span>Cambridge Examination Standards & Scoring Criteria</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examTechniqueTips.map((tip, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-indigo-400 shrink-0" />
                <h4 className="text-sm font-semibold text-slate-100">{tip.title}</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{tip.detail}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-slate-400">
            Ready to test your understanding with 5 sequential questions?
          </div>
          <button
            type="button"
            onClick={onStartPractice}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
          >
            <span>Proceed to Practice Exercises</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
