import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/ui/Button";

type AuthUser = {
    id: string;
    username: string;
    globalName?: string | null;
};

const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s]+/i;
const DOMAIN_PATTERN = /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/[^\s]*)?/i;

const findForbidden = (value: string) => {
    const normalized = value.trim();
    if (!normalized) {
        return null;
    }
    if (normalized.includes("@")) {
        return "Mentions (@) are not allowed.";
    }
    if (URL_PATTERN.test(normalized) || DOMAIN_PATTERN.test(normalized)) {
        return "URLs (including short links) are not allowed.";
    }
    return null;
};

export default function LT1Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        let active = true;
        setAuthLoading(true);

        fetch("/api/auth/status", { credentials: "include" })
            .then(async (res) => {
                if (!active) return;
                if (!res.ok) {
                    setUser(null);
                    return;
                }
                const data = (await res.json()) as { user?: AuthUser };
                setUser(data.user ?? null);
            })
            .catch(() => {
                if (active) {
                    setUser(null);
                }
            })
            .finally(() => {
                if (active) {
                    setAuthLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const titleIssue = findForbidden(title);
    const descriptionIssue = findForbidden(description);

    const handleLogin = () => {
        window.location.href = "/api/auth/login";
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setUser(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!user) {
            setError("Sign in with Discord before submitting.");
            return;
        }
        if (!trimmedTitle) {
            setError("Title is required.");
            return;
        }
        if (trimmedTitle.length > 100) {
            setError("Title is too long.");
            return;
        }
        if (trimmedDescription.length > 1000) {
            setError("Description is too long.");
            return;
        }
        if (findForbidden(trimmedTitle) || findForbidden(trimmedDescription)) {
            setError("URLs and @ mentions are not allowed.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/lt1/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    title: trimmedTitle,
                    description: trimmedDescription,
                }),
            });

            const data = (await response.json().catch(() => ({}))) as { error?: string };
            if (!response.ok) {
                throw new Error(data.error || "Submission failed.");
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Submission failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayName = user?.globalName
        ? `${user.globalName} (${user.username})`
        : user?.username;

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="text-5xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Submission received
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We will reach out on Discord if we need any follow-up.
                    </p>
                    <div className="mb-6 flex flex-col gap-3">
                        <Button variant="primary" to="/join">
                            Join the Discord
                        </Button>
                        <Link
                            to="/events/lt-1"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Back to event page
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
                        <div className="text-sm font-semibold text-gray-900">
                            LT submission
                        </div>
                        <div className="text-xs text-gray-600">
                            Sign in with Discord to identify the submitter.
                        </div>
                    </div>
                    <Link className="text-sm text-gray-600 hover:text-gray-900" to="/events/lt-1">
                        Back
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-10">
                <div className="rounded-xl border border-gray-200 p-4">
                    <div className="text-sm font-semibold text-gray-900">Discord sign-in</div>
                    {authLoading ? (
                        <p className="mt-1 text-sm text-gray-600">Checking session…</p>
                    ) : user ? (
                        <p className="mt-1 text-sm text-gray-600">
                            Signed in as <span className="font-medium">{displayName}</span>
                        </p>
                    ) : (
                        <p className="mt-1 text-sm text-gray-600">
                            Sign in is required to submit.
                        </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {user ? (
                            <Button variant="secondary" onClick={handleLogout}>
                                Sign out
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleLogin}>
                                Sign in with Discord
                            </Button>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={100}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Short talk title"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {titleIssue && (
                            <p className="mt-2 text-xs text-red-600">{titleIssue}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Description (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            maxLength={1000}
                            placeholder="A short summary of the topic"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                        />
                        {descriptionIssue && (
                            <p className="mt-2 text-xs text-red-600">{descriptionIssue}</p>
                        )}
                    </div>

                    <div className="rounded-xl bg-indigo-50 p-4">
                        <p className="text-sm text-indigo-800">
                            URLs (including short links) and @ mentions are blocked in submissions.
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-xl bg-red-50 p-4">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <Button type="submit" disabled={isSubmitting || !user || !!titleIssue || !!descriptionIssue}>
                        {isSubmitting ? "Submitting…" : "Submit LT proposal"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                    Your Discord account is recorded via OAuth2 for submitter tracking.
                </p>
            </main>
        </div>
    );
}
