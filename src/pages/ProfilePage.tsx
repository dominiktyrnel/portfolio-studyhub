import {
    User, Briefcase, CheckCircle2, Wrench,
    MessageCircle, Mail, Phone, Calendar, MapPin,
    Hash, X
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { useGlobalContent } from "../hooks/useGlobalContent";

export function ProfilePage() {
    // All hooks MUST be called before any early returns
    const languageContext = useLanguage();
    const { data: global } = useGlobalContent();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Early return AFTER all hooks
    if (!languageContext) return null;
    const { content } = languageContext;
    const { profilePageV4 } = content;
    const { header, sections } = profilePageV4;

    const contact = {
        email: global?.contact?.email || sections.contact.email,
        phoneCz: global?.contact?.phoneCz || sections.contact.phoneCz,
        phoneKr: (global?.contact?.phoneKr && global.contact.phoneKr !== 'none') ? global.contact.phoneKr : sections.contact.phoneKr,
        kakaoId: global?.contact?.kakaoId || sections.contact.kakaoId,
        kakaoLink: global?.contact?.kakaoLink || sections.contact.kakaoLink
    };

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="min-h-screen bg-white font-sans text-slate-800 pb-0">
                {/* LIGHTBOX */}
                {isLightboxOpen && (
                    <div
                        id="lightbox"
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm print:hidden"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button className="absolute top-6 right-6 text-white text-white/80 hover:text-white/100 p-2">
                            <X size={32} />
                        </button>
                        <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center @starting-style:scale-95 @starting-style:opacity-0 scale-100 opacity-100 transition-all duration-300" onClick={e => e.stopPropagation()}>
                            <img
                                src="/img/profile/profile_full.webp"
                                alt="Profile"
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm border-4 border-white"
                            />
                        </div>
                    </div>
                )}

                {/* MAIN CONTENT - FULL WIDTH STACK */}
                <main className="w-full">

                    {/* 1. HERO / HEADER INFO - WHITE */}
                    <section className="bg-white py-12 lg:py-16 border-b border-slate-100 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{header.name}</h1>
                                    <p className="text-xl text-blue-700 font-bold mb-4">{header.role}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {header.tags.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-full border border-slate-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden md:block shrink-0">
                                    <div
                                        className="w-32 h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:opacity-90 transition-opacity shadow-xs"
                                        onClick={() => setIsLightboxOpen(true)}
                                    >
                                        <img src="/img/profile/profile.webp" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. SUMMARY - SLATE 50 */}
                    <section id="summary" className="bg-slate-50 print:bg-white py-12 lg:py-16 border-b border-slate-200 scroll-mt-14 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
                                <User className="text-blue-600" size={28} /> {sections.summary.title}
                            </h2>
                            <ul className="space-y-4">
                                {sections.summary.items.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 pl-1">
                                        <span className="block w-2 h-2 mt-2.5 rounded-full bg-blue-500 shrink-0" />
                                        <span className="text-slate-700 leading-relaxed font-medium text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* 3. EXPERIENCE - WHITE */}
                    <section id="experience" className="bg-white py-12 lg:py-16 border-b border-slate-100 scroll-mt-14 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
                                <Briefcase className="text-blue-600" size={28} /> {sections.experience.title}
                            </h2>
                            <div className="ml-2 pl-6 border-l-4 border-blue-100 space-y-2">
                                <h3 className="text-xl font-bold text-slate-900">{sections.experience.role}</h3>
                                <div className="text-lg font-bold text-blue-700">{sections.experience.company}</div>
                                <div className="text-sm text-slate-400 font-mono mb-6">{sections.experience.period}</div>
                                <div className="space-y-3 mt-6">
                                    {sections.experience.desc.map((d: string, i: number) => (
                                        <p key={i} className="text-slate-700 leading-relaxed text-base">
                                            • {d}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. SCOPE - SLATE 50 */}
                    <section id="scope" className="bg-slate-50 print:bg-white py-12 lg:py-16 border-b border-slate-200 scroll-mt-14 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
                                <Hash className="text-blue-600" size={28} /> {sections.scope.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-xs">
                                    <h3 className="font-bold text-blue-900 mb-2 text-lg">{sections.scope.direct.title}</h3>
                                    <p className="text-sm text-blue-600 mb-6">{sections.scope.direct.desc}</p>
                                    <ul className="space-y-3">
                                        {sections.scope.direct.items.map((item: string, i: number) => (
                                            <li key={i} className="text-slate-700 flex items-center gap-3 font-medium">
                                                <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-100/50 print:bg-white p-6 rounded-xl border border-slate-200 dashed-border">
                                    <h3 className="font-bold text-slate-700 mb-2 text-lg">{sections.scope.partner.title}</h3>
                                    <p className="text-sm text-slate-500 mb-6">{sections.scope.partner.desc}</p>
                                    <ul className="space-y-3">
                                        {sections.scope.partner.items.map((item: string, i: number) => (
                                            <li key={i} className="text-slate-600 flex items-center gap-3">
                                                <span className="w-4 h-[1px] bg-slate-400 shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. SKILLS - WHITE */}
                    <section id="skills" className="bg-white py-12 lg:py-16 border-b border-slate-100 scroll-mt-14 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
                                <CheckCircle2 className="text-blue-600" size={28} /> {sections.skills.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {sections.skills.groups.map((group: { title: string; items: string[] }, i: number) => (
                                    <div key={i} className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                                        <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide border-b border-slate-200 pb-2 text-center">
                                            {group.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {group.items.map((item: string, j: number) => (
                                                <li key={j} className="text-sm text-slate-700 leading-snug font-medium text-center">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 6. TOOLS - SLATE 50 */}
                    <section id="tools" className="bg-slate-50 print:bg-white py-12 lg:py-16 border-b border-slate-200 scroll-mt-14 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-4">
                                <Wrench className="text-blue-600" size={28} /> {sections.tools.title}
                            </h2>
                            <p className="text-slate-600 mb-8 max-w-2xl">{sections.tools.desc}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {sections.tools.items.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-xs hover:border-blue-300 transition-colors">
                                        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                                        <span className="font-medium text-slate-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 7. WORK STYLE - WHITE */}
                    <section id="workstyle" className="bg-white py-12 lg:py-16 border-b border-slate-100 scroll-mt-14">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-8">
                                <User className="text-blue-600" size={28} /> {sections.workstyle.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {sections.workstyle.items.map((item: { title: string; desc: string }, i: number) => (
                                    <div key={i} className="p-5 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className="font-bold text-blue-800 mb-2">{item.title}</div>
                                        <div className="text-slate-600 text-sm leading-relaxed">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 8. REFERENCE - SLATE 50 with Gradient */}
                    <section id="reference" className="bg-slate-50 print:bg-white py-12 lg:py-16 border-b border-slate-200 scroll-mt-14">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-white to-blue-50">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50/50 rounded-bl-full -mr-32 -mt-32 opacity-60 pointer-events-none" />

                                <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-8 relative z-10">
                                    <MessageCircle className="text-blue-600" size={28} /> {sections.reference.title}
                                </h2>

                                <div className="relative z-10">
                                    <blockquote className="space-y-4 mb-8">
                                        {sections.reference.summary.map((line: string, i: number) => (
                                            <p key={i} className="text-slate-700 italic font-medium text-lg leading-relaxed">"{line}"</p>
                                        ))}
                                    </blockquote>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">TC</div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-lg">{sections.reference.source}</div>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-sm text-slate-400">{sections.reference.note}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 9. KOREA & CONDITIONS - WHITE */}
                    <section className="bg-white py-12 lg:py-16 border-b border-slate-100 scroll-mt-14">
                        <div className="max-w-5xl mx-auto px-4 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div id="korea" className="scroll-mt-14">
                                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-6 text-blue-800">
                                        <MapPin size={24} /> {sections.korea.title}
                                    </h2>
                                    <div className="space-y-4">
                                        {sections.korea.content.map((line: string, i: number) => (
                                            <p key={i} className="text-slate-600 leading-relaxed text-justify">{line}</p>
                                        ))}
                                    </div>
                                </div>

                                <div id="conditions" className="scroll-mt-14">
                                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-6 text-blue-800">
                                        <Calendar size={24} /> {sections.conditions.title}
                                    </h2>
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                        <div className="space-y-0 divide-y divide-slate-200">
                                            {sections.conditions.items.map((item: { label: string; value: string }, i: number) => (
                                                <div key={i} className="flex justify-between py-3">
                                                    <span className="text-slate-500 font-medium">{item.label}</span>
                                                    <span className="font-bold text-slate-900 text-right">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 10. CONTACT - SLATE 900 (Dark Footer Style) */}
                    <section id="contact" className="bg-slate-900 print:bg-white print:text-black py-16 text-white text-center">
                        <div className="max-w-4xl mx-auto px-6">
                            <h2 className="text-3xl font-bold mb-10">{sections.contact.title}</h2>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
                                <a
                                    href={`mailto:${contact.email} `}
                                    className="flex items-center gap-3 px-8 py-5 bg-white/10 print:bg-transparent print:border print:border-slate-300 print:text-black rounded-xl hover:bg-white/20 transition-all w-full md:w-auto justify-center group border border-white/10"
                                >
                                    <Mail className="text-blue-400 group-hover:text-blue-200 print:text-black" size={24} />
                                    <span className="font-bold text-lg">{contact.email}</span>
                                </a>
                                <a
                                    href={contact.kakaoLink}
                                    className="flex items-center gap-3 px-8 py-5 bg-[#FEE500] print:bg-transparent print:border print:border-slate-300 text-slate-900 rounded-xl hover:bg-[#FFD900] transition-all w-full md:w-auto justify-center shadow-lg shadow-yellow-500/20 print:shadow-none"
                                    target="_blank"
                                >
                                    <MessageCircle className="text-slate-900" size={24} />
                                    <span className="font-bold text-lg">KakaoTalk: {contact.kakaoId}</span>
                                </a>
                            </div>
                            <div className="flex flex-col gap-4 text-slate-400">
                                <div className="flex items-center justify-center gap-2">
                                    <Phone size={18} /> CZ: {contact.phoneCz}
                                </div>
                                {contact.phoneKr && (
                                    <div className="flex items-center justify-center gap-2 text-slate-500">
                                        <MapPin size={18} /> {contact.phoneKr}
                                    </div>
                                )}
                            </div>
                            <p className="mt-12 text-sm text-slate-600">{sections.contact.note}</p>
                        </div>
                    </section>

                </main>

            </div>
        </div>
    );
}
