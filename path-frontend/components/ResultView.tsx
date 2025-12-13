import React, { useState } from 'react';
import { CareerReport } from '../types';
import { 
  Download, 
  RefreshCw, 
  Briefcase, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb,
  Map,
  User,
  Share2
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip 
} from 'recharts';

interface ResultViewProps {
  report: CareerReport;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ report, onReset }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleShare = async () => {
    const summary = `🚀 PathFinder AI 职业规划报告

👤 我的职业画像：${report.archetype}
📝 ${report.archetypeDescription}

🎯 推荐方向：${report.recommendedJobs.map(j => j.title).join(' / ')}
✨ 核心优势：${report.strengths.slice(0, 3).join('、')}

🔮 探索你的职业未来，快来测试吧！`;

    try {
      await navigator.clipboard.writeText(summary);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Header / Archetype */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-900 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-indigo-100 font-medium tracking-wide uppercase text-sm">
                <User className="w-4 h-4" />
                <span>您的职业画像</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{report.archetype}</h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl leading-relaxed opacity-90">
            {report.archetypeDescription}
            </p>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Personality Summary */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Lightbulb className="w-5 h-5" />
             </div>
             <h3 className="text-xl font-bold text-slate-800">深度解析</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-justify">
            {report.personalitySummary}
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                  <h4 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> 核心优势
                  </h4>
                  <ul className="space-y-2">
                    {report.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>
                            {s}
                        </li>
                    ))}
                  </ul>
              </div>
              <div className="flex-1">
                  <h4 className="text-sm font-semibold text-amber-600 mb-3 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> 潜在盲点
                  </h4>
                   <ul className="space-y-2">
                    {report.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                            {w}
                        </li>
                    ))}
                  </ul>
              </div>
          </div>
        </div>

        {/* Visual Chart - Radar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[300px]">
           <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
             <ActivityIcon /> 能力维度雷达
           </h3>
           <div className="w-full h-64">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="70%" data={report.radarChartData}>
                 <PolarGrid stroke="#e2e8f0" />
                 <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                 />
                 <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                 <Radar
                   name="能力值"
                   dataKey="A"
                   stroke="#6366f1"
                   strokeWidth={2}
                   fill="#818cf8"
                   fillOpacity={0.5}
                 />
                 <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                 />
               </RadarChart>
             </ResponsiveContainer>
           </div>
           <p className="text-xs text-center text-slate-400 mt-2">基于 AI 分析的六维能力模型</p>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" />
            推荐职业方向
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {report.recommendedJobs.map((job, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                        <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                            {job.matchScore}% 匹配
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 flex-grow">{job.reason}</p>
                    <div className="mt-auto">
                        <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">关键技能</p>
                        <div className="flex flex-wrap gap-2">
                            {job.requiredSkills.map((skill, skIdx) => (
                                <span key={skIdx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Action Plan & Outlook */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
             <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                    <Map className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-indigo-900">行动路径</h3>
             </div>
             <ul className="space-y-4">
                 {report.learningPath.map((step, idx) => (
                     <li key={idx} className="flex gap-4">
                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm">
                             {idx + 1}
                         </div>
                         <p className="text-indigo-800 pt-1">{step}</p>
                     </li>
                 ))}
             </ul>
         </div>

         <div className="bg-slate-800 rounded-2xl p-8 text-slate-300 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-20 blur-3xl rounded-full"></div>
             <h3 className="text-xl font-bold text-white mb-4 z-10">长期愿景</h3>
             <p className="text-lg leading-relaxed italic opacity-90 z-10">
                 "{report.longTermOutlook}"
             </p>
         </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap justify-center gap-4 pt-8 pb-8">
        <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
        >
            <RefreshCw className="w-4 h-4" />
            重新测试
        </button>
        
        <button 
            onClick={handleShare}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border font-medium transition-all duration-200 ${
                isCopied 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50'
            }`}
        >
            {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {isCopied ? '已复制分享文案' : '分享结果'}
        </button>

        <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg"
        >
            <Download className="w-4 h-4" />
            保存报告
        </button>
      </div>
    </div>
  );
};

// Helper for icon
const ActivityIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

export default ResultView;