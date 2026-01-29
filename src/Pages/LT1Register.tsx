import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/ui/Button";



// Discord Webhook URL from environment variables
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

export default function LT1Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form fields
    const [discordName, setDiscordName] = useState("");
    const [discordId, setDiscordId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!DISCORD_WEBHOOK_URL) {
            setError("Webhook URLが設定されていません。管理者にお問い合わせください。");
            console.error("VITE_DISCORD_WEBHOOK_URL is missing in .env");
            setIsSubmitting(false);
            return;
        }

        const embed = {
            title: "🎤 LT登壇応募",
            color: 0x6366f1, // indigo
            fields: [
                { name: "Discord名", value: discordName, inline: true },
                { name: "Discord ID", value: discordId || "未入力", inline: true },
                { name: "発表タイトル", value: title },
                { name: "発表概要", value: description || "未入力" },
            ],
            timestamp: new Date().toISOString(),
            footer: { text: "好きを語ろう！湘南藤沢高専LT会" },
        };

        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ embeds: [embed] }),
            });

            if (!response.ok) {
                throw new Error("送信に失敗しました");
            }

            setIsSubmitted(true);
        } catch (err) {
            setError("送信に失敗しました。時間をおいて再度お試しください。");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        LT応募を受け付けました！
                    </h1>
                    <p className="text-gray-600 mb-6">
                        運営から連絡をお待ちください。
                    </p>
                    <div className="mb-6 flex flex-col gap-3">
                        <Button variant="primary" to="/join">
                            Discordに参加する
                        </Button>
                        <Link
                            to="/events/lt-1"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            イベントページに戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="border-b border-gray-200">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-900">LT登壇応募</div>
                        <div className="text-xs text-gray-600">好きを語ろう！湘南藤沢高専LT会</div>
                    </div>
                    <Link className="text-sm text-gray-600 hover:text-gray-900" to="/events/lt-1">
                        ← 戻る
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-10">
                {/* Form Type Selector Removed */}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Discord Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Discord表示名 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={discordName}
                            onChange={(e) => setDiscordName(e.target.value)}
                            placeholder="例: まふゆ"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>

                    {/* Discord ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Discord ID（任意）
                        </label>
                        <input
                            type="text"
                            value={discordId}
                            onChange={(e) => setDiscordId(e.target.value)}
                            placeholder="例: mafuyu#1234 または 123456789012345678"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <p className="mt-1 text-xs text-gray-500">連絡用に使用することがあります</p>
                    </div>

                    {/* Presenter-only fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            発表タイトル <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="例: 私の推し技術を5分で熱く語る"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            発表概要（任意）
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="どんな内容を話すか簡単に教えてください"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                        />
                    </div>

                    <div className="rounded-xl bg-indigo-50 p-4">
                        <p className="text-sm text-indigo-800">
                            💡 発表時間は<span className="font-medium">7分</span>（発表5分＋質疑2分）です。
                            初学者にもわかるように、情熱をもって語ってください！
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-xl bg-red-50 p-4">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <Button variant="primary" onClick={() => { }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting
                                ? "送信中..."
                                : "LT応募を送信"}
                        </button>
                    </Button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                    送信された情報はDiscordの運営チャンネルに通知されます
                </p>
            </main>
        </div>
    );
}
