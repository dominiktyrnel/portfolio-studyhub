import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useStudyLanguage } from '../../study/i18n/StudyLanguageContext';
import { Link } from 'react-router-dom';

// Default content sections (from docs/introduction.txt)
const defaultSections = [
    {
        id: 'my-story',
        titleKR: '나의 이야기',
        titleEN: 'My Story',
        contentKR: `저는 체코에서 태어나고 자랐고, 지금도 체코에서 일하고 있어요. 나이는 35살이고요.
제 삶은 늘 "편한 길"은 아니었어요. 그래서 저는 일찍부터 혼자 결정하고, 혼자 책임지는 방식에 익숙해졌습니다.

저는 감정적으로 크게 흔들리는 스타일이 아니에요.
문제가 생기면 화를 내기보다, 머리를 차갑게 하고 "지금 뭘 해야 해결되는가"부터 봐요.
핑계나 드라마는 제 에너지를 빼앗기만 해서, 저는 그런 걸 별로 좋아하지 않습니다.

일은 건설 현장에서 해왔어요.
현장에서는 말보다 결과가 먼저고, 작은 실수가 큰 재작업으로 이어져요. 그래서 저는 습관적으로 순서, 디테일, 마감, 책임을 봅니다.
"대충"이 아니라 "끝까지" 가는 쪽이 제 성향이에요.

그리고 저는 한 가지를 확실히 배웠어요.
인생이 바뀌는 순간은 '대단한 결심'이 아니라, 작은 루틴을 매일 지키는 순간에서 온다는 거요.
이 채널과 이 웹사이트는 그걸 보여주는 기록입니다. 멋있게 포장하려는 게 아니라, 꾸준함으로 증명하는 공간이에요.`,
        contentEN: `I was born and raised in the Czech Republic, and I still live and work here. I'm 35.
My path hasn't always been the easy one, so I learned early how to decide for myself and take responsibility.

I'm not someone who collapses under pressure.
When problems happen, I don't explode. I calm down and look at what needs to be done to fix it.
I don't like excuses or drama. They waste energy.

I've worked on construction sites.
On site, results matter more than words, and small mistakes turn into big rework. That's why I focus on order, details, finishing, and responsibility.
I'm not the "good enough" type. I'm the "finish it properly" type.

And I learned something simple:
life doesn't change from one big decision. It changes from small routines you keep every day.
This channel and this website are not about image. They're proof of consistency.`
    },
    {
        id: 'why-korea',
        titleKR: '왜 한국?',
        titleEN: 'Why Korea?',
        contentKR: `한국은 제게 '로맨틱한 도피'가 아니라, 현실적으로 선택한 목표예요.
저는 체코에서 건설 현장에서 일해온 사람이고, 말보다 결과로 평가받는 환경에 익숙합니다.

제가 한국을 선택한 이유는 단순해요.

첫째, 저는 "빨리 말하는 사람"이 아니라 "빨리 실행하는 사람"이 되고 싶어요.
한국은 속도만 빠른 게 아니라, 팀으로 움직이고, 일정과 품질을 맞추는 방식이 강하다고 느꼈어요.

둘째, 저는 한국에서 "특별한 삶"이 아니라 "안정적인 삶"을 만들고 싶어요.
성실하게 일하고, 실력을 쌓고, 현장에서 신뢰를 얻는 것. 저한테 성공은 과시가 아니라 꾸준함과 책임감이에요.

셋째, 저는 겉으로만 한국에서 살고 싶지 않아요.
그래서 언어를 취미로 하지 않습니다. 한국어는 생활과 현장 소통을 위한 도구라고 생각해요.

그리고 마지막으로, 저는 현실적인 준비를 합니다.
계획 없이 "가서 버텨보자"는 스타일이 아니에요. 언어, 일, 생활, 비자까지 전부 단계적으로 준비하고 있어요.`,
        contentEN: `Korea isn't a "romantic escape" for me. It's a realistic goal I chose on purpose.
I've worked in construction in the Czech Republic, and I'm used to being judged by results, not words.

My reasons are simple.

First, I want to be someone who executes fast, not someone who just talks fast.
Korea feels strong in teamwork, real execution, and keeping schedules and quality.

Second, I'm not chasing a "special life." I want a stable life.
Work honestly, build real skill, earn trust on site. To me, success isn't showing off. It's consistency and responsibility.

Third, I don't want to live in Korea only on the surface.
That's why language isn't a hobby for me. Korean is a tool for daily life and on-site communication.

And finally, I prepare realistically.
I'm not the "I'll just go and survive" type. I'm preparing step by step: language, work, life, and visa.`
    },
    {
        id: 'routine',
        titleKR: '현재 루틴',
        titleEN: 'My Routine',
        contentKR: `제 루틴은 단순해요.
낮에는 일하고, 밤에는 공부합니다. 딱 주경야독이에요.

저는 "동기"로 움직이는 타입이 아니에요.
기분이 좋을 때만 하는 건 결국 오래 못 갑니다. 그래서 저는 시스템을 만들어요.
정해진 시간에 앉고, 정해진 방식으로 시작하고, 끝까지 밀고 가는 방식이요.

이 스트림도 그 시스템의 일부예요.
혼자 하면 미루기 쉬운 날이 있잖아요. 그런데 라이브를 켜면, 이상하게 시작하게 됩니다.

여기서는 일부러 "조용함"을 선택했어요.
집중 시간에는 말이 적고, 쉬는 시간에만 가볍게 소통해요.`,
        contentEN: `My routine is simple: work during the day, study at night, literally "work by day, study by night."

I don't run on motivation. Motivation disappears when you're tired.
I run on systems: sit down at a set time, start the same way, and push through to the end.

This stream is part of that system.
Alone, it's easy to postpone. When I go live, I start. And once I start, I finish.

The quiet vibe is intentional.
During focus time, I talk less. During breaks, I interact a little.
This isn't a place to chatter. It's a place to keep studying.`
    },
    {
        id: 'goals',
        titleKR: '목표와 로드맵',
        titleEN: 'Goals & Roadmap',
        contentKR: `저는 목표를 크게 말하는 것보다, 작게 쪼개서 매일 실행하는 걸 선호해요.

1) 한국어
매일 공부하고, 반복하고, 실제로 쓰는 쪽으로 끌어올립니다.
목표는 "공부하는 사람"이 아니라, 대화가 되는 사람이 되는 거예요.

2) 일(현장)
저는 책상에만 앉는 직업보다, 손과 몸을 쓰면서 결과가 남는 일을 좋아해요.
한국에서도 실제로 필요한 일을 잘 해내는 사람이 되고 싶어요.

3) 이동/정착 준비
저는 "일단 가보자" 타입이 아니에요.
언어, 일, 비자/생활, 정착, 이렇게 단계로 준비합니다.`,
        contentEN: `I don't like big promises. I prefer breaking goals into small steps and executing them daily.

1) Korean
Daily study, repetition, and practical usage. The goal isn't "someone who studies," but someone who can actually talk.

2) Work (on site)
I like practical work where results are visible. In Korea, I don't want to impress. I want to be useful and reliable.

3) Moving & settling
I'm not the "I'll just go and see" type.
I prepare in steps: language, work, visa & life, real settlement.`
    },
    {
        id: 'progress',
        titleKR: '진행 상황',
        titleEN: 'Progress',
        contentKR: `저는 진행 상황을 포장하고 싶지 않아요. 그래서 있는 그대로 말할게요.

지금 제가 가진 가장 큰 강점은 꾸준함입니다.
많이 하는 날도 있고 적게 하는 날도 있지만, 중요한 건 "계속"이에요.
저는 멈추지 않고 다시 앉습니다. 그게 제 무기예요.

그리고 저는 제 부족한 부분도 알고 있어요.
한국어는 아직 완성형이 아니고, 특히 속도나 자연스러움은 더 올려야 합니다.

이 웹사이트의 기록(Records)과 계획(Plan)은 그걸 눈에 보이게 만들기 위한 장치예요.
감으로 "잘 되는 것 같다"가 아니라, 데이터로 확인하고 싶거든요.`,
        contentEN: `I don't want to polish the truth, so I'll say it clearly.

My biggest strength right now is consistency.
Some days I do more, some days less... but the important part is continuing.
I don't stop. I sit down again. That's my weapon.

And I know what I'm missing.
My Korean isn't finished, and I still need more speed and natural flow.

That's why this website has Plan and Records.
I don't want a vague feeling of progress. I want proof.`
    },
    {
        id: 'preparation',
        titleKR: '한국 준비',
        titleEN: 'Preparing for Korea',
        contentKR: `저의 준비는 '정보 모으기'로 끝나지 않아요.
저는 준비를 현실적인 행동으로 바꿉니다.

- 언어는 취미가 아니라 도구로 잡고,
- 일은 꿈이 아니라 실제 능력으로 만들고,
- 루틴은 의지가 아니라 시스템으로 굳힙니다.

그리고 이 과정에서 저는 혼자만 달리는 게 아니라, 같은 분위기의 사람들과 같이 가고 싶어요.
그래서 커뮤니티를 만들고, 조용한 스터디 흐름을 유지하려고 합니다.`,
        contentEN: `My preparation doesn't stop at collecting information. I turn it into real actions.

- Language is a tool, not a hobby.
- Work is a real skill, not a dream.
- Routine is a system, not willpower.

And I don't want to run alone. I want to build a calm community with the same vibe.
To some people, this is just a stream. To me, it's part of preparing to settle properly.`
    },
    {
        id: 'work-skills',
        titleKR: '일/기술',
        titleEN: 'Work / Skills',
        contentKR: `저는 건설 현장에서 일해왔고, 제 강점은 "손"만이 아니라 현장 감각 + 책임감 + 마무리예요.

현장에서 중요한 건 결국 이거예요.
- 약속한 걸 지키는 사람인지
- 작업 품질을 끝까지 보는 사람인지
- 문제가 생겼을 때 숨기지 않고 해결하는 사람인지

저는 '말 잘하는 사람'보다, 믿고 맡길 수 있는 사람이 되고 싶어요.

그리고 저는 기술 쪽도 관심이 많아요.
웹, 자동화, 봇 같은 것들을 시스템을 단단하게 만들기 위해 씁니다.`,
        contentEN: `I've worked on construction sites, and my strength isn't just "hands." It's site sense, responsibility, and finishing properly.

On site, what matters is simple:
- Do you keep your word?
- Do you care about quality until the end?
- When problems happen, do you fix them instead of hiding them?

I don't want to be a good talker. I want to be someone you can trust.

I'm also interested in the technical side: websites, automation, bots, and process systems.
Not for show. Only to make the whole system stable long-term.`
    },
    {
        id: 'faq-link',
        titleKR: 'FAQ',
        titleEN: 'FAQ',
        contentKR: `빠르게 알고 싶다면 FAQ를 보시면 돼요. 짧고 핵심만 정리해두었습니다.

그리고 더 자세한 내용이 필요할 때는, FAQ 안에 있는 답변들을 확인해보세요.
저는 질문을 숨기지 않고, 정리해서 보여주는 방식을 좋아합니다.`,
        contentEN: `If you want quick answers, check the FAQ. It's short, clear, and practical.

If you want more detail, check the answers in the FAQ section.
I prefer answers that are easy to find and well organized.`,
        isFAQSection: true
    }
];

interface IntroSection {
    id: string;
    titleKR: string;
    titleEN: string;
    contentKR: string;
    contentEN: string;
    isFAQSection?: boolean;
}

export function StudyIntroductionPage() {
    const { studyLang } = useStudyLanguage();
    const [sections, setSections] = useState<IntroSection[]>(defaultSections);
    const [selectedSection, setSelectedSection] = useState<string>('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const fetchContent = async () => {
            if (!db) return;
            try {
                const docRef = doc(db, 'intro_content', 'current');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.sections && Array.isArray(data.sections)) {
                        setSections(data.sections);
                    }
                }
            } catch {
                // Use default content on error
            }
        };
        fetchContent();
    }, []);

    const scrollToSection = (sectionId: string) => {
        setSelectedSection(sectionId);
        setDropdownOpen(false);
        const ref = sectionRefs.current[sectionId];
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getTitle = (section: IntroSection) => studyLang === 'kr' ? section.titleKR : section.titleEN;
    const getContent = (section: IntroSection) => studyLang === 'kr' ? section.contentKR : section.contentEN;

    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[var(--study-text)] mb-2 font-heading text-center">
                {studyLang === 'kr' ? '소개' : 'Introduction'}
            </h1>
            <p className="text-center text-[var(--study-text-muted)] mb-8">
                {studyLang === 'kr' ? '도미니크에 대해 알아보세요' : 'Learn more about Dominik'}
            </p>

            <div className="mb-10 relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between gap-3 bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl px-6 py-4 text-left hover:border-[var(--study-accent)] transition-colors"
                >
                    <span className="font-bold text-[var(--study-text)]">
                        {selectedSection
                            ? getTitle(sections.find(s => s.id === selectedSection) || sections[0])
                            : (studyLang === 'kr' ? '섹션 선택...' : 'Jump to section...')
                        }
                    </span>
                    <ChevronDown size={20} className={`text-[var(--study-text-muted)] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl shadow-lg overflow-hidden animate-fade-in">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="w-full px-6 py-3 text-left hover:bg-[var(--study-bg)] transition-colors border-b border-[var(--study-border)] last:border-b-0"
                            >
                                <span className="text-[var(--study-text)]">{getTitle(section)}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-8">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        ref={(el) => { sectionRefs.current[section.id] = el; }}
                        className="bg-[var(--study-surface)] border border-[var(--study-border)] rounded-2xl p-6 md:p-8"
                    >
                        <h2 className="text-2xl font-bold text-[var(--study-text)] mb-4 font-heading">
                            {getTitle(section)}
                        </h2>

                        <div className="text-[var(--study-text-muted)] whitespace-pre-line leading-relaxed">
                            {getContent(section)}
                        </div>

                        {section.isFAQSection && (
                            <Link
                                to="/study/faq"
                                className="inline-flex items-center gap-2 mt-6 bg-[var(--study-accent)] text-[var(--study-bg)] font-bold px-6 py-3 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors"
                            >
                                {studyLang === 'kr' ? 'FAQ 보러 가기' : 'Go to FAQ'}
                                <ExternalLink size={18} />
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
