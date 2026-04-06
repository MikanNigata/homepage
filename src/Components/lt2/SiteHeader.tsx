import Button from "../ui/Button";
import { lt2Event } from "../../content/lt2Event";

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(247,248,243,0.82)] backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
                <a href="#top" className="min-w-0">
                    <div className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                        {lt2Event.eventCode}
                    </div>
                    <div className="mt-1 text-sm font-medium text-[var(--text-strong)] sm:text-base">
                        {lt2Event.name}
                    </div>
                </a>

                <nav className="hidden items-center gap-6 lg:flex">
                    {lt2Event.navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <Button
                    to={lt2Event.registerPath}
                    variant="primary"
                    size="sm"
                    className="font-semibold"
                >
                    登壇する
                </Button>
            </div>
        </header>
    );
}
