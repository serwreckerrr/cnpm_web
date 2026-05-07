import { MapPin, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ParkingLotCardProps {
  id: string;
  name: string;
  location: string;
  available: number;
  total: number;
}

export function ParkingLotCard({ name, location, available, total }: ParkingLotCardProps) {
  const { t } = useLanguage();
  const occupancyRate = ((total - available) / total) * 100;

  const getStatusColor = () => {
    if (available === 0) return 'destructive';
    if (occupancyRate > 80) return 'warning';
    return 'success';
  };

  const getStatusText = () => {
    if (available === 0) return t('full');
    if (occupancyRate > 80) return t('nearlyFull');
    return t('normal');
  };

  const statusColor = getStatusColor();
  const statusColorClasses = {
    success: 'bg-[#10b981] text-white',
    warning: 'bg-[#f59e0b] text-white',
    destructive: 'bg-[#dc2626] text-white',
  };

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-primary mb-1">{name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColorClasses[statusColor]}`}>
            {getStatusText()}
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl text-[#10b981]">{available}</p>
              <p className="text-sm text-muted-foreground">{t('available')}</p>
            </div>
            <div>
              <p className="text-2xl text-[#dc2626]">{total - available}</p>
              <p className="text-sm text-muted-foreground">{t('occupied')}</p>
            </div>
            <div>
              <p className="text-2xl">{total}</p>
              <p className="text-sm text-muted-foreground">{t('total')}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">{t('occupancyRate')}</span>
              <span>{Math.round(occupancyRate)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  statusColor === 'success' ? 'bg-[#10b981]' :
                  statusColor === 'warning' ? 'bg-[#f59e0b]' :
                  'bg-[#dc2626]'
                }`}
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="w-full px-6 py-3 bg-secondary text-primary flex items-center justify-between hover:bg-[#d6e8ff] transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <span className="text-sm">{t('viewDetails')}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
