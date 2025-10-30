

import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { useData } from '../context/DataContext.tsx';

interface Idea {
    name: string;
    description: string;
    activities: string[];
}

const IdeaCard: React.FC<{ idea: Idea }> = ({ idea }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-brand-yellow-400">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{idea.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{idea.description}</p>
        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Contoh Kegiatan:</h4>
        <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 space-y-1">
            {idea.activities.map((activity, index) => <li key={index}>{activity}</li>)}
        </ul>
    </div>
);

const ProgramIdeaGenerator: React.FC = () => {
    const { siteContent } = useData();
    const [topic, setTopic] = useState('');
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateIdeas = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError("Mohon masukkan topik ide.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setIdeas([]);

        try {
            if (!process.env.API_KEY) {
                throw new Error("API key is not configured.");
            }
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    ideas: {
                        type: Type.ARRAY,
                        description: "List of event ideas.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Catchy name for the event." },
                                description: { type: Type.STRING, description: "A brief 2-3 sentence description." },
                                activities: {
                                    type: Type.ARRAY,
                                    description: "A list of 3-5 key activities.",
                                    items: { type: Type.STRING }
                                }
                            },
                            required: ["name", "description", "activities"]
                        }
                    }
                },
                required: ["ideas"]
            };

            const prompt = `You are a creative consultant for high school events. Generate three unique and engaging event ideas based on the theme: "${topic}". The ideas should be feasible for a high school student council to organize. For each idea, provide a catchy name, a short description (2-3 sentences), and a list of 3-5 key activities.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                },
            });

            const jsonString = response.text;
            const parsed = JSON.parse(jsonString);

            if (parsed.ideas && Array.isArray(parsed.ideas)) {
                setIdeas(parsed.ideas);
            } else {
                throw new Error("Format respons AI tidak valid.");
            }

        } catch (err) {
            console.error(err);
            setError("Maaf, terjadi kesalahan saat menghasilkan ide. Coba lagi nanti.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="idea-generator" className="bg-brand-blue-50 dark:bg-brand-blue-900/20 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{siteContent.ideaGeneratorTitle}</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        {siteContent.ideaGeneratorDescription}
                    </p>
                </div>
                
                <form onSubmit={generateIdeas} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 mb-12">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Lingkungan, Teknologi, Amal"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-brand-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-blue-800 transition-colors disabled:bg-brand-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                           <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Hasilkan Ide'}
                    </button>
                </form>

                {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md max-w-xl mx-auto">{error}</p>}
                
                <div className="max-w-4xl mx-auto mt-8 space-y-6">
                    {ideas.map((idea, index) => (
                        <IdeaCard key={index} idea={idea} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramIdeaGenerator;