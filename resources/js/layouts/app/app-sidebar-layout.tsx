import { Link, usePage } from "@inertiajs/react";
import {
    BookOpen,
    FileText,
    FolderGit2,
    LayoutGrid,
    Users,
} from "lucide-react";

const mainNavItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
    },
    {
        title: "Products",
        href: "/products",
        icon: FileText,
    },
    {
        title: "User Management",
        href: "/users",
        icon: Users,
    },
];

const footerNavItems = [
    {
        title: "Repository",
        href: "https://github.com/laravel/react-starter-kit",
        icon: FolderGit2,
    },
    {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits#react",
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page = usePage();
    const currentUrl = page.url || "/";
    const authUser: any = (page.props as any)?.auth?.user;

    const isActive = (href: string) =>
        currentUrl === href || currentUrl.startsWith(`${href}/`);

    return (
        <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between min-h-screen">
            <div>
                <div className="px-4 py-4 border-b border-slate-100">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 text-slate-900 font-semibold text-sm"
                    >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                            <FileText className="h-4 w-4" />
                        </span>
                        <div className="flex flex-col leading-tight truncate">
                            <span className="font-bold text-sm text-slate-800">
                                SIPENA
                            </span>
                            <span className="text-[11px] text-slate-500 truncate">
                                PN Banjar Kelas II
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="px-2 py-3">
                    <p className="px-3 text-xs font-medium text-slate-400 mb-1.5">
                        Menu Utama
                    </p>
                    <nav className="space-y-1">
                        {mainNavItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={`flex items-center gap-2.5 h-9 px-3 rounded-lg text-sm transition w-full ${
                                        active
                                            ? "bg-blue-50 text-blue-700 font-semibold"
                                            : "text-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span className="truncate">
                                        {item.title}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="px-2 py-3 border-t border-slate-100 space-y-2">
                <div className="space-y-1">
                    {footerNavItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.title}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 h-8 px-3 rounded-lg text-xs text-slate-600 hover:bg-slate-100 transition w-full"
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span className="truncate">{item.title}</span>
                            </a>
                        );
                    })}
                </div>

                {authUser && (
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/70">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white text-xs font-semibold uppercase">
                            {(authUser.name || "U").slice(0, 1)}
                        </span>
                        <span className="text-xs font-medium text-slate-700 truncate">
                            {authUser.name}
                        </span>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default AppSidebar;
