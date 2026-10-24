# Boekenleggers.be — bookmark storefront prototype

Çalışma alanı: `/Users/semra/Desktop/kitap-ayraci-git`

Bu klasör, `boekenleggens.be` alanı için geliştirilen hediye odaklı kitap ayracı e-ticaret fikrinin hem analiz hem de canlı web prototipini içerir.

## İçerik

- `pazar-ve-musteri-analizi.md` — pazar, rakip ve müşteri analizi
- `etsy-fotograf-analizi.md` — mevcut Etsy görselleri üzerinden uygun ürün ve stil analizi
- `etsy-kaligrafi-analizi.md` — Etsy benzeri fiyat aralığı ve marka konumlandırması
- `web-tasarim-onerileri.md` — tasarım yönü ve görsel yaklaşım notları
- `taslaklar/mockup-1.html` — seçilen tasarım yönü, daha canlı ve pastel bir versiyon
- `index.html` — çalışır storefront prototipi
- `styles.css` — ana tasarım ve responsive stiller
- `script.js` — mini sepete ekleme davranışı

## Seçilen tasarım yönü

Bu sürüm, soğuk lüks değil, sıcak, neşeli ve hediye-gibi hissettiren bir mağaza yaklaşımını benimser:

- pastel arka planlar
- kahkaha gibi neşeli renkler
- hediye torbası / kutu hissi
- “kitap okuma anı” ve “hediye” odaklı içerik
- Etsy benzeri ürün fiyat aralığı: €8–€35

## Yerel test

Aşağıdaki komutla yerelde çalıştırılabilir:

```bash
cd /Users/semra/Desktop/kitap-ayraci-git
python3 -m http.server 8000
```

Sonra tarayıcıda şu adrese gidin:

`http://localhost:8000`

## GitHub

Bu klasör daha sonra GitHub `boekenleggers` reposuna push edilecek şekilde hazırlandı.
