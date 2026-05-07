import { Clock, User as UserIcon, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Transaction {
  id: string;
  user: string;
  lotName: string;
  entryTime: string;
  exitTime: string;
  amount: number;
  duration: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3>{t('recentTransactions')}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span>{t('user')}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm text-muted-foreground">{t('parkingLot')}</th>
              <th className="px-6 py-3 text-left text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t('entryTime')}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm text-muted-foreground">{t('exitTime')}</th>
              <th className="px-6 py-3 text-left text-sm text-muted-foreground">{t('duration')}</th>
              <th className="px-6 py-3 text-right text-sm text-muted-foreground">
                <div className="flex items-center justify-end gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{t('amount')}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm">{transaction.user}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-primary">{transaction.lotName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{transaction.entryTime}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{transaction.exitTime}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm">{transaction.duration}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm">
                    {transaction.amount.toLocaleString('vi-VN')} ₫
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
