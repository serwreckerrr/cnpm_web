import { Menu, Settings, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-primary">{t('appTitle')}</h1>
              <p className="text-sm text-muted-foreground">{t('university')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-secondary rounded-lg p-1">
              <button
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  language === 'vi'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>VI</span>
                </div>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>EN</span>
                </div>
              </button>
            </div>

            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
