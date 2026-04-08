import Button from "../ui/Button";
import { lt2Event } from "../../content/lt2Event";

export default function HeroSection() {
    return (
        <section id="top" className="relative overflow-hidden border-b border-[var(--line)]">
            <div className="lt-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div
                className="pointer-events-none absolute inset-x-0 top-[-20rem] h-[50rem] bg-[radial-gradient(ellipse_at_top,_rgba(150,150,150,0.06),_transparent_60%)]"
                aria-hidden="true"
            />
            {/* Vercel-like glow effect */}
            <div
                className="pointer-events-none absolute right-[10%] top-[-10rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,_rgba(0,112,243,0.05),_transparent_70%)] blur-[100px]"
                aria-hidden="true"
            />

            <div className="mx-auto grid min-h-[calc(100svh-73px)] max-w-6xl items-start gap-12 px-5 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:px-8 lg:py-9">
                <div className="relative z-10">
                    <p className="lt-kicker tracking-[0.2em] opacity-0 animate-slide-in-left" style={{ animationDelay: '0ms' }}>KOSEN LIGHTNING TALKS</p>
                    <h1 className="mt-5 max-w-4xl font-display text-[3.5rem] font-bold leading-[1.05] tracking-tight text-[var(--text-strong)] sm:text-6xl lg:text-[4.5rem] opacity-0 animate-slide-in-left" style={{ animationDelay: '100ms' }}>
                        湘南藤沢高専<br />
                        <span className="inline-block">LT会</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[var(--text-strong)] font-medium opacity-0 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                        {lt2Event.tagline}
                    </p>
                    <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-muted)] opacity-0 animate-slide-in-left" style={{ animationDelay: '300ms' }}>
                        {lt2Event.description}
                    </p>

                    <div className="mt-10 max-w-2xl opacity-0 animate-slide-in-left" style={{ animationDelay: '400ms' }}>
                        {lt2Event.heroFacts.map((fact) => (
                            <div key={fact.label} className="lt-meta-row py-3">
                                <span className="font-display text-[10px] uppercase tracking-widest text-[#888]">
                                    {fact.label}
                                </span>
                                <span className="text-sm font-medium leading-7 text-[var(--text-strong)]">{fact.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center opacity-0 animate-slide-in-left" style={{ animationDelay: '500ms' }}>
                        <Button
                            to={lt2Event.registerPath}
                            variant="primary"
                            size="lg"
                            className="min-w-[180px] font-semibold transition-transform hover:scale-105 duration-300"
                        >
                            登壇エントリー
                        </Button>
                        <Button
                            href={lt2Event.joinUrl}
                            variant="secondary"
                            size="lg"
                            className="min-w-[180px] font-semibold transition-transform hover:scale-105 duration-300"
                        >
                            参加案内を見る
                        </Button>
                    </div>

                    <p className="mt-8 max-w-lg text-sm leading-7 text-[#888888] opacity-0 animate-slide-in-left" style={{ animationDelay: '600ms' }}>
                        話してみたいことがある人も、面白い発表を聞きたい人も、同じ熱量で集まれる校内イベントを目指します。
                    </p>
                </div>

                <div className="relative z-10 opacity-0 animate-slide-in-right lg:mt-4" style={{ animationDelay: '400ms' }}>
                    <div className="lt-hero-panel relative overflow-hidden bg-white px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
                        <div className="relative flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                            <span>{lt2Event.eventCode}</span>
                            <span className="text-right">{lt2Event.audienceLine}</span>
                        </div>

                        <div className="relative mt-6">
                            <div className="lt-hero-visual">
                                <div className="relative h-[210px] w-full rounded-xl border border-[var(--line)] bg-[#fafafa] overflow-hidden flex items-center justify-center p-4">
                                    {/* Subdued grid background */}
                                    <div className="absolute inset-0 bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                                    
                                    {/* Floating Deployment Card */}
                                    <div className="relative z-10 w-full max-w-sm rounded-xl border border-[var(--line)] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
                                        {/* Card Header */}
                                        <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[#fafafa] px-4 py-3">
                                            <div className="flex gap-1.5">
                                                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                                                <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                                                <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                                            </div>
                                            <div className="ml-4 font-mono text-[10px] uppercase tracking-widest text-[#888]">main.tsx</div>
                                        </div>
                                        
                                        {/* Card Body: Abstract Code Editor */}
                                        <div className="p-4">
                                            <div className="flex items-start gap-3">
                                                {/* Line Numbers */}
                                                <div className="flex flex-col gap-2.5 text-[10px] font-mono text-[#ccc] select-none text-right w-4">
                                                    <span>1</span>
                                                    <span>2</span>
                                                    <span>3</span>
                                                    <span>4</span>
                                                    <span>5</span>
                                                </div>
                                                
                                                {/* Code Lines (Abstract) */}
                                                <div className="flex-1 space-y-2.5">
                                                    <div className="flex gap-2">
                                                        <div className="h-2 w-12 rounded bg-purple-400 opacity-30" /> {/* keyword */}
                                                        <div className="h-2 w-24 rounded bg-blue-400 opacity-30" /> {/* function */}
                                                        <div className="h-2 w-8 rounded bg-[#f0f0f0]" />
                                                    </div>
                                                    <div className="flex gap-2 pl-4">
                                                        <div className="h-2 w-16 rounded bg-blue-400 opacity-30" />
                                                        <div className="h-2 w-28 rounded bg-green-400 opacity-30" /> {/* string */}
                                                    </div>
                                                    <div className="flex gap-2 pl-4">
                                                        <div className="h-2 w-32 rounded bg-[#f0f0f0]" />
                                                        <div className="h-2 w-1.5 rounded-full bg-[#0070f3] animate-pulse" /> {/* cursor */}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="h-2 w-10 rounded bg-purple-400 opacity-30" />
                                                        <div className="h-2 w-16 rounded bg-[#f0f0f0]" />
                                                    </div>
                                                    <div className="h-2 w-2/3 rounded bg-[#f0f0f0]" />
                                                </div>
                                            </div>
                                            
                                            {/* Status Bar */}
                                            <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-4 opacity-60">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                                                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#888]">TypeScript</div>
                                                </div>
                                                <div className="font-mono text-[9px] text-[#888]">UTF-8</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-6 border-b border-[var(--line)] pb-7">
                            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                                Save the Date
                            </p>
                            <div className="mt-2">
                                <div className="lt-index-number text-[4.2rem] text-[var(--text-strong)] sm:text-[5.2rem] leading-none tracking-tighter">
                                    04/25
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div>
                                    <div className="border-l-2 border-[var(--line)] pl-4">
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#888]">
                                            April 2026
                                        </p>
                                        <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] pr-2">
                                            Discord内講堂で気軽に集まるライトニングトーク。
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
                                        Saturday
                                    </p>
                                    <p className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-strong)]">
                                        14:00
                                    </p>
                                    <p className="mt-1 text-xs text-[var(--text-muted)]">Open 13:30</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-7 space-y-5">
                            <div>
                                <p className="font-display text-[11px] uppercase tracking-[0.24em] text-[#888]">Venue</p>
                                <p className="mt-2 text-lg font-medium text-[var(--text-strong)]">{lt2Event.venue}</p>
                            </div>
                            <div>
                                <p className="font-display text-[11px] uppercase tracking-[0.24em] text-[#888]">Format</p>
                                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{lt2Event.dateNote}</p>
                            </div>
                        </div>

                        <div className="relative mt-8 grid gap-4 text-sm text-[var(--text-muted)] sm:grid-cols-2">
                            <div className="lt-mini-note">
                                <div className="font-medium text-[var(--text-strong)]">視聴のみ歓迎</div>
                                <p className="mt-2 leading-7">まずは空気を見に来るだけでも大丈夫です。</p>
                            </div>
                            <div className="lt-mini-note">
                                <div className="font-medium text-[var(--text-strong)]">初登壇歓迎</div>
                                <p className="mt-2 leading-7">完成度よりも、今話したい熱量を優先します。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
