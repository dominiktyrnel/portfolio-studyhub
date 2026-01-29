import { Heart, Coffee, Shield, Zap, BookOpen, ArrowRight, Github, type LucideIcon } from 'lucide-react';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { useStudyLanguage } from '../../study/i18n/useStudyLanguage';
import { Link } from 'react-router-dom';

interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    desc: string;
}

export function StudyAboutPage() {
    const t = useStudyTranslations();
    const { studyLang } = useStudyLanguage();

    const openSourceText = studyLang === 'kr' ? {
        title: '기술 · 오픈소스',
        desc: '이 스터디 허브는 커뮤니티를 위해 만든 작은 웹 공간입니다.\n라이브 상태/집중 모드/기록만 \'조용히\' 보여주고,\n영상·채팅은 외부 서비스로 진행합니다.\n\n개발 구조가 궁금한 분들을 위해 소스코드를 공개해두었습니다.\n(개인정보나 비밀키는 포함되지 않습니다.)',
        button: '소스코드 보기',
        subtext: 'GitHub에서 열기'
    } : {
        title: 'Tech · Open Source',
        desc: 'This Study Hub is a small, quiet web space for the community.\nIt shows only live status / focus mode / records.\nVideo and chat are handled via external services.\n\nFor those curious about how it\'s built, the source code is available.\n(No personal data or secret keys are included.)',
        button: 'View Source Code',
        subtext: 'Open on GitHub'
    };

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-[var(--study-text)] mb-4 font-heading">
                        {t.about.title}
                    </h1>
                    <p className="text-lg text-[var(--study-text-muted)] max-w-2xl mx-auto leading-relaxed mb-4">
                        {t.about.subtitle}
                    </p>
                    <p className="text-xl font-bold text-[var(--study-accent)]">
                        {t.about.tagline}
                    </p>
                </div>

                {/* Host Section */}
                <div className="bg-[var(--study-surface)] rounded-2xl p-8 md:p-10 shadow-xs border border-[var(--study-border)] mb-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--study-bg)] overflow-hidden shrink-0 border-4 border-[var(--study-surface)] shadow-lg">
                        {/* Placeholder for Host Image - using a generic avatar or keeping empty div */}
                        <div className="w-full h-full flex items-center justify-center bg-[var(--study-text)] text-4xl">
                            ☕
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-[var(--study-text)] mb-2">{t.about.hostedBy} {t.about.hostedByName}</h2>
                        <p className="text-[var(--study-text-muted)] mb-4">
                            {t.about.hostQuote}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="bg-[var(--study-bg)] text-[var(--study-text-muted)] px-3 py-1 rounded-full text-xs font-bold uppercase">{t.about.tag1}</span>
                            <span className="bg-[var(--study-bg)] text-[var(--study-text-muted)] px-3 py-1 rounded-full text-xs font-bold uppercase">{t.about.tag2}</span>
                            <span className="bg-[var(--study-bg)] text-[var(--study-text-muted)] px-3 py-1 rounded-full text-xs font-bold uppercase">{t.about.tag3}</span>
                        </div>
                        <Link
                            to="/study/introduction"
                            className="inline-flex items-center gap-2 mt-4 bg-[var(--study-accent)] text-[var(--study-bg)] font-bold px-5 py-2.5 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors text-sm"
                        >
                            {t.about.introButton || '소개'}
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Values Grid */}
                <h3 className="text-xl font-bold text-[var(--study-text)] mb-6 text-center md:text-left">{t.about.communityValues}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <ValueCard
                        icon={Zap}
                        title={t.about.deepWork}
                        desc={t.about.deepWorkDesc}
                    />
                    <ValueCard
                        icon={Shield}
                        title={t.about.respect}
                        desc={t.about.respectDesc}
                    />
                    <ValueCard
                        icon={Coffee}
                        title={t.about.consistency}
                        desc={t.about.consistencyDesc}
                    />
                    <ValueCard
                        icon={Heart}
                        title={t.about.growthMindset}
                        desc={t.about.growthMindsetDesc}
                    />
                </div>

                {/* FAQ / Rules */}
                <div className="bg-[var(--study-bg)] rounded-2xl p-8 md:p-10 border border-[var(--study-border)] mb-8">
                    <h3 className="text-xl font-bold text-[var(--study-text)] mb-6 flex items-center gap-2">
                        <BookOpen size={20} className="text-[var(--study-accent)]" />
                        {t.about.houseRules}
                    </h3>
                    <ul className="space-y-4 text-[var(--study-text)]">
                        <li className="flex gap-3">
                            <span className="font-bold text-[var(--study-accent)]">01.</span>
                            <span>{t.about.rule1}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-[var(--study-accent)]">02.</span>
                            <span>{t.about.rule2}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-[var(--study-accent)]">03.</span>
                            <span>{t.about.rule3}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-[var(--study-accent)]">04.</span>
                            <span>{t.about.rule4}</span>
                        </li>
                    </ul>
                </div>

                {/* Open Source Card */}
                <div className="bg-[var(--study-bg)] rounded-2xl p-8 md:p-10 border border-[var(--study-border)]">
                    <h3 className="text-xl font-bold text-[var(--study-text)] mb-6 flex items-center gap-2">
                        <Github size={20} className="text-[var(--study-accent)]" />
                        {openSourceText.title}
                    </h3>
                    <p className="text-[var(--study-text-muted)] text-sm leading-relaxed whitespace-pre-line mb-6">
                        {openSourceText.desc}
                    </p>
                    <div className="flex flex-col items-start gap-1">
                        <a
                            href="https://github.com/dominiktyrnel/portfolio-studyhub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[var(--study-surface)] border border-[var(--study-border)] text-[var(--study-text)] font-medium px-5 py-2.5 rounded-lg hover:bg-[var(--study-border)] transition-colors text-sm"
                        >
                            <Github size={16} />
                            {openSourceText.button}
                        </a>
                        <span className="text-xs text-[var(--study-text-muted)] ml-1">
                            {openSourceText.subtext}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ValueCard({ icon: Icon, title, desc }: ValueCardProps) {
    return (
        <div className="bg-[var(--study-surface)] p-6 rounded-xl shadow-xs border border-[var(--study-border)] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-[var(--study-accent)]/10 text-[var(--study-accent)] flex items-center justify-center mb-4">
                <Icon size={20} />
            </div>
            <h4 className="font-bold text-[var(--study-text)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--study-text-muted)] leading-relaxed">{desc}</p>
        </div>
    );
}
