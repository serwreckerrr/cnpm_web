import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../../imports/hcmut.png';

export function MobileHeader() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="HCMUT" className="w-10 h-10" />
            <div>
              <h1 className="text-lg text-primary leading-tight">{t('appTitle')}</h1>
              <p className="text-xs text-muted-foreground">{t('university')}</p>
            </div>
          </div>

          <div className="flex bg-secondary rounded-lg p-0.5">
            <button
              onClick={() => setLanguage('vi')}
              className={`px-2 py-1 rounded-md text-xs transition-colors flex items-center gap-1 ${
                language === 'vi'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>VI</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md text-xs transition-colors flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
