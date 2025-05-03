// src/common/components/Footer.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../theme';
import {useAuth} from "../../hooks/useAuth.tsx";

export const Footer: React.FC = () => {
  const location = useLocation();
  const { colors } = useTheme();
  const { user } = useAuth();

  // Kullanıcı adı için fallback
  const userName = user?.name ?? 'Konuk';

  // Zamanı state içinde tut
  const [now, setNow] = useState(() => new Date().toLocaleString());

  // IP adresini çek
  const [ip, setIp] = useState<string>('');
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('N/A'));
  }, []);

  // Her dakika zamanı güncelle
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Aktif modül bilgi
  const moduleName = location.pathname.split('/')[1] || 'app';
  const appVersion = import.meta.env.VITE_APP_VERSION ?? 'dev';
  const moduleVersion = import.meta.env[
    `VITE_${moduleName.toUpperCase()}_VERSION`
  ] ?? '1.0.0';

  return (
    <footer
      className="w-full p-4 text-xs md:text-sm bg-surface border-t flex flex-col md:flex-row justify-between text-muted"
      style={{
        backgroundColor: colors.surface,
        color: colors.muted,
      }}
    >
      <div className="flex flex-wrap gap-4">
        <span>Modül: <strong>{moduleName}</strong></span>
        <span>Uygulama Versiyonu: <strong>{appVersion}</strong></span>
        <span>Modül Versiyonu: <strong>{moduleVersion}</strong></span>
      </div>
      <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
        <span>Tarih/Saat: <strong>{now}</strong></span>
        <span>Kullanıcı: <strong>{userName}</strong></span>
        <span>IP: <strong>{ip}</strong></span>
      </div>
    </footer>
  );
};