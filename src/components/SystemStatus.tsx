import { Activity, Wifi, Database, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function SystemStatus() {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3>{t('systemHealth')}</h3>
        <span className="flex items-center gap-2 text-sm text-[#10b981]">
          <CheckCircle className="w-4 h-4" />
          <span>{t('normal')}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 bg-[#d1fae5] rounded-lg">
          <div className="p-2 bg-white rounded-lg">
            <Wifi className="w-5 h-5 text-[#10b981]" />
          </div>
          <div>
            <p className="text-sm">{t('allSensorsOnline')}</p>
            <p className="text-xs text-muted-foreground">IoT Gateway</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#d1fae5] rounded-lg">
          <div className="p-2 bg-white rounded-lg">
            <Database className="w-5 h-5 text-[#10b981]" />
          </div>
          <div>
            <p className="text-sm">HCMUT_SSO</p>
            <p className="text-xs text-muted-foreground">Connected</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#d1fae5] rounded-lg">
          <div className="p-2 bg-white rounded-lg">
            <Activity className="w-5 h-5 text-[#10b981]" />
          </div>
          <div>
            <p className="text-sm">BKPay</p>
            <p className="text-xs text-muted-foreground">Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}
