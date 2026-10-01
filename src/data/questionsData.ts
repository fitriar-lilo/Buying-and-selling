import { Question } from '../types/math';

export const questionsData: Question[] = [
  {
    id: 1,
    number: 1,
    title: 'Percentage Profit Calculation',
    topic: 'Basic Profit & Percentages',
    difficulty: 'Foundation',
    scenarioContext: 'Trading & Markup',
    questionText:
      'A trader buys a bicycle for $150 and sells it for $195. Calculate the percentage profit.',
    given: [
      { label: 'Cost Price (CP)', value: '$150' },
      { label: 'Selling Price (SP)', value: '$195' },
    ],
    answerUnit: '%',
    unitPosition: 'suffix',
    targetValue: 30,
    tolerance: 0.05,
    hint: 'First find the monetary profit by subtracting Cost Price from Selling Price. Then divide that profit by the original Cost Price ($150) and multiply by 100%.',
    hintSteps: [
      'Step 1: Profit = Selling Price - Cost Price = $195 - $150',
      'Step 2: Percentage Profit = (Profit / Cost Price) × 100%',
    ],
    explanation:
      'Profit = $195 - $150 = $45. Percentage Profit = (45 / 150) × 100% = 30%.',
    solutionSteps: [
      {
        step: 'Calculate the monetary profit',
        math: 'Profit = SP - CP = $195 - $150 = $45',
        note: 'Always verify SP > CP to confirm profit.',
      },
      {
        step: 'Divide profit by the Cost Price',
        math: 'Fractional Gain = 45 / 150 = 0.30',
        note: 'Remember: Always divide by Cost Price ($150), never Selling Price ($195).',
      },
      {
        step: 'Convert fraction to percentage',
        math: 'Percentage Profit = 0.30 × 100% = 30%',
      },
    ],
    commonMistake:
      'Dividing by $195 (Selling Price) instead of $150 (Cost Price), which erroneously gives 23.08%.',
    examTip:
      'Always state your formula clearly in IGCSE working: (Profit / CP) × 100 earns method marks even if an arithmetic slip occurs.',
  },
  {
    id: 2,
    number: 2,
    title: 'Percentage Loss Calculation',
    topic: 'Loss & Deficit Percentages',
    difficulty: 'Foundation',
    scenarioContext: 'Inventory Clearance',
    questionText:
      'A bookstore purchases a rare encyclopaedia for $80. After several months without a buyer, the store sells it for $68. Calculate the percentage loss.',
    given: [
      { label: 'Cost Price (CP)', value: '$80' },
      { label: 'Selling Price (SP)', value: '$68' },
    ],
    answerUnit: '%',
    unitPosition: 'suffix',
    targetValue: 15,
    tolerance: 0.05,
    hint: 'Find the dollar loss first: Loss = CP - SP ($80 - $68). Then calculate what percentage this loss is of the original Cost Price ($80).',
    hintSteps: [
      'Step 1: Loss = Cost Price - Selling Price = $80 - $68',
      'Step 2: Percentage Loss = (Loss / Cost Price) × 100%',
    ],
    explanation:
      'Loss = $80 - $68 = $12. Percentage Loss = (12 / 80) × 100% = 15%.',
    solutionSteps: [
      {
        step: 'Calculate monetary loss',
        math: 'Loss = CP - SP = $80 - $68 = $12',
      },
      {
        step: 'Express loss as a fraction of Cost Price',
        math: 'Fractional Loss = 12 / 80 = 0.15',
        note: 'The initial expenditure ($80) is the 100% denominator.',
      },
      {
        step: 'Multiply by 100% to obtain the percentage',
        math: 'Percentage Loss = 0.15 × 100% = 15%',
      },
    ],
    commonMistake:
      'Calculating 12 / 68 = 17.65% by mistakenly taking the discounted selling price as the base.',
    examTip:
      'In Cambridge 0580 mark schemes, "percentage loss" is written as a positive number (15%), as the word "loss" already indicates the direction.',
  },
  {
    id: 3,
    number: 3,
    title: 'Determining Selling Price with Profit',
    topic: 'Applying Percentage Markup',
    difficulty: 'Core',
    scenarioContext: 'Retail Pricing Strategy',
    questionText:
      'A jeweler buys a watch for $420. She wants to make a 25% profit when selling it. Calculate the selling price of the watch in dollars.',
    given: [
      { label: 'Cost Price (CP)', value: '$420' },
      { label: 'Target Profit', value: '25%' },
    ],
    answerUnit: '$',
    unitPosition: 'prefix',
    targetValue: 525,
    tolerance: 0.05,
    hint: 'Calculate 25% of $420 and add it to $420. Alternatively, multiply $420 directly by 1.25 (since 100% + 25% = 125%).',
    hintSteps: [
      'Method A: Profit = 0.25 × $420 = $105; SP = $420 + $105',
      'Method B: SP = $420 × 1.25',
    ],
    explanation:
      'Selling Price = $420 × 1.25 = $525 (or $420 + $105 = $525).',
    solutionSteps: [
      {
        step: 'Calculate 25% of the Cost Price',
        math: 'Profit = 25% of $420 = 0.25 × 420 = $105',
      },
      {
        step: 'Add profit to original cost price',
        math: 'Selling Price = CP + Profit = $420 + $105 = $525',
      },
      {
        step: 'Alternative single-step decimal multiplier',
        math: 'Selling Price = $420 × (1 + 0.25) = $420 × 1.25 = $525',
        note: 'Using multiplier 1.25 is faster and recommended for IGCSE Paper 4.',
      },
    ],
    commonMistake:
      'Stopping after finding $105 (the profit amount) without adding it back to the cost price to get the selling price.',
    examTip:
      'Always reread the question: Does it ask for "the profit made" or "the selling price"? Here it specifically asks for selling price.',
  },
  {
    id: 4,
    number: 4,
    title: 'Determining Selling Price with Loss',
    topic: 'Applying Percentage Reductions',
    difficulty: 'Core',
    scenarioContext: 'Clearance & Discount Sale',
    questionText:
      'An electronics retailer buys a tablet for $350. Because a newer model is released, the retailer sells the tablet at a loss of 18%. Calculate the selling price in dollars.',
    given: [
      { label: 'Cost Price (CP)', value: '$350' },
      { label: 'Loss Percentage', value: '18%' },
    ],
    answerUnit: '$',
    unitPosition: 'prefix',
    targetValue: 287,
    tolerance: 0.05,
    hint: 'The selling price will be 18% less than $350. Calculate 18% of $350 and subtract it, or multiply $350 by (100% - 18%) = 82% = 0.82.',
    hintSteps: [
      'Method A: Loss = 0.18 × $350 = $63; SP = $350 - $63',
      'Method B: SP = $350 × (1 - 0.18) = $350 × 0.82',
    ],
    explanation:
      'Selling Price = $350 × 0.82 = $287 (or $350 - $63 = $287).',
    solutionSteps: [
      {
        step: 'Calculate the loss amount',
        math: 'Loss = 18% of $350 = 0.18 × 350 = $63',
      },
      {
        step: 'Subtract loss from the Cost Price',
        math: 'Selling Price = $350 - $63 = $287',
      },
      {
        step: 'Alternative decimal multiplier method',
        math: 'Selling Price = $350 × (1 - 0.18) = $350 × 0.82 = $287',
        note: 'Since 18% is lost, the retailer retains 82% of the initial cost.',
      },
    ],
    commonMistake:
      'Adding $63 instead of subtracting it, resulting in $413 (which would be a profit, not a loss).',
    examTip:
      'Sanity check: When selling at a loss, your final answer MUST be lower than the cost price ($287 < $350).',
  },
  {
    id: 5,
    number: 5,
    title: 'Reverse Percentage: Finding Original Cost Price',
    topic: 'Reverse Percentages (Exam Classic)',
    difficulty: 'Extended',
    scenarioContext: 'Back-calculating Wholesale Cost',
    questionText:
      'A shop sells a smartphone for $576, making a profit of 20% on the cost price. Calculate the original cost price of the smartphone in dollars.',
    given: [
      { label: 'Selling Price (SP)', value: '$576' },
      { label: 'Profit on Cost Price', value: '20%' },
    ],
    answerUnit: '$',
    unitPosition: 'prefix',
    targetValue: 480,
    tolerance: 0.05,
    hint: 'Do NOT just subtract 20% of $576! The $576 already includes the 20% profit, meaning $576 = 120% of Cost Price. Set up: 1.20 × CP = $576, then divide $576 by 1.20.',
    hintSteps: [
      'Cost Price is 100%. With 20% profit, Selling Price = 120%.',
      '120% = $576 → 1% = $576 / 120 = $4.80',
      '100% (Cost Price) = $4.80 × 100 = $480',
    ],
    explanation:
      'Cost Price = $576 / 1.20 = $480. Checking: 20% of $480 is $96; $480 + $96 = $576.',
    solutionSteps: [
      {
        step: 'Identify the percentage represented by the Selling Price',
        math: 'Selling Price = 100% (CP) + 20% (Profit) = 120% of CP',
        note: 'Crucial IGCSE concept: The unknown CP is 100%.',
      },
      {
        step: 'Set up the algebraic relation',
        math: '1.20 × Cost Price = $576',
      },
      {
        step: 'Solve for Cost Price by division',
        math: 'Cost Price = $576 / 1.20 = $480',
      },
      {
        step: 'Verification check',
        math: 'Check: $480 × 0.20 = $96. $480 + $96 = $576 ✓',
      },
    ],
    commonMistake:
      'Calculating 20% of $576 = $115.20 and subtracting: $576 - $115.20 = $460.80. This is the single most common reverse percentage error in Cambridge examinations!',
    examTip:
      'Whenever an exam question mentions a price AFTER an increase or profit, always divide by (1 + rate) to get the original price.',
  },
];
