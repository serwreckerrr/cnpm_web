import { useState } from 'react';
import { Settings as SettingsIcon, DollarSign, Database, Users, Bell, Globe, HelpCircle, LogOut, ChevronRight, Save, RefreshCw, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function SettingsScreen() {
  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState<'main' | 'pricing' | 'sync' | 'profile'>('main');
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<'success' | null>(null);

  const [pricingConfig, setPricingConfig] = useState({
    student: 15000,
    lecturer: 0,
    staff: 0,
    visitor: 20000,
  });

  const handleSyncData = () => {
    setSyncing(true);
    setSyncResult(null);

    setTimeout(() => {
      setSyncing(false);
      setSyncResult('success');

      setTimeout(() => {
        setSyncResult(null);
      }, 3000);
    }, 2500);
  };

  const handleSavePricing = () => {
    alert('Đã lưu cấu hình giá thành công!');
    setActiveSection('main');
  };

  if (activeSection === 'pricing') {
    return (
      <div className="pb-20">
        <div className="p-4 space-y-4">
          <button
            onClick={() => setActiveSection('main')}
            className="text-primary text-sm flex items-center gap-2"
          >
            ← {t('settings')}
          </button>

          <div>
            <h2 className="text-lg mb-1">{t('configurePricing')}</h2>
            <p className="text-sm text-muted-foreground">Cấu hình chính sách giá cho từng đối tượng</p>
          </div>

          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="text-sm">Giá gửi xe theo đối tượng</h3>
            </div>

            <div className="divide-y divide-border">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{t('student')}</p>
                    <p className="text-xs text-muted-foreground">Sinh viên, học viên, nghiên cứu sinh</p>
                  </div>
                  <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    Định kỳ
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pricingConfig.student}
                    onChange={(e) => setPricingConfig({ ...pricingConfig, student: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                    step="1000"
                  />
                  <span className="text-sm text-muted-foreground">₫/ngày</span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{t('lecturer')}</p>
                    <p className="text-xs text-muted-foreground">Giảng viên</p>
                  </div>
                  <div className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded text-xs">
                    Miễn phí
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pricingConfig.lecturer}
                    onChange={(e) => setPricingConfig({ ...pricingConfig, lecturer: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                    step="1000"
                  />
                  <span className="text-sm text-muted-foreground">₫/ngày</span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{t('staff')}</p>
                    <p className="text-xs text-muted-foreground">Cán bộ, nhân viên</p>
                  </div>
                  <div className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded text-xs">
                    Miễn phí
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pricingConfig.staff}
                    onChange={(e) => setPricingConfig({ ...pricingConfig, staff: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                    step="1000"
                  />
                  <span className="text-sm text-muted-foreground">₫/ngày</span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{t('visitor')}</p>
                    <p className="text-xs text-muted-foreground">Khách vãng lai</p>
                  </div>
                  <div className="px-2 py-1 bg-[#f59e0b]/10 text-[#f59e0b] rounded text-xs">
                    Theo giờ
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pricingConfig.visitor}
                    onChange={(e) => setPricingConfig({ ...pricingConfig, visitor: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                    step="1000"
                  />
                  <span className="text-sm text-muted-foreground">₫/giờ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fef3c7] border border-[#f59e0b]/20 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 text-[#f59e0b] flex-shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-sm text-[#92400e]">
                <p className="font-medium mb-1">Lưu ý</p>
                <p className="text-xs">Thay đổi chính sách giá sẽ được áp dụng từ chu kỳ thanh toán tiếp theo. Chu kỳ hiện tại vẫn giữ nguyên mức giá cũ.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSavePricing}
            className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 flex items-center justify-center gap-2 font-medium"
          >
            <Save className="w-5 h-5" />
            <span>Lưu cấu hình</span>
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'sync') {
    return (
      <div className="pb-20">
        <div className="p-4 space-y-4">
          <button
            onClick={() => setActiveSection('main')}
            className="text-primary text-sm flex items-center gap-2"
          >
            ← {t('settings')}
          </button>

          <div>
            <h2 className="text-lg mb-1">Đồng bộ dữ liệu</h2>
            <p className="text-sm text-muted-foreground">Đồng bộ thông tin từ HCMUT_DATACORE</p>
          </div>

          <div className="bg-gradient-to-br from-primary to-[#0052a3] rounded-2xl p-6 text-white">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-lg mb-1">HCMUT_DATACORE</h3>
              <p className="text-sm text-white/80">Hệ thống dữ liệu trung tâm</p>
            </div>

            {syncing && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center mb-4">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm">Đang đồng bộ dữ liệu...</p>
              </div>
            )}

            {syncResult === 'success' && (
              <div className="bg-[#10b981] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <p className="font-medium">Đồng bộ thành công!</p>
                    <p className="text-sm text-white/90">Đã cập nhật 2,847 bản ghi</p>
                  </div>
                </div>
              </div>
            )}

            {!syncing && !syncResult && (
              <button
                onClick={handleSyncData}
                className="w-full bg-white text-primary rounded-xl px-4 py-4 flex items-center justify-center gap-2 font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Đồng bộ ngay</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="text-sm">Lịch sử đồng bộ</h3>
            </div>

            <div className="divide-y divide-border">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">11/04/2026 08:00</p>
                  <div className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded text-xs">
                    Thành công
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">2,847 bản ghi • Tự động</p>
              </div>

              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">10/04/2026 08:00</p>
                  <div className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded text-xs">
                    Thành công
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">2,845 bản ghi • Tự động</p>
              </div>

              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">09/04/2026 08:00</p>
                  <div className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded text-xs">
                    Thành công
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">2,843 bản ghi • Tự động</p>
              </div>
            </div>
          </div>

          <div className="bg-[#e8f2ff] border border-primary/20 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 text-primary flex-shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-sm text-primary">
                <p className="font-medium mb-1">Chế độ chỉ đọc</p>
                <p className="text-xs">Hệ thống chỉ có quyền đọc dữ liệu từ DATACORE. Không thể chỉnh sửa thông tin người dùng.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'profile') {
    return (
      <div className="pb-20">
        <div className="p-4 space-y-4">
          <button
            onClick={() => setActiveSection('main')}
            className="text-primary text-sm flex items-center gap-2"
          >
            ← {t('settings')}
          </button>

          <div className="bg-gradient-to-br from-primary to-[#0052a3] rounded-2xl p-6 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-medium">
              NVA
            </div>
            <h3 className="text-xl mb-1">Phạm Đình Phong</h3>
            <p className="text-sm text-white/80 mb-1">2312628</p>
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
              {t('student')}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border overflow-hidden divide-y divide-border">
            <div className="px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">Họ tên</p>
              <p className="text-sm">Phạm Đình Phong</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">MSSV</p>
              <p className="text-sm">2312628</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">Khoa</p>
              <p className="text-sm">Khoa Khoa học & Kỹ thuật Máy tính</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm">phong.phamdinh@hcmut.edu.vn</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">Tài khoản BKPay</p>
              <p className="text-sm text-[#10b981]">Đã liên kết</p>
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
          <h2 className="text-lg mb-1">{t('settings')}</h2>
          <p className="text-sm text-muted-foreground">Cấu hình và quản trị hệ thống</p>
        </div>

        <div className="bg-white rounded-lg border border-border overflow-hidden divide-y divide-border">
          <button
            onClick={() => setActiveSection('profile')}
            className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{t('profile')}</p>
              <p className="text-xs text-muted-foreground">Thông tin cá nhân</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setActiveSection('pricing')}
            className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
          >
            <div className="w-10 h-10 bg-[#f59e0b]/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{t('configurePricing')}</p>
              <p className="text-xs text-muted-foreground">Chính sách giá gửi xe</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setActiveSection('sync')}
            className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">Đồng bộ dữ liệu</p>
              <p className="text-xs text-muted-foreground">HCMUT_DATACORE</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-border overflow-hidden divide-y divide-border">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t('language')}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'vi' ? 'Tiếng Việt' : 'English'}
                  </p>
                </div>
              </div>
              <div className="flex bg-muted rounded-lg p-0.5">
                <button
                  onClick={() => setLanguage('vi')}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    language === 'vi' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  VI
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{t('notifications')}</p>
              <p className="text-xs text-muted-foreground">Quản lý thông báo</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{t('help')}</p>
              <p className="text-xs text-muted-foreground">Hướng dẫn sử dụng</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <button className="w-full bg-white border border-[#dc2626]/20 text-[#dc2626] rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-[#fee2e2] transition-colors">
          <LogOut className="w-5 h-5" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}
