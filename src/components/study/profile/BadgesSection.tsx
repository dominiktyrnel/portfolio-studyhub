import { Star, MessageCircle, Clock, Trophy, Flame, Moon, Sun, Heart } from 'lucide-react';
import { useStudyLanguage } from '../../../study/i18n/StudyLanguageContext';
import { useStudyTranslations } from '../../../study/i18n/useStudyTranslations';
import { BADGE_DEFINITIONS, getBadgeName, getBadgeDescription, getBadgeById } from '../../../study/badges/badgeDefinitions';

interface BadgesSectionProps {
    earnedBadges: string[];  // Array of badge IDs
    showAll?: boolean;       // Show all badges (earned + locked)
}

// Map icon names to components
const ICON_MAP: Record<string, React.ElementType> = {
    Star,
    MessageCircle,
    Clock,
    Trophy,
    Flame,
    Moon,
    Sun,
    Heart
};

export function BadgesSection({ earnedBadges, showAll = false }: BadgesSectionProps) {
    const { studyLang } = useStudyLanguage();
    const t = useStudyTranslations();

    const badgesToShow = showAll
        ? BADGE_DEFINITIONS
        : BADGE_DEFINITIONS.filter(b => earnedBadges.includes(b.id));

    if (badgesToShow.length === 0 && !showAll) {
        return (
            <p className="text-[var(--study-text-muted)]">{t.profile.noBadges}</p>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {badgesToShow.map((badge) => {
                const isEarned = earnedBadges.includes(badge.id);
                const IconComponent = ICON_MAP[badge.icon] || Star;

                return (
                    <div
                        key={badge.id}
                        className={`relative p-3 rounded-xl border text-center transition-all ${isEarned
                            ? 'bg-[var(--study-surface)] border-[var(--study-border)]'
                            : 'bg-[var(--study-bg)] border-[var(--study-border)] opacity-40'
                            }`}
                        title={getBadgeDescription(badge, studyLang)}
                    >
                        <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${isEarned ? 'bg-[var(--study-accent)]/10' : 'bg-gray-500/10'
                            }`}>
                            <IconComponent
                                size={20}
                                className={isEarned ? badge.color : 'text-gray-400'}
                            />
                        </div>
                        <p className={`text-xs font-medium ${isEarned ? 'text-[var(--study-text)]' : 'text-gray-400'
                            }`}>
                            {getBadgeName(badge, studyLang)}
                        </p>
                        {!isEarned && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl opacity-30">🔒</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Single badge display component
 */
interface BadgeChipProps {
    badgeId: string;
}

export function BadgeChip({ badgeId }: BadgeChipProps) {
    const { studyLang } = useStudyLanguage();
    const badge = getBadgeById(badgeId);

    if (!badge) return null;

    const IconComponent = ICON_MAP[badge.icon] || Star;

    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--study-accent)]/10 text-sm"
            title={getBadgeDescription(badge, studyLang)}
        >
            <IconComponent size={14} className={badge.color} />
            <span className="text-[var(--study-text)]">{getBadgeName(badge, studyLang)}</span>
        </span>
    );
}
