import { useRef } from "react";
import Button from "../Components/ui/Button";
import Badge from "../Components/ui/Badge";
import Section from "../Components/layout/Section";

export default function LT1() {
    const cfpRef = useRef<HTMLDivElement | null>(null);

    const scrollToCfp = () => {
        cfpRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <div className="text-sm font-semibold">好きを、語れ。</div>
                    <nav className="hidden gap-5 text-sm text-gray-600 md:flex">
                        <a className="hover:text-gray-900" href="#about">
                            概要
                        </a>
                        <a className="hover:text-gray-900" href="#cfp">
                            LT応募
                        </a>
                        <a className="hover:text-gray-900" href="#timetable">
                            TS
                        </a>
                        <a className="hover:text-gray-900" href="#join">
                            参加方法
                        </a>
                        <a className="hover:text-gray-900" href="#faq">
                            FAQ
                        </a>
                    </nav>
                    <Button variant="primary" href="https://example.com/register">
                        参加登録
                    </Button>
                </div>
            </header>

            {/* Hero */}
            <div className="bg-white">
                <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-14">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="flex flex-wrap gap-2">
                                <Badge label="LT応募〆 TBD" />
                                <Badge label="参加登録〆 TBD" />
                            </div>

                            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                好きを、語れ。
                            </h1>
                            <p className="mt-3 text-lg font-medium text-gray-900">
                                湘南藤沢高専 LT会
                            </p>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Discord開催｜参加者・LT登壇者募集中
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button variant="primary" href="https://example.com/register">
                                    参加登録
                                </Button>
                                <Button variant="secondary" onClick={scrollToCfp}>
                                    LT応募（CFP）
                                </Button>
                            </div>

                            <p className="mt-6 text-xs text-gray-500">
                                正式名称：好きを語れ！湘南藤沢高専LT会！！
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                                <p className="text-sm font-medium text-gray-900">
                                    Discord開催（オンライン）
                                </p>
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    参加登録後にDiscord招待リンクをお送りします。当日は開始5分前からチェックインできます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Section
                id="about"
                title="開催概要"
                description="目的・対象・形式（Discord）をコンパクトにまとめます。"
            >
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-sm font-semibold">目的</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            好きな技術・作品・活動について短く共有し、学びと交流を作るLT会です。
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-sm font-semibold">こんな人におすすめ</h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                            <li>人の「好き」を聞きたい</li>
                            <li>ライトに登壇してみたい</li>
                            <li>技術・制作の刺激が欲しい</li>
                        </ul>
                    </div>
                </div>
            </Section>

            <div ref={cfpRef} className="scroll-mt-20" />
            <Section
                id="cfp"
                title="LT募集（CFP）"
                description="登壇者未定の間はここを強く見せます。初心者歓迎。"
            >
                <div className="rounded-2xl border border-gray-200 p-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-semibold">募集概要</h3>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                                <li>テーマ：好きなこと（技術/作品/活動など）</li>
                                <li>持ち時間：5分（目安）</li>
                                <li>形式：Discord（画面共有）</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">応募</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                応募フォームに「タイトル・概要・連絡先」などを入力してください。
                            </p>
                            <div className="mt-4">
                                <Button variant="secondary" href="https://example.com/cfp">
                                    LT応募（CFP）
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="timetable" title="タイムテーブル（暫定）">
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-4 py-3">開始</th>
                                <th className="px-4 py-3">内容</th>
                                <th className="px-4 py-3">所要</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 py-3">19:00</td>
                                <td className="px-4 py-3">オープニング</td>
                                <td className="px-4 py-3">5分</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">19:05</td>
                                <td className="px-4 py-3">LT枠（募集中 / TBD）</td>
                                <td className="px-4 py-3">5分</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">19:10</td>
                                <td className="px-4 py-3">転換</td>
                                <td className="px-4 py-3">1分</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section id="join" title="参加方法（Discord）">
                <div className="grid gap-4 lg:grid-cols-3">
                    {[
                        { t: "1. 参加登録", d: "参加登録フォームから登録します。" },
                        { t: "2. 招待リンク受取", d: "Discord招待リンクが届きます。" },
                        { t: "3. 当日参加", d: "開始前にチェックインして参加します。" },
                    ].map((x) => (
                        <div key={x.t} className="rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-sm font-semibold">{x.t}</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">{x.d}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="faq" title="FAQ">
                <div className="rounded-2xl border border-gray-200 p-6">
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li>
                            <span className="font-medium text-gray-900">Q.</span> 初心者でも登壇できますか？
                            <br />
                            <span className="font-medium text-gray-900">A.</span> 歓迎です。短いLTでOKです。
                        </li>
                        <li>
                            <span className="font-medium text-gray-900">Q.</span> 録画はありますか？
                            <br />
                            <span className="font-medium text-gray-900">A.</span> ポリシーに従い、必要に応じて案内します。
                        </li>
                    </ul>
                </div>
            </Section>

            <footer className="border-t border-gray-200 py-10">
                <div className="mx-auto max-w-6xl px-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-900">
                        好きを語れ！湘南藤沢高専LT会！！
                    </div>
                    <p className="mt-2">運営・お問い合わせ：TODO</p>
                </div>
            </footer>
        </div>
    );
}
