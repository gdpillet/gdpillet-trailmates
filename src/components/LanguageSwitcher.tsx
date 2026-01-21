import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/locales';

// Square flag icons as inline SVGs
const FlagIcon = ({ code, className = "" }: { code: Language; className?: string }) => {
  const flags: Record<Language, React.ReactNode> = {
    en: (
      <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
        <rect width="60" height="40" fill="#012169"/>
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" clipPath="polygon(30 0, 30 20, 60 20, 60 0, 30 0)"/>
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6"/>
      </svg>
    ),
    fr: (
      <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
        <rect width="20" height="40" fill="#002395"/>
        <rect x="20" width="20" height="40" fill="#fff"/>
        <rect x="40" width="20" height="40" fill="#ED2939"/>
      </svg>
    ),
    it: (
      <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
        <rect width="20" height="40" fill="#009246"/>
        <rect x="20" width="20" height="40" fill="#fff"/>
        <rect x="40" width="20" height="40" fill="#CE2B37"/>
      </svg>
    ),
    es: (
      <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
        <rect width="60" height="10" fill="#AA151B"/>
        <rect y="10" width="60" height="20" fill="#F1BF00"/>
        <rect y="30" width="60" height="10" fill="#AA151B"/>
      </svg>
    ),
  };

  return <>{flags[code]}</>;
};

const LanguageSwitcher = () => {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 px-2"
          aria-label="Select language"
        >
          <FlagIcon code={language} className="w-5 h-4 rounded-sm border border-border" />
          <span className="hidden sm:inline text-sm">{languages.find(l => l.code === language)?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={`flex items-center gap-3 cursor-pointer ${language === lang.code ? 'bg-accent' : ''}`}
          >
            <FlagIcon code={lang.code as Language} className="w-5 h-4 rounded-sm border border-border" />
            <span>{lang.nativeName}</span>
            <span className="text-muted-foreground text-sm">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
