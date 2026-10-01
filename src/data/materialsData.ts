export interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  latexAlt?: string;
  condition?: string;
  explanation: string;
  example: string;
}

export interface ConceptBlock {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  formulas: FormulaItem[];
  caution?: string;
}

export const coreConcepts: ConceptBlock[] = [
  {
    id: 'definitions',
    title: '1. Basic Terminology',
    subtitle: 'Cost Price, Selling Price, Profit, and Loss',
    description:
      'In commercial mathematics, transactions revolve around the original cost of goods and the price they are sold for to customers.',
    keyPoints: [
      'Cost Price (CP): The total amount paid by a trader to purchase or manufacture an item.',
      'Selling Price (SP): The monetary value at which the trader sells the item to the buyer.',
      'Profit: Occurs when the Selling Price is higher than the Cost Price (SP > CP).',
      'Loss: Occurs when the Selling Price is lower than the Cost Price (SP < CP).',
    ],
    formulas: [
      {
        id: 'profit-calc',
        name: 'Monetary Profit',
        formula: 'Profit = Selling Price - Cost Price',
        condition: 'When SP > CP',
        explanation: 'The financial gain resulting when revenue exceeds direct cost.',
        example: 'If a desk is bought for $120 (CP) and sold for $170 (SP), Profit = $170 - $120 = $50.',
      },
      {
        id: 'loss-calc',
        name: 'Monetary Loss',
        formula: 'Loss = Cost Price - Selling Price',
        condition: 'When CP > SP',
        explanation: 'The financial loss suffered when goods are sold below what was paid.',
        example: 'If stock bought for $90 is cleared for $72, Loss = $90 - $72 = $18.',
      },
    ],
    caution:
      'In Cambridge IGCSE 0580 questions, always identify whether the situation represents a profit or a loss before calculating percentages.',
  },
  {
    id: 'percentages',
    title: '2. Percentage Profit & Percentage Loss',
    subtitle: 'Calculating Relative Return on Investment',
    description:
      'Percentage profit and loss measure commercial return relative to the initial expenditure. In the Cambridge syllabus, the percentage is always calculated as a fraction of the Cost Price.',
    keyPoints: [
      'The base value for percentage profit/loss is ALWAYS the Cost Price (CP).',
      'Never divide by the Selling Price when asked for percentage profit or loss.',
      'Always express the final answer as a percentage by multiplying the fraction by 100%.',
    ],
    formulas: [
      {
        id: 'perc-profit',
        name: 'Percentage Profit',
        formula: 'Percentage Profit = (Profit / Cost Price) × 100%',
        explanation: 'Computes the percentage gain relative to the cost price.',
        example: 'Cost = $150, Profit = $45. Percentage Profit = (45 / 150) × 100% = 30%.',
      },
      {
        id: 'perc-loss',
        name: 'Percentage Loss',
        formula: 'Percentage Loss = (Loss / Cost Price) × 100%',
        explanation: 'Computes the percentage deficit relative to the cost price.',
        example: 'Cost = $80, Loss = $12. Percentage Loss = (12 / 80) × 100% = 15%.',
      },
    ],
    caution:
      'Common Exam Trap: Students mistakenly compute (Profit / SP) × 100%. Remember: Profit is made ON what you spent (Cost Price), not on what you received.',
  },
  {
    id: 'finding-sp',
    title: '3. Calculating Selling Price from Cost Price',
    subtitle: 'Applying Markups, Margins, and Price Reductions',
    description:
      'When given the original Cost Price and a target percentage profit or loss, you can calculate the required Selling Price using multiplier factors.',
    keyPoints: [
      'For a profit of P%: The Selling Price represents (100 + P)% of the Cost Price.',
      'For a loss of L%: The Selling Price represents (100 - L)% of the Cost Price.',
      'Using decimal multipliers speeds up calculations and prevents rounding errors.',
    ],
    formulas: [
      {
        id: 'sp-profit',
        name: 'Selling Price with Profit (P%)',
        formula: 'Selling Price = Cost Price × (1 + P / 100)',
        explanation: 'Or: SP = CP + (P% of CP). For 25% profit, multiplier is 1.25.',
        example: 'Cost = $420, Profit = 25%. SP = 420 × 1.25 = $525.',
      },
      {
        id: 'sp-loss',
        name: 'Selling Price with Loss (L%)',
        formula: 'Selling Price = Cost Price × (1 - L / 100)',
        explanation: 'Or: SP = CP - (L% of CP). For 18% loss, multiplier is 0.82.',
        example: 'Cost = $350, Loss = 18%. SP = 350 × (1 - 0.18) = 350 × 0.82 = $287.',
      },
    ],
  },
  {
    id: 'reverse-percentage',
    title: '4. Reverse Percentages (Finding Original Cost Price)',
    subtitle: 'Cambridge IGCSE 0580 Essential Exam Topic',
    description:
      'Reverse percentage problems ask you to find the original Cost Price when the Selling Price and percentage profit or loss are known. This is one of the highest-frequency topics on Cambridge Paper 2 and Paper 4.',
    keyPoints: [
      'The original Cost Price is ALWAYS the 100% baseline.',
      'If an item is sold at 20% profit, the Selling Price represents 120% of the Cost Price.',
      'If an item is sold at 15% loss, the Selling Price represents 85% of the Cost Price.',
      'Divide the Selling Price by the percentage factor (1.20 or 0.85) to find the original 100%.',
    ],
    formulas: [
      {
        id: 'cp-reverse-profit',
        name: 'Cost Price from Profit (Reverse %)',
        formula: 'Cost Price = Selling Price / (1 + P / 100)',
        explanation: 'Divide by the profit multiplier. E.g. SP = $576 with 20% profit → CP = 576 / 1.20 = $480.',
        example: 'SP = $576, Profit = 20%. CP = 576 / 1.20 = $480.',
      },
      {
        id: 'cp-reverse-loss',
        name: 'Cost Price from Loss (Reverse %)',
        formula: 'Cost Price = Selling Price / (1 - L / 100)',
        explanation: 'Divide by the loss multiplier. E.g. SP = $170 after 15% loss → CP = 170 / 0.85 = $200.',
        example: 'SP = $170, Loss = 15%. CP = 170 / 0.85 = $200.',
      },
    ],
    caution:
      'CRITICAL WARNING: Never simply subtract 20% of the selling price! 20% of $576 is $115.20, which would yield $460.80 (wrong!). The profit was earned on the unknown cost price, not the selling price.',
  },
];

export const examTechniqueTips = [
  {
    title: 'Syllabus Accuracy: 3 Significant Figures',
    detail: 'Cambridge 0580 marks require answers to 3 significant figures unless exact or specified in currency (which requires 2 decimal places for cents/pence).',
  },
  {
    title: 'Units and Notation',
    detail: 'Always check if the question asks for a percentage (%) or a monetary amount ($). Do not write % signs if the answer line already includes it.',
  },
  {
    title: 'Check Your Work Backwards',
    detail: 'After computing Cost Price using reverse percentages, multiply your answer by the profit/loss rate to verify it lands back on the exact Selling Price.',
  },
];
