import { FileText, Download, ExternalLink, ShieldAlert, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/useLanguage";
import { ContentRepository } from "../lib/contentRepository";
import { useEffect, useState } from "react";
import { trackDownload } from "../hooks/useMetrics";

export function DocumentsPage() {
    // All hooks MUST be called before any early returns
    const languageContext = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Documents have dynamic structure from Firestore
    const [documents, setDocuments] = useState<any[]>([]);

    // Get values with safe optional chaining
    const lang = languageContext?.lang || 'kr';

    // useEffect before early return
    useEffect(() => {
        ContentRepository.getDocuments(lang).then(d => setDocuments(d));
    }, [lang]);

    // Early return AFTER all hooks
    if (!languageContext) return null;
    const { content } = languageContext;
    const { documentsPage } = content;

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="min-h-screen bg-white font-sans text-slate-800">
                {/* HERO / HEADER SECTION */}
                <section className="bg-white py-12 lg:py-16 border-b border-slate-100 relative">
                    <div className="max-w-5xl mx-auto px-4 lg:px-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{documentsPage.title}</h1>
                        <p className="text-xl text-blue-700 font-bold mb-4">{documentsPage.subtitle}</p>
                        <p className="text-slate-600 max-w-2xl leading-relaxed">
                            {documentsPage.intro}
                        </p>
                    </div>

                    {/* Scroll Indication Arrow */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce text-slate-300">
                        <ChevronDown size={24} />
                    </div>
                </section>

                {/* DOCUMENTS GRID */}
                <section className="bg-slate-50 py-12 lg:py-16 min-h-[60vh]">
                    <div className="max-w-5xl mx-auto px-4 lg:px-8">

                        {documents.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">Loading documents...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {documents.map((doc) => (
                                    <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col h-full group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`
                                            p-3 rounded-lg 
                                            ${(doc.kind || "").includes('원문') || (doc.kind || "").includes('Original') ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}
                                        `}>
                                                <FileText size={24} />
                                            </div>
                                            <span className={`
                                            text-xs font-bold px-2 py-1 rounded 
                                            ${(doc.kind || "").includes('원문') || (doc.kind || "").includes('Original') ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}
                                        `}>
                                                {doc.kind}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                                            {doc.titleKr || doc.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-6 grow leading-relaxed">
                                            {doc.descriptionKr || doc.description}
                                        </p>

                                        {doc.note && (
                                            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded mb-4">
                                                <ShieldAlert size={14} /> {doc.note}
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-4 border-t border-slate-100 mt-auto">
                                            <a
                                                href={doc.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                                            >
                                                <ExternalLink size={16} /> {documentsPage.actions.open}
                                            </a>
                                            <a
                                                href={doc.fileUrl}
                                                download={doc.fileName}
                                                onClick={() => trackDownload()}
                                                className="flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                                title={documentsPage.actions.download}
                                            >
                                                <Download size={18} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* PRIVACY NOTE */}
                        <div className="mt-12 p-6 bg-slate-100 rounded-lg text-center">
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">{documentsPage.privacyTitle}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {documentsPage.privacyText}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
