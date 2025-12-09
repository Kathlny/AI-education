import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Layout, 
  BrainCircuit, 
  ShieldCheck, 
  MousePointer2, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { ContentRemixDemo, SocraticTutorDemo, GrowthMindsetDemo } from './components/Simulations';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
    }
  }, []);

  const principles = [
    {
      id: 1,
      title: "目标明确，场景驱动",
      desc: "好的工具应当贯通“预设-生成”连续体，服务教学本质。",
      example: "Google Learn Your Way",
      url: "https://edu.google.com/intl/ALL_us/why-google/ai-for-education/",
      demoCmp: <ContentRemixDemo />
    },
    {
      id: 2,
      title: "任务拆解与协同",
      desc: "微工具的组合智慧，通过AI串联实现“备-授-练-评”全链路提质增效。",
      example: "腾讯教育智能体平台",
      url: "https://edu.tencent.com/",
      // No live demo for this complex one, visual placeholder
      demoCmp: (
        <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 h-64">
           <BrainCircuit className="w-12 h-12 mb-2" />
           <p className="text-sm text-center">多智能体协同系统<br/>(需完整后端环境，此处仅作概念展示)</p>
        </div>
      )
    },
    {
      id: 3,
      title: "双轨引导",
      desc: "激活思考与输出。AI不替代思考，而是搭建梯子，帮助素养深度内化。",
      example: "Google Learn About",
      url: "https://learning.google.com/experiments/learn-about",
      demoCmp: <SocraticTutorDemo />
    },
    {
      id: 4,
      title: "低门槛、宽路径、高上限",
      desc: "包容性设计。让老师学生都能用得顺手，兼顾普惠与卓越。",
      example: "Brisk Teaching",
      url: "https://www.briskteaching.com/",
      demoCmp: (
         <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
               <MousePointer2 className="w-4 h-4 text-purple-600"/> 浏览器插件模式
            </h4>
            <div className="bg-slate-100 p-3 rounded text-sm text-slate-600 mb-3">
               Brisk Teaching 直接嵌入在 Google Docs 中，一键检测学生作业或生成反馈，无需切换平台。
            </div>
            <img src="https://picsum.photos/400/200?grayscale" alt="Interface Placeholder" className="rounded w-full object-cover opacity-70" />
         </div>
      )
    },
    {
      id: 5,
      title: "安全性与隐私保护",
      desc: "师生权益首位。搭建数据防护网，避免过度依赖，关注身心健康。",
      example: "Edexia",
      url: "#",
      demoCmp: (
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
           <ShieldCheck className="w-10 h-10 text-green-600 mb-3" />
           <h4 className="font-bold text-green-800">隐私承诺</h4>
           <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
             <li>姓名、学号全流程脱敏</li>
             <li>本地加密存储</li>
             <li>绝不用于第三方模型训练</li>
           </ul>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-lg font-serif">AI+教育</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#intro" className="hover:text-blue-600 transition">引言</a>
              <a href="#principles" className="hover:text-blue-600 transition">五项原则</a>
              <a href="#potential" className="hover:text-blue-600 transition">打破藩篱</a>
            </div>
            {apiKeyMissing && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-200">
                Demo API Key 缺失
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="intro" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-serif leading-tight">
            工具之问：<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              怎样才算好的“AI+教育”工具？
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10 font-light">
            当AI加速涌入教育领域，我们是迎来了“学习革命”，还是陷入了“技术炫技”？
            真正的突破，在于界定技术边界，回归教育本质。
          </p>
          
          <div className="relative p-8 bg-white rounded-2xl shadow-xl border border-slate-100 italic font-serif text-lg text-slate-700">
            <span className="absolute top-4 left-4 text-6xl text-blue-100 leading-none select-none">“</span>
            真正被技术所主导的，其实是你们沿袭已久的课程体系和学校理念……数字技术带来的真正机遇，是让我们从这些陈旧工具造成的束缚中解放出来。
            <span className="absolute bottom-[-20px] right-4 text-6xl text-blue-100 leading-none select-none rotate-180">“</span>
            <div className="mt-4 text-right text-sm font-sans font-bold text-slate-400 not-italic">
              —— Seymour Papert, MIT教授
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section id="principles" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">一、通用设计策略：五项原则</h2>
            <p className="text-slate-600 max-w-2xl">
              好的教育工具不在于功能堆砌，而在于是否符合这五项核心策略。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: The Principles List */}
            <div className="space-y-6">
              {principles.map((p) => (
                <div 
                  key={p.id}
                  className={`group p-6 rounded-xl transition-all cursor-pointer border ${
                    activeSection === `p-${p.id}` 
                      ? 'bg-white border-blue-500 shadow-md transform scale-[1.02]' 
                      : 'bg-white border-transparent hover:border-slate-300 hover:shadow-sm'
                  }`}
                  onClick={() => setActiveSection(`p-${p.id}`)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold ${
                       activeSection === `p-${p.id}` ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {p.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                        {p.desc}
                      </p>
                      
                      {activeSection === `p-${p.id}` && (
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between animate-fadeIn">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            典型案例
                          </span>
                          <a 
                            href={p.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
                          >
                            {p.example} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Interactive Demo Area */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-slate-200 rounded-2xl p-1 shadow-inner">
                {principles.map((p) => (
                  <div key={p.id} className={activeSection === `p-${p.id}` ? 'block animate-fadeIn' : 'hidden'}>
                     {p.demoCmp}
                  </div>
                ))}
                {!activeSection.startsWith('p-') && (
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    <p>点击左侧原则查看交互演示</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Potential Section */}
      <section id="potential" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-16 text-center max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">二、利用AI潜能：打破应试藩篱</h2>
             <blockquote className="text-lg text-slate-600 italic border-l-4 border-accent pl-4 text-left bg-amber-50 p-4 rounded-r-lg">
                “大多数应用专注于效率……但我们需要找到将效率与创新结合的方法，以培养学生适应未来。” 
                <footer className="text-sm font-bold text-slate-500 mt-2 not-italic">— Daniel Schwartz, 斯坦福教育学院院长</footer>
             </blockquote>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                 <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">支持主动探索</h3>
                 <p className="text-slate-600 mb-4">
                    从“直接给答案”转向“陪伴式探究”。例如 <strong>秘塔AI</strong> 的“今天学点啥”，根据用户水平生成探究课程。
                 </p>
                 <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm">
                    <div className="flex justify-between items-center mb-2">
                       <span className="font-bold text-slate-700">演示：概念重构</span>
                    </div>
                    <ContentRemixDemo />
                 </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                 <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <BrainCircuit className="w-6 h-6 text-indigo-600" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">启发式交互</h3>
                 <p className="text-slate-600 mb-4">
                    AI扮演“苏格拉底式对话者”。例如 <strong>深圳龙岗科学智能体</strong>，通过追问引导思考。
                 </p>
                 <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm">
                    <SocraticTutorDemo />
                 </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                 <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <Layout className="w-6 h-6 text-purple-600" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">跨学科融合</h3>
                 <p className="text-slate-600 mb-4">
                    打通学科边界，支持项目式学习。例如 <strong>腾讯青少年AIGC创作工坊</strong>，整合图文音画创作。
                 </p>
                 <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                    <div className="text-center">
                       <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                       多模态创作环境演示
                    </div>
                 </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                 <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">成长型思维</h3>
                 <p className="text-slate-600 mb-4">
                    记录成长曲线，给出可操作反馈。例如 <strong>Duolingo Max</strong> 的Roleplay和Explain功能。
                 </p>
                 <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm">
                    <GrowthMindsetDemo />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl font-serif text-slate-200 italic mb-8">
            “如果仍然以旧有的标准和思维去使用新技术，只会陷入面向过去的竞争，而非面向未来的创新。”
          </p>
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-12">
             —— 杨健，腾讯研究院总顾问
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>基于《人机共育・向善而为》报告第五章改编</p>
            <p className="mt-2 md:mt-0">Powered by Google Gemini API & React</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;