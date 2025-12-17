import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role, Product } from '../types';
import { SYSTEM_INSTRUCTION, PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

// Simple keyword matching to detect if we should ask for contact info
const detectLeadIntent = (text: string): boolean => {
  const keywords = [
    'hợp tác', 'giá sỉ', 'báo giá', 'đại lý', 
    'liên hệ', 'tư vấn thêm', 'catalog', 'số lượng lớn',
    'giá buôn', 'wholesale'
  ];
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword));
};

export const sendMessageToGemini = async (
  text: string
): Promise<{ text: string; relatedProducts: Product[]; requestEmailCollection: boolean }> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message: text });
    
    const responseText = result.text || "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể nói rõ hơn được không?";
    
    // Find related products
    const relatedProducts = PRODUCTS.filter(p => 
      responseText.toLowerCase().includes(p.name.toLowerCase()) || 
      text.toLowerCase().includes(p.name.toLowerCase())
    );

    // Check if the user is asking for business/pricing stuff
    const requestEmailCollection = detectLeadIntent(text);

    return {
      text: responseText,
      relatedProducts: relatedProducts.length > 0 ? relatedProducts : [],
      requestEmailCollection
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Hiện tại hệ thống đang bận. Quý khách vui lòng thử lại sau giây lát.",
      relatedProducts: [],
      requestEmailCollection: false
    };
  }
};