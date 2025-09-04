
import React, { useState, useCallback } from 'react';
import { generateAvatarImage } from '../services/geminiService';
import Spinner from './Spinner';
import SparklesIcon from './icons/SparklesIcon';
import DownloadIcon from './icons/DownloadIcon';

const AvatarGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("Een gedetailleerd portret van een avatar met een nerdy uiterlijk. Denk aan een bril, een T-shirt met een grappige tech-referentie, en misschien wat gadgets. Digitale kunststijl.");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt || isLoading) return;

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const imageDataUrl = await generateAvatarImage(prompt);
            setGeneratedImage(imageDataUrl);
        } catch (err: any) {
            console.error(err);
            setError('Kon de avatar niet genereren. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, isLoading]);
    
    const handleDownload = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'nerdy-avatar.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/2 bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
                <form onSubmit={handleGenerate}>
                    <label htmlFor="prompt" className="block text-lg font-semibold text-slate-300 mb-2">
                        Beschrijf je avatar
                    </label>
                    <textarea
                        id="prompt"
                        rows={5}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="bijv. Een avatar met een cyberpunk-thema, neonbril en een hoodie..."
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {isLoading ? <Spinner /> : <SparklesIcon />}
                        <span className="ml-2">{isLoading ? 'Momentje...' : 'Genereer Avatar'}</span>
                    </button>
                </form>
            </div>
            <div className="w-full lg:w-1/2 h-96 lg:h-auto lg:self-stretch flex items-center justify-center bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
                {isLoading && (
                   <div className="flex flex-col items-center text-slate-400">
                       <Spinner size="lg" />
                       <p className="mt-4">Je avatar wordt gemaakt...</p>
                   </div>
                )}
                {error && <p className="text-red-400 text-center">{error}</p>}
                {!isLoading && !error && generatedImage && (
                    <div className="relative group">
                         <img src={generatedImage} alt="Generated Avatar" className="rounded-lg object-contain max-h-full max-w-full shadow-2xl"/>
                         <button 
                            onClick={handleDownload}
                            className="absolute bottom-4 right-4 bg-slate-900/70 text-white p-2 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-label="Download afbeelding"
                          >
                           <DownloadIcon />
                         </button>
                    </div>
                )}
                {!isLoading && !error && !generatedImage && (
                    <div className="text-center text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2">Je gegenereerde avatar verschijnt hier.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvatarGenerator;
