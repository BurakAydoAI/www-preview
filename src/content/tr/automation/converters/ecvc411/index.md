---
desc:
  - 4 hane dijital göstergeli
  - Ön paneldeki tuşlardan kolayca ayarlanabilir
  - 0-100V AC/DC ve 0-500V AC/DC giriş
  - Seçilebilir AC, DC veya True RMS ölçme özelliği
  - 1V ila 9999V arası pogramlanabilir skala
  - Seçilebilir 0-20mA, 4-20mA, 0-10V veya 1-5V analog çıkış
  - Giriş, çıkış ve besleme arası üç yollu izolasyon
  - İzole ModBus RTU protokolü ile haberleşme
  - Tuş kilidi özelliği
  - Soketli klemens bağlantı
  - EN standartlarına göre CE markalı
short: 0-100V AC/DC ve 0-500V AC/DC Girişli Gerilim Çevirici
spec:
  - Çevresel Özellikler
  - Çalışma/Depolama Sıcaklığı: 0...50 ºC / -25...70 ºC
  - Bağıl Nem: 31 ºC'ye kadar %80, sonra lineer olarak azalıp 40 ºC'de %50'ye düşen nemde çalışır
  - Koruma Sınıfı: EN 60529 standardına göre IP20
  - Yükseklik: En çok 2000m
  - Elektriksel Özellikler
  - Giriş Tipi: |
      itYP=u500 ise 0...500V AC/DC girişi, 0...500V AC/DC skala ile ölçüm için kullanılır
      itYP=u100 ise 0...100V AC/DC girişi, 0...100V AC/DC skala ile ölçüm için kullanılır
      itYP=utr.r ise 0-100V AC/DC girişi, utr.r parametresi ile skala belirlenerek gerilim trafosu ile ölçüm için kullanılır
  - Skala: |
         AC ve RMS:   
                 itYP=u500 ise 0...500V AC/DC
                 itYP=u100 ise 0...100V AC
                 itYP=utr.r ise -999...9999V AC/DC (utr.r parametresi ile belirlenir. Örneğin: utr.r=1000 için skala 0...1000V)	
         DC:  
                 ityP=u500 ise -500...500V DC
                 ityP=u100 ise -100...100V DC
                 ityP=utr.r ise -999...9999V DC (utr.r parametresi ile belirlenir. Örneğin: utr.r=1000 için skala -999...1000V)
  - Duyarlılık: 0.01V
  - Doğruluk: |
         AC: ±%1 (tam skalanın) (Kare dalga için ±%2)
         DC: ±%1 (tam skalanın)
         RMS: ±%1 (tam skalanın) (Kare dalga için ±%2)
  - Giriş Aralığı: |
         0-500V AC/DC giriş için ±1250V DC üzeri gerilimlerde cihazda hasar oluşur
         0-100V AC/DC giriş için ±250V DC üzeri gerilimlerde cihazda hasar oluşur
  - Giriş Empedansı: |
         0-500V giriş için 880kohm
         0-100V giriş için 177kohm
  - Frekans Aralığı: 'DC, 20Hz - 70Hz'
  - Besleme Voltajı: |
      ECVC411-UV için : 90-250V AC, 50/60Hz
      ECVC411-LV için : 10-30V DC/8-24V AC, 50/60Hz
  - Güç Tüketimi: 7VA
  - Çıkışlar: |
      mA: 0-20mA DC veya 4-20mA DC, % ±0,5 (yük direnci en çok 500ohm)
      V: 0-10V DC veya 1-5V DC, en çok 10mA, % ±0,5 (kısa devre koruması vardır)
  - Bağlantı: 2.5mm² soketli klemens
  - Kutu
  - Kutu Şekli: TH 35 tipi raya monte edilir
  - Ebat: G25xY97xD115 mm
  - Ağırlık: Yaklaşık 150g (ambalajlı olarak)
  - Kutu Malzemeleri: Kendi kendine sönen plastikler kullanılmıştır
title: "ECVC411"
weight: 1
manuals:
  - title: Kullanma Kılavuzu
    url: ecvc411.pdf
downloads:
  - title: ENDA Modbus Studio
    url: /automation/downloads/endamodbusstudio.zip

---
