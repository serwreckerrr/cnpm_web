import { useState } from 'react';
import { CreditCard, MapPin, ArrowRight, ArrowLeft, CheckCircle, XCircle, Ticket, Printer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ParkingScreen() {
  const { t } = useLanguage();
  const [activeAction, setActiveAction] = useState<'entry' | 'exit' | 'temp' | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null);
  const [selectedLot, setSelectedLot] = useState('A');

  const parkingLots = [
    { id: 'A', name: t('lotA'), available: 127, total: 500 },
    { id: 'B', name: t('lotB'), available: 376, total: 500 },
    { id: 'C', name: t('lotC'), available: 0, total: 500 },
    { id: 'D', name: t('lotD'), available: 67, total: 300 },
  ];

  const handleScan = () => {
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const lot = parkingLots.find(l => l.id === selectedLot);
      if (activeAction === 'entry' && lot && lot.available > 0) {
        setScanResult('success');
      } else if (activeAction === 'entry' && lot && lot.available === 0) {
        setScanResult('error');
      } else if (activeAction === 'exit') {
        setScanResult('success');
      } else {
        setScanResult('error');
      }
      setScanning(false);
    }, 2000);
  };

  const handleIssueTicket = () => {
    setActiveAction('temp');
  };

  if (activeAction === 'temp') {
    return (
      <div className="pb-20">
        <div className="p-4 space-y-4">
          <button
            onClick={() => setActiveAction(null)}
            className="text-primary text-sm flex items-center gap-2"
          >
            ← {t('selectAction')}
          </button>

          <div className="bg-white rounded-lg border-2 border-dashed border-primary p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-primary mb-1">{t('temporaryTicket')}</h3>
              <p className="text-sm text-muted-foreground">{t('issueTicket')}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">{t('ticketNumber')}</p>
                <p className="text-lg">TEMP-2026-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">{t('issueTime')}</p>
                <p className="text-lg">{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">{t('parkingLot')}</p>
                <select
                  value={selectedLot}
                  onChange={(e) => setSelectedLot(e.target.value)}
                  className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {parkingLots.filter(l => l.available > 0).map(lot => (
                    <option key={lot.id} value={lot.id}>
                      {lot.name} - {lot.available} {t('available')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">{t('validUntil')}</p>
                <p className="text-lg">24 {t('hourly')}</p>
              </div>
            </div>

            <button
              className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 flex items-center justify-center gap-2"
              onClick={() => {
                alert(t('printTicket'));
                setActiveAction(null);
              }}
            >
              <Printer className="w-5 h-5" />
              <span>{t('printTicket')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeAction) {
    return (
      <div className="pb-20">
        <div className="p-4 space-y-4">
          <button
            onClick={() => {
              setActiveAction(null);
              setScanResult(null);
              setScanning(false);
            }}
            className="text-primary text-sm flex items-center gap-2"
          >
            ← {t('selectAction')}
          </button>

          <div className="bg-gradient-to-br from-primary to-[#0052a3] rounded-2xl p-6 text-white">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                {activeAction === 'entry' ? (
                  <ArrowRight className="w-10 h-10" />
                ) : (
                  <ArrowLeft className="w-10 h-10" />
                )}
              </div>
              <h3 className="text-xl mb-2">
                {activeAction === 'entry' ? t('enterNow') : t('exitNow')}
              </h3>
              <p className="text-sm text-white/80">{t('scanCardEntry')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <p className="text-xs text-white/70 mb-2">{t('selectLot')}</p>
              <select
                value={selectedLot}
                onChange={(e) => setSelectedLot(e.target.value)}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white"
              >
                {parkingLots.map(lot => (
                  <option key={lot.id} value={lot.id} className="text-foreground">
                    {lot.name} - {lot.available} {t('available')}
                  </option>
                ))}
              </select>
            </div>

            {scanning && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm">Đang xác thực...</p>
              </div>
            )}

            {scanResult === 'success' && (
              <div className="bg-[#10b981] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <p className="font-medium">{t('success')}!</p>
                    <p className="text-sm text-white/90">
                      {activeAction === 'entry' ? t('gateOpening') : 'Tính phí: 15,000₫'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {scanResult === 'error' && (
              <div className="bg-[#dc2626] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8" />
                  <div>
                    <p className="font-medium">{t('error')}!</p>
                    <p className="text-sm text-white/90">
                      {activeAction === 'entry' ? t('noSpaceAvailable') : t('cardRejected')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!scanning && !scanResult && (
              <button
                onClick={handleScan}
                className="w-full bg-white text-primary rounded-xl px-4 py-4 flex items-center justify-center gap-2 font-medium"
              >
                <CreditCard className="w-5 h-5" />
                <span>{t('scanCard')}</span>
              </button>
            )}

            {scanResult && (
              <button
                onClick={() => {
                  setScanResult(null);
                  setScanning(false);
                }}
                className="w-full bg-white/20 backdrop-blur-sm text-white rounded-xl px-4 py-3 border border-white/30"
              >
                Quét lại
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg border border-border p-4">
            <h4 className="text-sm mb-3">{t('ticketinfo')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('name')}:</span>
                <span>Phạm Đình Phong</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('studentId')}:</span>
                <span>2312628</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('role')}:</span>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">{t('student')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-lg mb-1">{t('parking')}</h2>
          <p className="text-sm text-muted-foreground">{t('scanCardEntry')}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => setActiveAction('entry')}
            className="bg-gradient-to-br from-primary to-[#0052a3] text-white rounded-xl p-6 text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <ArrowRight className="w-6 h-6" />
              </div>
              <MapPin className="w-5 h-5 text-white/70" />
            </div>
            <h3 className="text-lg mb-1">{t('enterNow')}</h3>
            <p className="text-sm text-white/80">{t('scantogoin')}</p>
          </button>

          <button
            onClick={() => setActiveAction('exit')}
            className="bg-gradient-to-br from-[#10b981] to-[#059669] text-white rounded-xl p-6 text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <ArrowLeft className="w-6 h-6" />
              </div>
              <MapPin className="w-5 h-5 text-white/70" />
            </div>
            <h3 className="text-lg mb-1">{t('exitNow')}</h3>
            <p className="text-sm text-white/80">{t('scantogoout')}</p>
          </button>

          <button
            onClick={handleIssueTicket}
            className="bg-white border-2 border-dashed border-primary text-primary rounded-xl p-6 text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg mb-1">{t('issueTemporaryTicket')}</h3>
            <p className="text-sm text-primary/70">{t('forguests')}</p>
          </button>
        </div>

        <div>
          <h3 className="text-sm mb-3">{t('realTimeStatus')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {parkingLots.map((lot) => (
              <div key={lot.id} className="bg-white rounded-lg border border-border p-3">
                <h4 className="text-sm text-primary mb-2">{lot.name}</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t('available')}</span>
                    <span className="text-[#10b981] font-medium">{lot.available}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t('total')}</span>
                    <span>{lot.total}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full ${
                        lot.available === 0 ? 'bg-[#dc2626]' :
                        ((lot.total - lot.available) / lot.total) > 0.8 ? 'bg-[#f59e0b]' :
                        'bg-[#10b981]'
                      }`}
                      style={{ width: `${((lot.total - lot.available) / lot.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
