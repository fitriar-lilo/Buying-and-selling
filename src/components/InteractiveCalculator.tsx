import { useState, useId } from 'react';
import { Calculator, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export function InteractiveCalculator() {
  const [costPrice, setCostPrice] = useState<number>(150);
  const [sellingPrice, setSellingPrice] = useState<number>(195);
  const costInputId = useId();
  const sellingInputId = useId();

  const cp = Math.max(1, costPrice || 0);
  const sp = Math.max(0, sellingPrice || 0);

  const difference = sp - cp;
  const isProfit = difference > 0;
  const isBreakEven = difference === 0;
  const absDiff = Math.abs(difference);
  const percentage = cp > 0 ? (absDiff / cp) * 100 : 0;

  // Percentage bar widths
  const maxVal = Math.max(cp, sp, 1);
  const cpBarWidth = Math.min(100, Math.round((cp / maxVal) * 100));
  const spBarWidth = Math.min(100, Math.round((sp / maxVal) * 100));

  const applyPreset = (presetCp: number, presetSp: number) => {
    setCostPrice(presetCp);
    setSellingPrice(presetSp);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Interactive Formula Visualizer
            </h3>
            <p className="text-xs text-slate-500">
              Explore how Cost Price and Selling Price dynamically drive Profit, Loss, and Percentages
            </p>
          </div>
        </div>

        {/* Preset quick buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-medium mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset(150, 195)}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Q1 Bicycle ($150 → $195)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(80, 68)}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Q2 Book ($80 → $68)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(420, 525)}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Q3 Watch ($420 → $525)
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs and Sliders */}
        <div className="lg:col-span-6 space-y-6">
          {/* Cost Price Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor={costInputId} className="text-sm font-semibold text-slate-800">
                Cost Price (CP)
              </label>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-slate-500">$</span>
                <input
                  id={costInputId}
                  type="number"
                  min="1"
                  max="2000"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Math.max(1, Number(e.target.value) || 0))}
                  className="w-24 px-2.5 py-1 text-sm font-mono font-medium border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-right"
                />
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="5"
              value={costPrice}
              onChange={(e) => setCostPrice(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>$10</span>
              <span>$500</span>
              <span>$1,000</span>
            </div>
          </div>

          {/* Selling Price Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor={sellingInputId} className="text-sm font-semibold text-slate-800">
                Selling Price (SP)
              </label>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-slate-500">$</span>
                <input
                  id={sellingInputId}
                  type="number"
                  min="0"
                  max="3000"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value) || 0))}
                  className="w-24 px-2.5 py-1 text-sm font-mono font-medium border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-right"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1200"
              step="5"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>$0</span>
              <span>$600</span>
              <span>$1,200</span>
            </div>
          </div>

          {/* Comparative Scaling Visual Bar */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Visual Proportion Bar
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Cost Price Base (100%)</span>
                  <span className="font-mono font-medium text-slate-800">${cp.toFixed(2)}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-slate-600 rounded transition-all duration-300"
                    style={{ width: `${cpBarWidth}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Selling Price Realized</span>
                  <span className="font-mono font-medium text-slate-800">${sp.toFixed(2)}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded overflow-hidden">
                  <div
                    className={`h-full rounded transition-all duration-300 ${
                      isProfit
                        ? 'bg-emerald-500'
                        : isBreakEven
                        ? 'bg-slate-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${spBarWidth}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Real-Time Results & Working Steps */}
        <div className="lg:col-span-6 bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 space-y-5">
          {/* Outcome Badge */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <div className="text-xs text-slate-500 font-medium">Outcome Status</div>
              <div className="text-lg font-bold flex items-center gap-2 mt-0.5">
                {isBreakEven ? (
                  <span className="text-slate-700">Break-Even (No Profit / Loss)</span>
                ) : isProfit ? (
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Profit Earned
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-rose-600" />
                    Loss Incurred
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">
                {isProfit ? 'Profit Amount' : isBreakEven ? 'Difference' : 'Loss Amount'}
              </div>
              <div
                className={`text-xl font-bold font-mono ${
                  isProfit
                    ? 'text-emerald-700'
                    : isBreakEven
                    ? 'text-slate-700'
                    : 'text-rose-700'
                }`}
              >
                ${absDiff.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Formula Substitution Walkthrough */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Step-by-Step Formula Substitution
            </div>

            {/* Step 1 */}
            <div className="p-3 bg-white rounded-lg border border-slate-200/60 shadow-xs space-y-1">
              <div className="text-xs font-semibold text-slate-600">
                1. Calculate Monetary {isProfit ? 'Profit' : 'Loss'}
              </div>
              <div className="text-xs font-mono text-slate-800">
                {isProfit
                  ? `Profit = SP - CP = $${sp} - $${cp} = $${absDiff.toFixed(2)}`
                  : isBreakEven
                  ? `SP - CP = $${sp} - $${cp} = $0`
                  : `Loss = CP - SP = $${cp} - $${sp} = $${absDiff.toFixed(2)}`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-white rounded-lg border border-slate-200/60 shadow-xs space-y-1">
              <div className="text-xs font-semibold text-slate-600">
                2. Apply Cambridge Percentage Formula
              </div>
              <div className="text-xs font-mono text-indigo-700 font-medium">
                {isProfit ? 'Percentage Profit' : 'Percentage Loss'} = ({isProfit ? 'Profit' : 'Loss'} / CP) × 100%
              </div>
              <div className="text-xs font-mono text-slate-800">
                = (${absDiff.toFixed(2)} / ${cp}) × 100%
              </div>
              <div className="text-sm font-mono font-bold text-slate-900 pt-1 flex items-center gap-2">
                <span>=</span>
                <span
                  className={`px-2 py-0.5 rounded ${
                    isProfit ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {percentage.toFixed(2)}%
                </span>
                <span className="text-xs font-normal text-slate-500 font-sans">
                  ({percentage >= 0 ? Math.round(percentage * 100) / 100 : 0}% on cost)
                </span>
              </div>
            </div>

            {/* Multiplier equivalent */}
            <div className="text-xs text-slate-500 pt-1 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Multiplier equivalent:{' '}
                <code className="text-slate-800 font-mono font-medium">
                  {isProfit
                    ? `1 + ${(percentage / 100).toFixed(4)} = ${(1 + percentage / 100).toFixed(4)}`
                    : `1 - ${(percentage / 100).toFixed(4)} = ${(1 - percentage / 100).toFixed(4)}`}
                </code>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
