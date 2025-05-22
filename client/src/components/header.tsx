import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, Video, Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";
import { SiYoutube } from "react-icons/si";

interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (query: string) => void;
}

export function Header({ onMenuToggle, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-bg border-b border-border">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo and Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center space-x-1 hover:no-underline">
            <SiYoutube className="text-youtube-red text-2xl" />
            <span className="text-xl font-medium text-foreground">YouTube</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-l-full rounded-r-none border-r-0 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              className="px-6 rounded-l-none rounded-r-full border-l-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* User Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
