import { Personel } from "../types";

export default function PersonelCard({ personel }: { personel: Personel }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold">{personel.adi} {personel.soyadi}</h3>
      <p className="text-sm text-gray-600">{personel.pozisyon} - {personel.birim}</p>
      <p className="text-sm mt-1">İşe Giriş: {personel.iseGirisTarihi}</p>
      <p className="text-sm">İzin: {personel.kullanilanIzin}/{personel.izinHakki} gün</p>
    </div>
  );
}