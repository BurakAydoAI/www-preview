---
desc:
  - 4 hane dijital göstergeli
  - Ön paneldeki tuşlardan kolayca ayarlanabilir
  - 5A/60mV, CT20/30 akım trafosu/60mv veya 1A giriş
  - Seçilebilir 0/4-20mA, 0-10V veya 1-5V çıkış (sadece çıkış tipi 'A' olan cihazlarda)
  - 5...9999A arası programlanabilir skala
  - Alt ve üst sınırlar için çok fonksiyonlu alarm çıkışı
  - İzole RS-485 üzerinden ModBus RTU protokolü ile haberleşme özelliği
  - "Seçilebilir AC, DC veya True RMS ölçme özelliği"
  - Tuş kilitleme özelliği
  - CT20/CT30 akım trafosu (**ayrıca sipariş edilmelidir**)
  - EN Standartlarına göre CE markalı
short: 77x35 mm Ebatlı, Girişleri ve Çıkışları Opsiyonel Olarak Seçilebilen Ampermetre
spec:
  - Çevresel Özellikler
  - Ortam/Depolama Sıcaklığı: 0 ...+50 ºC / -25...+70º C
  - Bağıl Nem: "31 ºC'ye kadar %80, sonra lineer olarak azalıp 40 ºC'de %50'ye düşen nemde çalışır"
  - Koruma Sınıfı: "EN 60529 standardına göre IP20"
  - Yükseklik: En çok 2000m
  - Elektriksel Özellikler
  - Besleme Voltajı: "90-250V AC 50/60Hz veya 10-30V DC / 8-24V AC 50/60Hz"
  - Güç Tüketimi: 7VA
  - Bağlantı: Soketli klemens
  - Skala: |
      AC and RMS:  
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
              Akım trafosu ile DC ölçüm yapılmaz
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
  - Frekans Aralığı: "DC, 20Hz - 70Hz"
  - Çıkışlar
  - Alarm Çıkışı: "Röle: 250V AC, 8A (rezistif yük için), NO+NC"
  - Analog Çıkış: 0/4-20mA, ±%0,5 (yük direnci en çok 500ohm), 0-10V DC/1-5V DC, en çok 10mA, ±%0,5 (kısa devre koruması vardır)
  - Röle Ömrü: "Yüksüz 30.000.000 anahtarlama; 250V AC, 8A rezistif yükte 100.000 anahtarlama"
  - Kutu
  - Montaj Şekli: Sıkıştırılarak panoya yerleştirilir
  - Ebat: G77xY35xD61 mm
  - Ağırlık: Yaklaşık 250g (ambalajlı olarak)
  - Kutu Malzemeleri: Kendi kendine sönen plastikler kullanılmıştır
title: "EPA242"
weight: 0
manuals:
  - title: Kullanma Kılavuzu
    url: epa242.pdf
downloads:
  - title: ENDA Modbus Studio
    url: /automation/downloads/endamodbusstudio.zip
---
