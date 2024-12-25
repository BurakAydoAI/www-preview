---
desc:
  - 4 hane dijital göstergeli
  - Ön paneldeki tuşlardan kolayca ayarlanabilir
  - 5A/60mV, CT20/30 akım trafosu/60mV veya 1A giriş
  - Seçilebilir AC, DC veya True RMS ölçme özelliği
  - 5A ile 9999A arası programlanabilir skala
  - Seçilebilir 0-20mA, 4-20mA, 0-10V veya 1-5V analog çıkış
  - Giriş, çıkış ve besleme arası üç yollu izolasyon
  - İzole ModBus RTU protokolü ile haberleşme
  - Tuş kilidi özelliği
  - Ray montajlı
  - Soketli klemens bağlantı
  - EN standartlarına göre CE markalı
short:  Seçilebilir Akım Trafo veya Şönt Girişli, Programlanabilir Akım Çevirici
spec:
  - Çevresel Özellikler
  - Çalışma/Depolama Sıcaklığı: 0...50 ºC / -25...70 ºC
  - Bağıl Nem: 31 ºC'ye kadar %80, sonra lineer olarak azalıp 40 ºC'de %50'ye düşen nemde çalışır
  - Koruma Sınıfı: EN 60529 standardına göre IP20
  - Yükseklik: En çok 2000m
  - Elektriksel Özellikler
  - Giriş Tipi: |
      ECCCC-xV için 5A veya 60mV
      ECCC-CT-xV için CT20/CT30 akım trafosu veya 60mV
      ECCC-X1-xV için 1A
  - Skala: |
         AC ve RMS:  
                 Giriş tipi 5A/60mV: 0...9999A (c.tr.r parametresi ile belirlenir)
                 Ör: c.tr.r=5 için skala 0...5A
                 Giriş tipi CT20/30 veya 60mV: 
                 itYP=Ct20 ise 0...300A (tUrn parametresi ile belirlenir)
                 Ör: tUrn=1 için skala 0...300A
                 itYP=Ct30 ise 0...120A (tUrn parametresi ile belirlenir)
                 Ör: tUrn=1 için skala 0...120A
                 Giriş tipi 1A: 0...9999A (c.tr.r parametresi ile belirlenir)
                 Ör: c.tr.r=1 için skala 0...1A		
         DC:  
                 Giriş tipi 5A/60mV: -999...9999A (c.tr.r parametresi ile belirlenir)
                 Ör: c.tr.r=5 için skala -5...5A
                 Giriş tipi CT20/30 veya 60mV: 
                 Akım trafosu ile DC ölçüm yapılamaz
                 itYP=SHnt için skala -999..9999A (c.tr.r parametresi ile belirlenir)
                 Ör: c.tr.r=5 için skala -5...5A
                 Giriş tipi 1A : -999...9999A (c.tr.r parametresi ile belirlenir)
                 Ör: c.tr.r=1 için skala -1...1A
  - Duyarlılık: 0.002A x c.tr.r (Örneğin c.tr.r=5 için duyarlılık 0.01A)
  - Doğruluk: |
         AC: ±%1 (tam skalanın) (Kare dalga için ±%2)
         DC: ±%1 (tam skalanın)
         RMS: ±%1 (tam skalanın) (Kare dalga için ±%2)
  - Giriş Aralığı: |
         Giriş tipi 60mV ise -60mV...60mV (50V üzeri gerilimlerden cihazda hasar oluşur)
         Giriş tipi 1A ise -1A... 1A (2A ve üzeri gerilimlerde cihazda hasar oluşur)
         Giriş tipi 5A ise -5A...5A (10A ve üzeri gerilimlerde cihazda hasar oluşur)
         Giriş tipi CT20/30 ise 0...150mA
  - Giriş Empedansı: |
         60mV giriş için 20kohm
         1A giriş için 90mohm
         5A giriş için 12mohm
         CT20/CT30 giriş için 600mohm
  - Frekans Aralığı: 'DC, 20Hz - 70Hz'
  - Besleme Voltajı: |
      ECCC-UV için : 90-250V AC, 50/60Hz
      ECCC-LV için : 10-30V DC/8-24V AC, 50/60Hz
  - Güç Tüketimi: 7VA
  - Çıkışlar: |
      mA: 0-20mA DC veya 4-20mA DC, % ±0,5 (yük direnci en çok 500ohm)
      V: 0-10V DC veya 1-5V DC, en çok 10mA, % ±0,5 (kısa devre koruması vardır)
  - Bağlantı: Soketli klemens
  - Kutu
  - Kutu Şekli: TH 35 tipi raya monte edilir
  - Ebat: G25xY97xD115 mm
  - Ağırlık: Yaklaşık 150g (ambalajlı olarak)
  - Kutu Malzemeleri: Kendi kendine sönen plastikler kullanılmıştır
title: "ECCC411"
weight: -1
manuals:
  - title: Kullanma Kılavuzu
    url: eccc411.pdf
downloads:
  - title: ENDA Modbus Studio
    url: /automation/downloads/endamodbusstudio.zip
---
