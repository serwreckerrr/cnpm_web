import { Car, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DashboardScreen() {
  const { t } = useLanguage();

  const hourlyData = [
    { hour: '6h', vehicles: 120, revenue: 600},
    { hour: '7h', vehicles: 1446, revenue: 7230 },
    { hour: '8h', vehicles: 1334, revenue: 6670 },
    { hour: '9h', vehicles: 1043, revenue: 5215 },
    { hour: '10h', vehicles: 704, revenue: 3520 },
    { hour: '11h', vehicles: 867, revenue: 4335 },
    { hour: '12h', vehicles: 973, revenue: 4865 },
    { hour: '13h', vehicles: 1190, revenue: 5950 },
    { hour: '14h', vehicles: 1361, revenue: 6805 },
    { hour: '15h', vehicles: 796, revenue: 3980 },
    { hour: '16h', vehicles: 584, revenue: 2920 },
    { hour: '17h', vehicles: 310, revenue: 1550 },
  ];

  const parkingLots = [
    { id: 'A', name: t('lotA'), available: 127, total: 500, location: t('buildingH1') },
    { id: 'B', name: t('lotB'), available: 376, total: 500, location: t('buildingH1') },
    { id: 'C', name: t('lotC'), available: 0, total: 500, location: t('buildingH1') },
    { id: 'D', name: t('lotD'), available: 67, total: 300, location: t('buildingH6') },
  ];

  const totalAvailable = parkingLots.reduce((sum, lot) => sum + lot.available, 0);
  const totalCapacity = parkingLots.reduce((sum, lot) => sum + lot.total, 0);
  const totalOccupied = totalCapacity - totalAvailable;
  const occupancyRate = Math.round((totalOccupied / totalCapacity) * 100);

  return (
    <div className="pb-20">
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#d1fae5] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white rounded-lg">
                <Car className="w-5 h-5 text-[#10b981]" />
              </div>
              <span className="text-2xl text-[#10b981]">{totalAvailable}</span>
            </div>
            <p className="text-sm text-[#065f46]">{t('available')}</p>
            <p className="text-xs text-[#065f46]/70">{totalCapacity} {t('total')}</p>
          </div>

          <div className="bg-[#e8f2ff] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl text-primary">{occupancyRate}%</span>
            </div>
            <p className="text-sm text-primary">{t('occupancyRate')}</p>
            <p className="text-xs text-primary/70">{totalOccupied} {t('occupied')}</p>
          </div>

          <div className="bg-[#fef3c7] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white rounded-lg">
                <DollarSign className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <span className="text-2xl text-[#f59e0b]">53640000 VND</span>
            </div>
            <p className="text-sm text-[#92400e]">{t('revenue')}</p>
            <p className="text-xs text-[#92400e]/70">{t('todayStats')}</p>
          </div>

          <div className="bg-[#e0e7ff] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white rounded-lg">
                <BarChart3 className="w-5 h-5 text-[#6366f1]" />
              </div>
              <span className="text-2xl text-[#6366f1]">847</span>
            </div>
            <p className="text-sm text-[#3730a3]">{t('vehicles')}</p>
            <p className="text-xs text-[#3730a3]/70">{t('todayStats')}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm">{t('occupancyTrend')}</h3>
            <span className="text-xs text-muted-foreground">{t('hourly')}</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="vehicles"
                stroke="#0066cc"
                strokeWidth={2}
                dot={{ fill: '#0066cc', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm">{t('revenueTrend')} (kVND)</h3>
            <span className="text-xs text-muted-foreground">{t('hourly')}</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-sm mb-3">{t('realTimeStatus')}</h3>
          <div className="space-y-3">
            {parkingLots.map((lot) => {
              const rate = Math.round(((lot.total - lot.available) / lot.total) * 100);
              const statusColor =
                lot.available === 0 ? 'destructive' :
                rate > 80 ? 'warning' : 'success';

              return (
                <div key={lot.id} className="bg-white rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm text-primary">{lot.name}</h4>
                      <p className="text-xs text-muted-foreground">{lot.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      statusColor === 'success' ? 'bg-[#10b981] text-white' :
                      statusColor === 'warning' ? 'bg-[#f59e0b] text-white' :
                      'bg-[#dc2626] text-white'
                    }`}>
                      {lot.available === 0 ? t('full') : rate > 80 ? t('nearlyFull') : t('normal')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center">
                      <p className="text-xl text-[#10b981]">{lot.available}</p>
                      <p className="text-xs text-muted-foreground">{t('available')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl text-[#dc2626]">{lot.total - lot.available}</p>
                      <p className="text-xs text-muted-foreground">{t('occupied')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl">{lot.total}</p>
                      <p className="text-xs text-muted-foreground">{t('total')}</p>
                    </div>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        statusColor === 'success' ? 'bg-[#10b981]' :
                        statusColor === 'warning' ? 'bg-[#f59e0b]' :
                        'bg-[#dc2626]'
                      }`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
