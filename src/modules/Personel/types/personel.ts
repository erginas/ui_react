export type PersonelFormData = {
    // ✅ Zorunlu Alanlar
    adi: string;
    soyadi: string;
    kk: number; // TC Kimlik No
    kts: Date; // Kayıt tarihi (default değer atanabilir)

    // 🟡 İsteğe Bağlı Alanlar (örnek olarak bazıları ekledim, hepsi istenirse eklenebilir)
    tc_kimlik_no?: number;
    sicil_no?: string;
    siralama_kodu?: number;
    cinsiyeti?: 'Erkek' | 'Kadın';
    dogum_tarihi?: Date;
    kadro_turu?: number;
    unvan_id?: number;
    brans_id?: number;
    gorev_id?: number;
    durum_id?: number;
    birim_id?: number;
    dis_kurum_id?: number;
    part_time?: number;
    part_time_tarihi?: Date;
    otomasyon_kod?: string;
    kisa_unvani?: string;
    ise_baslama_tarihi?: Date;
    cep_telefonu?: string;
    eposta?: string;
    ev_adresi1?: string;
    ev_adresi2?: string;
    ev_posta_kodu?: string;
    ev_telefonu?: string;
    acil_ulasilacak_kisi?: string;
    acil_ulasilacak_tel?: string;
    vergi_dairesi?: string;
    vergi_no?: string;
    baba_adi?: string;
    ana_adi?: string;
    dogum_yeri?: string;
    medeni_hal_kodu?: number;
    kimlik_kart_seri?: string;
    kimlik_kart_no?: string;
    kimlik_il_id?: number;
    kimlik_ilce_id?: number;
    kimlik_mahalle?: string;
    kimlik_verildigi_yer?: string;
    kimlik_verilis_tarihi?: Date;
    kan_grubu_id?: number;
    banka_id?: number;
    banka_hesap_no?: string;
    iban_no?: string;
    mezuniyet_tarihi?: Date;
    mezun_oldugu_okul?: string;
    sendika_id?: number;
    sendika_giris_tarihi?: Date;
    sendika_cikis_tarihi?: Date;
    web_parolasi?: string;
    webde_goster?: number;
    adres_tipi?: number;
    adres_kodu_seviyesi?: number;
    calisma_planinda_goster?: number;
    saramatik_resim_goster?: number;
    lios_kullanici?: string;
    lios_sifre?: string;
    butce_turu?: string;

    // ❗️Diğer tüm alanlar da buraya eklenebilir (isteğe bağlı olarak)
};