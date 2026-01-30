import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Brain,
  MessageCircle,
  HelpCircle,
  Settings,
  Menu,
  X,
  Home,
  Cpu,
  Palette,
  Info,
  Hospital,
  Activity,
  FileText,
  Heart,
  User,
  Droplet,
  ChevronDown,
  LogOut,
  LogIn
} from 'lucide-react';
import { ChatBot } from './ChatBot';
import { FAQModal } from './FAQModal';
import { SettingsModal } from './SettingsModal';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface GlassNavbarProps {
  showBack?: boolean;
  onBackClick?: () => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({ showBack, onBackClick }) => {
  const { currentUser, logout } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { colors } = useTheme();

  const publicItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Hardware', href: '/hardware-integration', icon: Cpu },
    { label: 'About', href: '/about', icon: Info },
  ];

  const protectedItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Activity },
    { label: 'Diabetes', href: '/diabetes', icon: Droplet },
    { label: 'BP Tracker', href: '/bp-tracker', icon: Heart },
  ];

  const moreProtectedItems = [
    { label: 'EHR', href: '/ehr', icon: Hospital },
    { label: 'Reports', href: '/report', icon: FileText },
  ];

  // Combine items based on auth state
  const visibleNavItems = currentUser
    ? [...publicItems.slice(0, 1), ...protectedItems]
    : publicItems;

  const visibleMoreItems = currentUser
    ? [...moreProtectedItems]
    : [];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Brain className="w-8 h-8 text-primary relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">
                  Health Scan
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">ABDM Integrated</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {visibleNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`
                      relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${active
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-white/5'
                      }
                    `}
                  >
                    <item.icon className={`w-4 h-4 ${active ? 'text-primary' : ''}`} />
                    <span>{item.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                    )}
                  </Link>
                );
              })}

              {/* More Menu - Only show if there are more items */}
              {visibleMoreItems.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        text-muted-foreground hover:text-primary hover:bg-white/5
                      `}
                    >
                      <span>More</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 glass-panel border-white/10 bg-black/80 backdrop-blur-xl">
                    {visibleMoreItems.map((item) => (
                      <DropdownMenuItem key={item.label} asChild className="focus:bg-white/10 focus:text-primary cursor-pointer text-gray-300">
                        <Link
                          to={item.href}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">

              {!currentUser ? (
                <div className="hidden lg:block mr-2">
                  <Link to="/login">
                    <Button variant="default" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="hidden lg:block mr-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8 border border-white/10">
                          <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || ''} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {currentUser.displayName?.charAt(0) || <User className="w-4 h-4" />}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-panel border-white/10 bg-black/80 backdrop-blur-xl">
                      <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-medium text-foreground leading-none">{currentUser.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                      </div>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-primary cursor-pointer">
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {/* Quick Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/10 text-muted-foreground hover:text-primary rounded-lg"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass-panel border-white/10 bg-black/80 backdrop-blur-xl">
                  <DropdownMenuItem onClick={() => setIsChatOpen(true)} className="focus:bg-white/10 focus:text-primary cursor-pointer text-gray-300">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>Chat Assistant</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsFAQOpen(true)} className="focus:bg-white/10 focus:text-primary cursor-pointer text-gray-300">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    <span>FAQ</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => setIsThemeSelectorOpen(true)} className="focus:bg-white/10 focus:text-primary cursor-pointer text-gray-300">
                    <Palette className="w-4 h-4 mr-2" />
                    <span>Theme</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsSettingsOpen(true)} className="focus:bg-white/10 focus:text-primary cursor-pointer text-gray-300">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden hover:bg-white/10 text-muted-foreground hover:text-primary rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl absolute top-16 left-0 right-0 shadow-lg">
              <div className="py-2 space-y-1 p-4">
                {visibleNavItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                        ${active
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-300 hover:text-primary hover:bg-white/5'
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className={`w-5 h-5 ${active ? 'text-primary' : ''}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-white/10 my-2"></div>
                {visibleMoreItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                        ${active
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-300 hover:text-primary hover:bg-white/5'
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className={`w-5 h-5 ${active ? 'text-primary' : ''}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-white/10 my-2"></div>
                <button
                  onClick={() => {
                    setIsChatOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat Assistant</span>
                </button>
                <button
                  onClick={() => {
                    setIsFAQOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>FAQ</span>
                </button>
                <button
                  onClick={() => {
                    setIsThemeSelectorOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 transition-colors"
                >
                  <Palette className="w-5 h-5" />
                  <span>Theme</span>
                </button>
                <button
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ThemeSelector isOpen={isThemeSelectorOpen} onClose={() => setIsThemeSelectorOpen(false)} />
    </>
  );
};
