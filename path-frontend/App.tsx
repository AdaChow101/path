import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { AppState, UserAnswers, CareerReport } from './types';
import QuestionCard from './components/QuestionCard';
import ResultView from './components/ResultView';
import { generateCareerAnalysis } from './services/gemini';
import { Sparkles, BrainCircuit, ArrowRight, Activity, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [report, setReport] = useState<CareerReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleStart = () => {
    setAppState(AppState.TESTING);
  };

  const handleAnswerChange = (value: string | string[] | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = async () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Pre-fill answer if user goes back? (Not implementing back button for simplicity, but good for future)
    } else {
      // Finished
      setAppState(AppState.ANALYZING);
      try {
        const result = await generateCareerAnalysis(answers);
        setReport(result);
        setAppState(AppState.RESULTS);
      } catch (err: any) {
        console.error(err);
        setErrorMsg("分析过程中出现了问题。请检查您的网络连接或 API Key 配置。");
        setAppState(AppState.ERROR);
      }
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setReport(null);
    setErrorMsg(null);
    setAppState(AppState.INTRO);
  };

  // --- Render Helpers ---

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in py-12">
      <div className="mb-10 relative group cursor-default">
         <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full animate-pulse group-hover:opacity-30 transition-opacity duration-500"></div>
         <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 transform transition-transform duration-500 hover:scale-105">
           <BrainCircuit className="w-20 h-20 text-indigo-600" />
         </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
        PathFinder <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
        不仅仅是测试，这是一次深度对话。结合心理学模型与 Gemini 人工智能，为您量身定制职业发展蓝图。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl w-full px-4">
         {[
           { icon: Sparkles, text: "AI 深度分析", desc: "基于大语言模型的核心洞察" },
           { icon: Activity, text: "多维度评估", desc: "20+ 关键维度全方位扫描" },
           { icon: BrainCircuit, text: "个性化建议", desc: "拒绝模板，生成专属方案" }
         ].map((item, idx) => (
           <div key={idx} className="flex flex-col items-center gap-3 p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition-shadow">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{item.text}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
           </div>
         ))}
      </div>

      <button
        onClick={handleStart}
        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full font-bold text-xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300"
      >
        开始探索
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const renderTesting = () => (
    <div className="max-w-3xl mx-auto w-full px-4 pt-12 pb-24">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-sm font-semibold text-slate-500 mb-3">
           <span>问题 {currentQuestionIndex + 1} <span className="text-slate-300 mx-1">/</span> {QUESTIONS.length}</span>
           <span className="text-indigo-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-slate-200/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <QuestionCard 
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswerChange}
        onNext={handleNext}
        isLast={currentQuestionIndex === QUESTIONS.length - 1}
      />
    </div>
  );

  const renderAnalyzing = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-10">
        <div className="w-24 h-24 border-4 border-indigo-100 rounded-full animate-spin border-t-indigo-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-10 rounded-full animate-pulse"></div>
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-4">AI 正在为您规划</h2>
      <p className="text-slate-500 max-w-md text-lg leading-relaxed">
        正在分析您的性格特质、技能优势与职业倾向...<br/>
        <span className="text-sm opacity-75 mt-2 block">生成专属报告通常需要 5-10 秒</span>
      </p>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
       <div className="bg-red-50 p-6 rounded-full mb-6 ring-8 ring-red-50/50">
         <AlertTriangle className="w-12 h-12 text-red-500" />
       </div>
       <h2 className="text-2xl font-bold text-slate-800 mb-2">出错了</h2>
       <p className="text-slate-600 mb-8 max-w-md">{errorMsg}</p>
       <button 
         onClick={handleReset}
         className="px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors shadow-lg"
       >
         返回首页
       </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* Glassmorphism Header */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-800 cursor-pointer group" onClick={() => appState !== AppState.ANALYZING && handleReset()}>
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg transition-transform group-hover:rotate-12">
               <BrainCircuit className="w-5 h-5" />
            </div>
            <span>PathFinder AI</span>
          </div>
          {appState === AppState.RESULTS && (
            <button onClick={handleReset} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100/50">
                重新测试
            </button>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {appState === AppState.INTRO && renderIntro()}
        {appState === AppState.TESTING && renderTesting()}
        {appState === AppState.ANALYZING && renderAnalyzing()}
        {appState === AppState.RESULTS && report && <ResultView report={report} onReset={handleReset} />}
        {appState === AppState.ERROR && renderError()}
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} PathFinder AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;