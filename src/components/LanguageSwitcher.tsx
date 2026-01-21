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
      <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
        <clipPath id="uk-clip">
          <rect width="60" height="30"/>
        </clipPath>
        <g clipPath="url(#uk-clip)">
          <rect width="60" height="30" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="2"/>
          <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="2"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    ),
    fr: (
      <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
        <rect width="1" height="2" fill="#002395"/>
        <rect x="1" width="1" height="2" fill="#fff"/>
        <rect x="2" width="1" height="2" fill="#ED2939"/>
      </svg>
    ),
    it: (
      <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
        <rect width="1" height="2" fill="#009246"/>
        <rect x="1" width="1" height="2" fill="#fff"/>
        <rect x="2" width="1" height="2" fill="#CE2B37"/>
      </svg>
    ),
    es: (
      <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
        <rect width="3" height="0.5" fill="#AA151B"/>
        <rect y="0.5" width="3" height="1" fill="#F1BF00"/>
        <rect y="1.5" width="3" height="0.5" fill="#AA151B"/>
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
          <span className="w-5 h-4 rounded-[2px] overflow-hidden shadow-sm ring-1 ring-border/50 flex-shrink-0">
            <FlagIcon code={language} className="w-full h-full" />
          </span>
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
            <span className="w-5 h-4 rounded-[2px] overflow-hidden shadow-sm ring-1 ring-border/50 flex-shrink-0">
              <FlagIcon code={lang.code as Language} className="w-full h-full" />
            </span>
            <span>{lang.nativeName}</span>
            <span className="text-muted-foreground text-sm">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
