import { MessageCircle, Mail, Phone } from "lucide-react";
import { useGlobalContent } from "../../hooks/useGlobalContent";
import { profile as staticProfile } from "../../data/cv"; // Fallback
import { Section } from "../Section";

export function Contact() {
    const { data: global } = useGlobalContent();

    // Use global data if available, otherwise static
    const email = global?.contact?.email || staticProfile.email;
    const kakao = global?.contact?.kakaoId || staticProfile.kakaoId;
    const phoneKr = global?.contact?.phoneKr;

    return (
        <Section id="contact" title="연락">
            <div className="bg-white border-t-4 border-navy-800 shadow-xs p-8 text-center rounded">
                <p className="text-lg font-bold text-navy-900 mb-6">
                    면접 및 연락 가능합니다.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 flex-wrap">
                    <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded text-gray-900 transition-colors min-w-[200px]">
                        <Mail size={20} />
                        <span className="font-medium">{email}</span>
                    </a>

                    <div className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400/20 text-yellow-800 rounded min-w-[200px]">
                        <MessageCircle size={20} />
                        <span className="font-bold">KakaoTalk: {kakao}</span>
                    </div>

                    {/* Dynamic KR Phone Logic */}
                    <div className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded min-w-[280px]">
                        <Phone size={18} />
                        <span className="font-medium text-sm">
                            {(!phoneKr || phoneKr.trim().length === 0 || phoneKr === 'none')
                                ? "한국 현지 번호: 없음 (체코 거주)"
                                : `KR: ${phoneKr}`}
                        </span>
                    </div>
                </div>

                {/* Privacy Policy Link */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <a
                        href="/privacy"
                        className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                    >
                        Zásady cookies a ochrany soukromí
                    </a>
                </div>
            </div>
        </Section>
    );
}
