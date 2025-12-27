import { Heart, Coffee, Shield, Zap, BookOpen, ArrowRight, type LucideIcon } from 'lucide-react';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { Link } from 'react-router-dom';

interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    desc: string;
}

export function StudyAboutPage() {
    const t = useStudyTranslations();
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
                <div className="bg-[var(--study-bg)] rounded-2xl p-8 md:p-10 border border-[var(--study-border)]">
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
