import { Link, useLocation } from "wouter";
import {
  Home,
  Compass,
  Play,
  Tv,
  Folder,
  History,
  Clock,
  ThumbsUp,
  Music,
  Gamepad2,
  Newspaper,
  Dumbbell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const [location] = useLocation();

  const navigationItems = [
    { icon: Home, label: "ホーム", href: "/" },
    { icon: Compass, label: "探索", href: "/explore" },
    { icon: Play, label: "ショート", href: "/shorts" },
    { icon: Tv, label: "登録チャンネル", href: "/subscriptions" },
  ];

  const libraryItems = [
    { icon: Folder, label: "ライブラリ", href: "/library" },
    { icon: History, label: "履歴", href: "/history" },
    { icon: Clock, label: "後で見る", href: "/watch-later" },
    { icon: ThumbsUp, label: "高く評価した動画", href: "/liked" },
  ];

  const categoryItems = [
    { icon: Music, label: "音楽", href: "/music" },
    { icon: Gamepad2, label: "ゲーム", href: "/gaming" },
    { icon: Newspaper, label: "ニュース", href: "/news" },
    { icon: Dumbbell, label: "スポーツ", href: "/sports" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-full w-60 bg-white dark:bg-dark-bg border-r border-border transform transition-transform duration-200 z-40 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="p-3">
        {/* Primary Navigation */}
        <div className="space-y-1 mb-4">
          {navigationItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "flex items-center space-x-6 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location === href
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>

        <hr className="border-border mb-4" />

        {/* Library */}
        <div className="space-y-1 mb-4">
          {libraryItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "flex items-center space-x-6 px-3 py-2 rounded-lg text-sm transition-colors",
                  location === href
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>

        <hr className="border-border mb-4" />

        {/* Categories */}
        <div className="space-y-1">
          <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">
            カテゴリ
          </h3>
          {categoryItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "flex items-center space-x-6 px-3 py-2 rounded-lg text-sm transition-colors",
                  location === href
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
