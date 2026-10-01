import { jsPDF } from 'jspdf';
import { Question, UserProgress } from '../types/math';

export function calculateGrade(score: number, total: number): {
  grade: string;
  verdict: string;
  color: [number, number, number];
} {
  const percentage = Math.round((score / total) * 100);
  if (percentage >= 90) {
    return { grade: 'A* (Distinction)', verdict: 'Outstanding Mastery', color: [16, 185, 129] };
  } else if (percentage >= 80) {
    return { grade: 'A (Merit)', verdict: 'Excellent Understanding', color: [37, 99, 235] };
  } else if (percentage >= 70) {
    return { grade: 'B (Good)', verdict: 'Solid Competence', color: [79, 70, 229] };
  } else if (percentage >= 60) {
    return { grade: 'C (Pass)', verdict: 'Basic Proficiency', color: [217, 119, 6] };
  } else {
    return { grade: 'Needs Revision', verdict: 'Review Key Formulas', color: [225, 29, 72] };
  }
}

export function parseAnswer(raw: string | undefined): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[^0-9.-]/g, '').trim();
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return null;
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export function isAnswerCorrect(studentVal: string | undefined, question: Question): boolean {
  const parsed = parseAnswer(studentVal);
  if (parsed === null) return false;
  return Math.abs(parsed - question.targetValue) <= question.tolerance;
}

export function generatePdfReport(
  questions: Question[],
  progress: UserProgress,
  studentNameOverride?: string
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 16;

  const displayName = (studentNameOverride || progress.studentName || 'IGCSE Student').trim();
  const evaluation = calculateGrade(progress.score, questions.length);
  const percentage = Math.round((progress.score / questions.length) * 100);
  const reportDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Top Accent Header Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, currentY, contentWidth, 24, 'F');

  // Title inside header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('CAMBRIDGE IGCSE MATHEMATICS 0580', margin + 8, currentY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('Topic Assessment Report · Buying & Selling (CP, SP, Profit, Loss & Percentages)', margin + 8, currentY + 16);

  currentY += 30;

  // Student & Performance Summary Box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, currentY, contentWidth, 32, 2, 2, 'FD');

  // Left side: Student info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text('Candidate Name:', margin + 8, currentY + 9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(displayName, margin + 44, currentY + 9);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Assessment Date:', margin + 8, currentY + 17);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(reportDate, margin + 44, currentY + 17);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Syllabus Code:', margin + 8, currentY + 25);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('0580 / C1.12 & E1.12 Financial Math', margin + 44, currentY + 25);

  // Right side: Score & Grade box
  const scoreBoxX = pageWidth - margin - 60;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(scoreBoxX, currentY + 4, 52, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(evaluation.color[0], evaluation.color[1], evaluation.color[2]);
  doc.text(`${progress.score} / ${questions.length} (${percentage}%)`, scoreBoxX + 26, currentY + 13, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Grade: ${evaluation.grade}`, scoreBoxX + 26, currentY + 20, { align: 'center' });

  currentY += 38;

  // Section Heading: Itemized Question Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('QUESTION-BY-QUESTION AUDIT', margin, currentY);

  currentY += 4;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  // Loop through questions
  questions.forEach((q) => {
    const rawAnswer = progress.answers[q.id];
    const correct = isAnswerCorrect(rawAnswer, q);

    // Check if we need a new page
    if (currentY > pageHeight - 48) {
      doc.addPage();
      currentY = 18;

      // Header on subsequent page
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`Cambridge IGCSE 0580 Assessment Report · Candidate: ${displayName}`, margin, currentY);
      currentY += 4;
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 8;
    }

    // Card background
    const cardHeight = 36;
    doc.setFillColor(correct ? 250 : 255, correct ? 252 : 250, correct ? 250 : 250);
    doc.setDrawColor(correct ? 187 : 254, correct ? 247 : 205, correct ? 208 : 211);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, cardHeight, 1.5, 1.5, 'FD');

    // Left status indicator stripe
    doc.setFillColor(correct ? 16 : 225, correct ? 185 : 29, correct ? 129 : 72);
    doc.rect(margin, currentY, 3, cardHeight, 'F');

    // Title line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`Question ${q.number}: ${q.title}`, margin + 6, currentY + 6);

    // Status Badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    if (correct) {
      doc.setTextColor(16, 185, 129); // Green
      doc.text('● CORRECT (1/1)', pageWidth - margin - 6, currentY + 6, { align: 'right' });
    } else {
      doc.setTextColor(225, 29, 72); // Red
      doc.text('▲ INCORRECT (0/1)', pageWidth - margin - 6, currentY + 6, { align: 'right' });
    }

    // Question excerpt (wrapped)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const splitText = doc.splitTextToSize(q.questionText, contentWidth - 12);
    doc.text(splitText.slice(0, 2), margin + 6, currentY + 12);

    // Answers line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('Candidate Answer:', margin + 6, currentY + 22);

    doc.setFont('courier', 'bold');
    doc.setTextColor(correct ? 16 : 225, correct ? 185 : 29, correct ? 129 : 72);
    const formattedCandidate = rawAnswer
      ? `${q.unitPosition === 'prefix' ? q.answerUnit : ''}${rawAnswer}${q.unitPosition === 'suffix' ? q.answerUnit : ''}`
      : '[No answer submitted]';
    doc.text(formattedCandidate, margin + 40, currentY + 22);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('Key Correct Answer:', margin + 85, currentY + 22);

    doc.setFont('courier', 'bold');
    doc.setTextColor(16, 185, 129);
    const formattedCorrect = `${q.unitPosition === 'prefix' ? q.answerUnit : ''}${q.targetValue}${q.unitPosition === 'suffix' ? q.answerUnit : ''}`;
    doc.text(formattedCorrect, margin + 124, currentY + 22);

    // Working snippet
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Method: ${q.explanation}`, margin + 6, currentY + 30);

    currentY += cardHeight + 4;
  });

  // Footer on current page
  if (currentY > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(
    'Generated via IGCSE Mathematics 0580 Interactive Digital Studio · Retain for student revision records.',
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  // Trigger download
  const cleanFilename = `IGCSE_Math_0580_Report_${displayName.replace(/\s+/g, '_')}.pdf`;
  doc.save(cleanFilename);
}
