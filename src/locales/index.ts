import en from './en.json';
import fr from './fr.json';
import it from './it.json';
import es from './es.json';

export type Language = 'en' | 'fr' | 'it' | 'es';

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

export const translations = {
  en,
  fr,
  it,
  es,
} as const;

export type TranslationKeys = typeof en;
