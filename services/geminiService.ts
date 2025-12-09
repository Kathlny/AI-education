import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRemixedContent = async (topic: string, style: 'story' | 'academic' | 'quiz'): Promise<string> => {
  const ai = getClient();
  const prompt = `
    你是一个教育内容重构专家。请将主题 "${topic}" 重构为 "${style}" 风格的内容。
    
    如果是 'story': 用生动的故事讲述这个概念，适合中小学生。
    如果是 'academic': 提供严谨的定义、历史背景和关键点。
    如果是 'quiz': 生成3个相关的单项选择题，包含答案解析。
    
    请直接返回Markdown格式的内容，不要有多余的寒暄。
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "无法生成内容，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成出错，请检查 API Key 或网络连接。";
  }
};

export const getSocraticFeedback = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
  const ai = getClient();
  const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "你是一位苏格拉底式的科学老师。你的目标不是直接给出答案，而是通过提问引导学生思考。当学生问一个科学问题时，不要直接解释原理，而是问一个相关的现象或引导性问题，让他们自己去发现规律。保持对话简短有力。",
    },
    history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] }))
  });

  try {
    const result = await chat.sendMessage({ message });
    return result.text || "这也是个有趣的问题，你怎么看？";
  } catch (error) {
    console.error("Gemini Chat Error", error);
    return "老师正在思考中... (连接错误)";
  }
};

export const analyzeGrowthMindset = async (input: string, context: string): Promise<string> => {
  const ai = getClient();
  const prompt = `
    作为一位拥有"成长型思维"的辅导老师，请对学生的回答进行点评。
    上下文：${context}
    学生回答：${input}
    
    要求：
    1. 首先肯定具体的优点（哪怕很小）。
    2. 指出可以改进的地方，但用"还可以在...方面提升"的语气，而不是"你错了"。
    3. 给出具体的下一步建议。
    4. 保持简短（100字以内）。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "继续加油！";
  } catch (error) {
    return "分析服务暂时不可用。";
  }
};