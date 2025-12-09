import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the client on the server side using the environment variable
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function POST(req: Request) {
  if (!ai) {
    return NextResponse.json(
      { error: "API Key not configured on server" },
      { status: 500 }
    );
  }

  try {
    const { action, payload } = await req.json();

    if (action === 'remix') {
      const { topic, style } = payload;
      const prompt = `
        你是一个教育内容重构专家。请将主题 "${topic}" 重构为 "${style}" 风格的内容。
        
        如果是 'story': 用生动的故事讲述这个概念，适合中小学生。
        如果是 'academic': 提供严谨的定义、历史背景和关键点。
        如果是 'quiz': 生成3个相关的单项选择题，包含答案解析。
        
        请直接返回Markdown格式的内容，不要有多余的寒暄。
      `;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return NextResponse.json({ result: response.text });
    }

    if (action === 'socratic') {
      const { history, message } = payload;
      const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "你是一位苏格拉底式的科学老师。你的目标不是直接给出答案，而是通过提问引导学生思考。当学生问一个科学问题时，不要直接解释原理，而是问一个相关的现象或引导性问题，让他们自己去发现规律。保持对话简短有力。",
        },
        history: history.map((h: any) => ({ role: h.role, parts: [{ text: h.text }] }))
      });

      const result = await chat.sendMessage({ message });
      return NextResponse.json({ result: result.text });
    }

    if (action === 'growth') {
      const { input, context } = payload;
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

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return NextResponse.json({ result: response.text });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}