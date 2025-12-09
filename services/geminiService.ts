// Replaced direct SDK calls with fetches to our Next.js API route
// This keeps the client-side lightweight and secure.

export const generateRemixedContent = async (topic: string, style: 'story' | 'academic' | 'quiz'): Promise<string> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'remix',
        payload: { topic, style }
      })
    });
    
    const data = await response.json();
    return data.result || "无法生成内容，请重试。";
  } catch (error) {
    console.error("API Error:", error);
    return "服务连接失败。";
  }
};

export const getSocraticFeedback = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'socratic',
        payload: { history, message }
      })
    });
    
    const data = await response.json();
    return data.result || "思考中...";
  } catch (error) {
    console.error("API Error:", error);
    return "老师正在思考中... (连接错误)";
  }
};

export const analyzeGrowthMindset = async (input: string, context: string): Promise<string> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'growth',
        payload: { input, context }
      })
    });

    const data = await response.json();
    return data.result || "继续加油！";
  } catch (error) {
    return "分析服务暂时不可用。";
  }
};