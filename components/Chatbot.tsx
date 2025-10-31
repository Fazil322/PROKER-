import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chat) {
      try {
        if (!process.env.API_KEY) {
            console.warn("Gemini API key not found. Chatbot will be disabled.");
            return;
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: "You are 'Tanya OSIS AI', a friendly and helpful AI assistant for the Student Council (OSIS) of SMK LPPMRI 2 Kedungreja. Your goal is to answer student questions about school life, OSIS activities, event schedules, and general school information. Be concise, friendly, and always answer in Bahasa Indonesia. If a question is inappropriate or completely unrelated to school, politely decline to answer.",
          },
        });
        setChat(newChat);
        setMessages([{ role: 'model', text: 'Halo! Saya Tanya OSIS AI. Ada yang bisa saya bantu seputar kegiatan OSIS atau sekolah?' }]);
      } catch (error) {
        console.error("Failed to initialize Gemini Chat:", error);
        setMessages([{ role: 'model', text: 'Maaf, saya sedang tidak dapat terhubung saat ini.' }]);
      }
    }
  }, [isOpen, chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessageStream({ message: input });
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '...' }]); // Placeholder

      for await (const chunk of result) {
        modelResponse += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse + '...' };
            return newMessages;
        });
      }
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
        return newMessages;
      });

    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan. Coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="chatbot-fab bg-brand-blue-700 text-white rounded-full p-4 shadow-lg hover:bg-brand-blue-800 transition-transform transform hover:scale-110"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          )}
        </button>
      </div>
      
      {isOpen && (
        <div className={`chatbot-window fixed bottom-20 right-5 w-full max-w-sm h-full max-h-[60vh] bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 flex flex-col z-50 ${isOpen ? 'animate-slide-in-up' : ''}`}>
          <header className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Tanya OSIS AI</h3>
          </header>
          
          <div className="flex-1 p-4 overflow-y-auto chatbot-messages">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`prose dark:prose-invert prose-sm max-w-xs rounded-lg px-3 py-2 ${msg.role === 'user' ? 'bg-brand-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2">
                       <span className="animate-pulse">...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <footer className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ketik pertanyaanmu..."
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500"
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading} className="bg-brand-blue-600 text-white p-2 rounded-md hover:bg-brand-blue-700 disabled:bg-brand-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Chatbot;
