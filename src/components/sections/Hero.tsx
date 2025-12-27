
export function Hero() {
    return (
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white mb-16 shadow-2xl">
            {/* Background Pattern/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 opacity-90 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>

            <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="max-w-xl">
                    <div className="flex items-center gap-3 text-sky-400 font-bold uppercase tracking-widest text-xs mb-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                        <span className="w-8 h-0.5 bg-sky-500 rounded-full"></span>
                        Construction Professional
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">
                        Building Trust <br />
                        <span className="text-slate-400">Through Excellence.</span>
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                        15년 경력의 베테랑 기술자. 체코 현장에서 증명된 실력으로 한국 건설의 든든한 파트너가 되겠습니다.
                    </p>
                    <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-400">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10 hover:bg-white/20 transition-colors">100% Reliablity</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10 hover:bg-white/20 transition-colors">Safety First</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10 hover:bg-white/20 transition-colors">High Quality</span>
                    </div>
                </div>

                {/* Decorative or abstract element on the right? Maybe just space or a subtle graphic */}
                <div className="hidden md:block opacity-20 transform rotate-12 translate-x-10">
                    {/* SVG or Icon for construction context */}
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                        <path d="M22 22L2 22" />
                        <path d="M2 11L22 11" />
                        <path d="M12 2L2 11" />
                        <path d="M12 2L22 11" />
                        <path d="M5.5 11L5.5 22" />
                        <path d="M9.5 11L9.5 22" />
                        <path d="M14.5 11L14.5 22" />
                        <path d="M18.5 11L18.5 22" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
