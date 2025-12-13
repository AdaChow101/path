import React from 'react';
import { Question, QuestionType } from '../types';
import { Check, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  value: string | string[] | number | undefined;
  onChange: (value: string | string[] | number) => void;
  onNext: () => void;
  isLast: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, value, onChange, onNext, isLast }) => {

  const handleSingleChoice = (option: string) => {
    onChange(option);
  };

  const handleMultiChoice = (option: string) => {
    const current = (value as string[]) || [];
    const maxSelections = question.maxSelections || 3;
    
    if (current.includes(option)) {
      onChange(current.filter(item => item !== option));
    } else {
      if (current.length < maxSelections) {
        onChange([...current, option]);
      }
    }
  };

  const isSelected = (option: string) => {
    if (Array.isArray(value)) return value.includes(option);
    return value === option;
  };

  const canProceed = () => {
    if (question.type === QuestionType.MULTI_CHOICE) {
      return Array.isArray(value) && value.length > 0;
    }
    return value !== undefined && value !== '';
  };

  const maxSelections = question.maxSelections || 3;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100 animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{question.text}</h2>
        {question.subText && (
          <p className="text-slate-500 text-sm">{question.subText}</p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        {/* Single Choice */}
        {question.type === QuestionType.SINGLE_CHOICE && question.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleSingleChoice(option)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
              isSelected(option)
                ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <span className="font-medium">{option}</span>
            {isSelected(option) && <Check className="w-5 h-5 text-indigo-600" />}
          </button>
        ))}

        {/* Multi Choice */}
        {question.type === QuestionType.MULTI_CHOICE && (
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiChoice(option)}
                  disabled={!isSelected(option) && (value as string[])?.length >= maxSelections}
                  className={`text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    isSelected(option)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:bg-white'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {isSelected(option) && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              ))}
              </div>
              <p className="text-xs text-slate-400 text-right">
                已选 {(value as string[])?.length || 0} / {maxSelections}
              </p>
            </div>
        )}

        {/* Rating */}
        {question.type === QuestionType.RATING && (
          <div className="flex flex-col items-center py-6">
            <div className="w-full flex justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
              <span>{question.minLabel}</span>
              <span>{question.maxLabel}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={value as number || 3}
              onChange={(e) => onChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="mt-4 text-3xl font-bold text-indigo-600">
              {value || 3} / 5
            </div>
          </div>
        )}

        {/* Text Input */}
        {question.type === QuestionType.TEXT && (
          <textarea
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none min-h-[120px] text-slate-700"
            placeholder="请输入您的想法..."
            value={value as string || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed()}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
            canProceed()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl translate-y-0'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isLast ? '生成报告' : '下一题'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;