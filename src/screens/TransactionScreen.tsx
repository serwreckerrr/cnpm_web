import { useState } from 'react';
import { Receipt, Clock, DollarSign, CheckCircle, XCircle, AlertCircle, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TransactionsScreen() {
  const { t } = useLanguage();
  const [selectedBill, setSelectedBill] = useState<string | null>(null);

  const monthlyData = [
    { month: 'T1', amount: 180000, trips: 12 },
    { month: 'T2', amount: 210000, trips: 14 },
    { month: 'T3', amount: 195000, trips: 13 },
    { month: 'T4', amount: 225000, trips: 15 },
  ];

  const monthlyBills = [
    {
      id: '1',
      month: '4/2026',
      period: '01/04 - 11/04',
      trips: 8,
      amount: 120000,
      status: 'pending',
      dueDate: '15/04/2026',
    },
    {
      id: '2',
      month: '3/2026',
      period: '01/03 - 31/03',
      trips: 15,
      amount: 225000,
      status: 'paid',
      paidDate: '05/04/2026',
    },
    {
      id: '3',
      month: '2/2026',
      period: '01/02 - 28/02',
      trips: 14,
      amount: 210000,
      status: 'paid',
      paidDate: '05/03/2026',
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      date: '11/04/2026',
      time: '08:30 - 17:45',
      lot: t('lotA'),
      amount: 15000,
      duration: '9h 15m',
      studentId: '2312628',
    },
    {
      id: '2',
      date: '10/04/2026',
      time: '09:00 - 16:30',
      lot: t('lotB'),
      amount: 15000,
      duration: '7h 30m',
      studentId: '2312628',
    },
    {
      id: '3',
      date: '09/04/2026',
      time: '07:30 - 18:00',
      lot: t('lotD'),
      amount: 15000,
      duration: '10h 30m',
      studentId: '2312628',
    },
    {
      id: '4',
      date: '08/04/2026',
      time: '08:00 - 17:00',
      lot: t('lotA'),
      amount: 15000,
      duration: '9h 00m',
      studentId: '2312628',
    },
  ];

  const handlePayment = (billId: string) => {
    alert(`Chuyển hướng đến BKPay để thanh toán hóa đơn ${billId}`);
  };

  if (selectedBill) {
    const bill = monthlyBills.find(b => b.id === selectedBill);
    if (!bill) return null;

    return (
      <div className="pb-20">
        <div className="p-4 space-y-4">
          <button
            onClick={() => setSelectedBill(null)}
            className="text-primary text-sm flex items-center gap-2"
          >
            ← {t('monthlyBilling')}
          </button>

          <div className="bg-gradient-to-br from-primary to-[#0052a3] rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl mb-1">{bill.month}</h3>
                <p className="text-sm text-white/80">{bill.period}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                bill.status === 'paid' ? 'bg-[#10b981]' :
                bill.status === 'pending' ? 'bg-[#f59e0b]' :
                'bg-[#dc2626]'
              }`}>
                {bill.status === 'paid' ? t('paid') :
                 bill.status === 'pending' ? t('pending') :
                 t('failed')}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/80">{t('totalAmount')}</span>
                <span className="text-2xl font-medium">{bill.amount.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>{bill.trips} {t('trips')}</span>
                <span>≈ {Math.round(bill.amount / bill.trips).toLocaleString('vi-VN')}₫/{t('trips')}</span>
              </div>
            </div>

            {bill.status === 'pending' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{t('due')}: {bill.dueDate}</span>
              </div>
            )}

            {bill.status === 'paid' && (
              <div className="bg-[#10b981]/20 backdrop-blur-sm rounded-xl p-3 mb-4 flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Đã thanh toán: {bill.paidDate}</span>
              </div>
            )}

            {bill.status === 'pending' && (
              <button
                onClick={() => handlePayment(bill.id)}
                className="w-full bg-white text-primary rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-medium"
              >
                <CreditCard className="w-5 h-5" />
                <span>{t('payNow')} qua BKPay</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h4 className="text-sm">{t('parkingtripdetails')}</h4>
            </div>
            <div className="divide-y divide-border">
              {recentTransactions.slice(0, bill.trips).map((tx, idx) => (
                <div key={tx.id} className="px-4 py-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{tx.date}</p>
                      <p className="text-xs text-muted-foreground">{tx.lot} • {tx.duration}</p>
                    </div>
                    <p className="text-sm font-medium">{tx.amount.toLocaleString('vi-VN')}₫</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
              ))}
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
          <h2 className="text-lg mb-1">{t('myTransactions')}</h2>
          <p className="text-sm text-muted-foreground">MSSV: 2312628 - Phạm Đình Phong</p>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <h3 className="text-sm mb-3">{t('revenueTrend')}</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="amount" fill="#0066cc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-sm mb-3">{t('monthlyBilling')}</h3>
          <div className="space-y-3">
            {monthlyBills.map((bill) => (
              <button
                key={bill.id}
                onClick={() => setSelectedBill(bill.id)}
                className="w-full bg-white rounded-lg border border-border p-4 text-left hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1">{bill.month}</h4>
                    <p className="text-xs text-muted-foreground">{bill.period}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {bill.status === 'paid' && (
                      <div className="p-1.5 bg-[#d1fae5] rounded-full">
                        <CheckCircle className="w-4 h-4 text-[#10b981]" />
                      </div>
                    )}
                    {bill.status === 'pending' && (
                      <div className="p-1.5 bg-[#fef3c7] rounded-full">
                        <AlertCircle className="w-4 h-4 text-[#f59e0b]" />
                      </div>
                    )}
                    {bill.status === 'failed' && (
                      <div className="p-1.5 bg-[#fee2e2] rounded-full">
                        <XCircle className="w-4 h-4 text-[#dc2626]" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{bill.trips} {t('trips')}</span>
                  <span className="text-lg font-medium">{bill.amount.toLocaleString('vi-VN')}₫</span>
                </div>

                <div className={`px-2 py-1 rounded text-xs inline-block ${
                  bill.status === 'paid' ? 'bg-[#d1fae5] text-[#065f46]' :
                  bill.status === 'pending' ? 'bg-[#fef3c7] text-[#92400e]' :
                  'bg-[#fee2e2] text-[#991b1b]'
                }`}>
                  {bill.status === 'paid' ? `${t('paid')} - ${bill.paidDate}` :
                   bill.status === 'pending' ? `${t('pending')} - ${t('due')}: ${bill.dueDate}` :
                   t('failed')}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm mb-3">{t('recentTransactions')}</h3>
          <div className="bg-white rounded-lg border border-border overflow-hidden divide-y divide-border">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-4 py-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">{tx.date}</p>
                    <p className="text-xs text-muted-foreground">{tx.lot} • {tx.duration}</p>
                  </div>
                  <p className="text-sm font-medium text-primary">{tx.amount.toLocaleString('vi-VN')}₫</p>
                </div>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
