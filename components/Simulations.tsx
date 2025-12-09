import React, { useState, useRef, useEffect } from 'react';
import { generateRemixedContent, getSocraticFeedback, analyzeGrowthMindset } from '../services/geminiService';
import { Loader2, RefreshCw, Send, BookOpen, MessageCircle, TrendingUp } from 'lucide-react';

// --- Demo 1: Content Remix (Google Learn Your Way) ---
export const ContentRemixDemo: React.FC = () => {
  const [topic, setTopic] = useState('光合作用');
  const [style, setStyle] = useState<'story' | 'academic' | 'quiz'>('story');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateRemixedContent(topic, style);
    setContent(result);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <BookOpen className="w-5 h-5" />
        <h3 className="font-bold">模拟体验：个性化教材重构</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        输入一个知识点，AI将根据您的偏好重构教材内容。（原型参考：Google Learn Your Way）
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">学习主题</label>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="例如：万有引力、二战历史..."
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">重构模式</label>
          <div className="flex gap-2">
            {(['story', 'academic', 'quiz'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  style === s 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s === 'story' ? '📖 故事模式' : s === 'academic' ? '🎓 学术模式' : '❓ 测验模式'}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {loading ? 'AI 正在重构教材...' : '生成个性化内容'}
        </button>

        {content && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 prose prose-sm max-w-none max-h-60 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans text-slate-700">{content}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Demo 2: Socratic Tutor (Science Teacher) ---
export const SocraticTutorDemo: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: '你好！我是你的科学探究伙伴。你想了解什么现象？比如“为什么船能浮在水面上”？' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user' as const, text: input };
    const updatedHistory = [...messages, newMsg];
    setMessages(updatedHistory);
    setInput('');
    setLoading(true);

    const response = await getSocraticFeedback(messages, input);
    setMessages([...updatedHistory, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col h-[400px]">
      <div className="flex items-center gap-2 mb-2 text-indigo-600 shrink-0">
        <MessageCircle className="w-5 h-5" />
        <h3 className="font-bold">模拟体验：苏格拉底式引导</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4 shrink-0">
        这个AI老师不会直接给你答案，而是会反问你。（原型参考：深圳龙岗科学智能体）
      </p>
      
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 bg-slate-50 rounded-lg border-inner" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-slate-400 text-xs flex items-center gap-1">
               <Loader2 className="w-3 h-3 animate-spin" /> 思考中...
             </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          placeholder="问个问题，例如：苹果为什么会落地？"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- Demo 3: Growth Mindset Feedback (Duolingo Style) ---
export const GrowthMindsetDemo: React.FC = () => {
  const [scenario, setScenario] = useState('英语口语练习：自我介绍');
  const [studentInput, setStudentInput] = useState('My name is Li Hua. I like play basketball.');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeGrowthMindset(studentInput, scenario);
    setFeedback(result);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4 text-amber-600">
        <TrendingUp className="w-5 h-5" />
        <h3 className="font-bold">模拟体验：成长型思维反馈</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        AI不仅纠错，更关注“如何改进”和“肯定努力”。（原型参考：Duolingo Max / Edexia）
      </p>

      <div className="space-y-4">
        <div className="p-3 bg-amber-50 border border-amber-100 rounded text-sm text-amber-800">
          <strong>场景：</strong> {scenario}
        </div>
        
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">学生回答</label>
          <textarea 
            rows={3}
            value={studentInput}
            onChange={(e) => setStudentInput(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />
        </div>

        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '获取成长建议'}
        </button>

        {feedback && (
          <div className="mt-4 p-4 bg-white border-l-4 border-green-500 shadow-sm rounded-r-lg">
             <h4 className="font-bold text-green-700 text-sm mb-2">AI 教练反馈：</h4>
             <p className="text-slate-700 text-sm whitespace-pre-wrap">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};
