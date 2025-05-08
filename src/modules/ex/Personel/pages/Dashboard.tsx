import React from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";

function Card({ title, value, color, onClick }) {
    return (
        <div
            className={`${color} rounded-xl shadow-md p-4 text-center cursor-pointer hover:scale-105 transition-transform`}
      onClick={onClick}
    >
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3 border-b pb-1 text-gray-800">{title}</h2>
      {children}
    </section>
  );
}

export default function Dashboard() {
  const { data, isLoading } = useDashboard();
  const [showBirimler, setShowBirimler] = React.useState(false);
  const navigate = useNavigate();

  if (isLoading || !data) {
    return <div className="p-4 text-gray-600">Yükleniyor...</div>;
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Personel Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Toplam Personel" value={data.toplam_personel} color="bg-blue-100" />
        <Card title="Aktif Personel" value={data.aktif_personel} color="bg-green-100" onClick={() => navigate("/personel/aktif")} />
        <Card title="Ayrılan Personel" value={data.ayrilan_personel} color="bg-red-100" onClick={() => navigate("/personel/ayrilan")} />
      </div>

      <section>
        <h2
          onClick={() => setShowBirimler(!showBirimler)}
          className="text-xl font-semibold border-b pb-2 text-gray-800 cursor-pointer flex justify-between items-center hover:text-blue-600 transition-colors"
        >
          📁 Birimlere Göre Dağılım
          <span className={`transform transition-transform \${showBirimler ? "rotate-180" : ""}`}>▼</span>
        </h2>
        {showBirimler && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(data.birimler ?? {}).map(([birim, stats]) => (
              <div key={birim} className="p-4 bg-white rounded-xl shadow text-center">
                <h3 className="text-md font-semibold text-gray-700">{birim}</h3>
                <p className="text-sm text-green-600 font-semibold">Aktif: {stats.aktif}</p>
                <p className="text-sm text-red-500 font-semibold">Ayrılan: {stats.ayrilan}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Section title="🎂 Bugün Doğanlar">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(data.dogum_gunu_olanlar) && data.dogum_gunu_olanlar.length > 0 ? (
            data.dogum_gunu_olanlar.map((p) => (
              <div key={p.id} className="p-4 bg-white rounded-xl shadow text-center">
                <h3 className="text-lg font-medium">{p.adi} {p.soyadi}</h3>
                <p className="text-sm text-indigo-500 font-semibold">🎉 İyi ki doğdun!</p>
              </div>
            ))
          ) : (
            <div className="p-4 bg-white rounded-xl shadow text-center text-gray-500">
              Bugün doğum günü olan personel yok.
            </div>
          )}
        </div>
      </Section>

      <Section title="🗓 İzinden Dönmesi Gerekenler">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["bugun", "yarin", "haftaya"].map((zaman) => (
            <div key={zaman} className="p-4 bg-white rounded-xl shadow">
              <h4 className="text-md font-semibold text-gray-600 capitalize mb-2">
                {zaman === "bugun" ? "Bugün" : zaman === "yarin" ? "Yarın" : "Haftaya"} dönenler
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {data.izinden_donenler?.[zaman]?.length > 0 ? (
                  data.izinden_donenler[zaman].map((p) => (
                    <div key={p.id} className="p-2 bg-yellow-100 rounded-lg text-center">
                      <h3 className="text-lg font-medium">{p.adi} {p.soyadi}</h3>
                      <p className="text-sm text-gray-700">İzinden dönüyor</p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Personel yok.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="🩸 Kan Grubu Dağılımı">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(data.kan_grubu_dagilimi ?? {}).map(([kan, sayi]) => (
            <div key={kan} className="p-4 bg-red-50 rounded-xl shadow text-center">
              <h3 className="text-md font-semibold text-gray-800">{kan}</h3>
              <p className="text-xl font-bold text-red-600">{sayi}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}