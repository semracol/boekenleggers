# Boekenleggers.be — boekenleggerwinkel

Çalışma alanı: `/Users/semra/Desktop/kitap-ayraci-git`

Bu klasör, hediye odaklı kitap ayracı mağazasının analizlerini ve GitHub Pages üzerinde yayınlanan statik web prototipini içerir.

## İçerik

- `pazar-ve-musteri-analizi.md` — pazar, rakip ve müşteri analizi
- `etsy-fotograf-analizi.md` — mevcut Etsy görselleri üzerinden uygun ürün ve stil analizi
- `etsy-kaligrafi-analizi.md` — Etsy benzeri fiyat aralığı ve marka konumlandırması
- `web-tasarim-onerileri.md` — tasarım yönü ve görsel yaklaşım notları
- `site-guncelleme.md` — yayınlanan site, ürün fotoğrafları, fiyatlar ve mevcut sınırlar
- `taslaklar/mockup-1.html` — seçilen tasarım yönü, daha canlı ve pastel bir versiyon
- `index.html` — çalışır storefront prototipi
- `styles.css` — ana tasarım ve responsive stiller
- `script.js` — mini sepete ekleme davranışı
- `assets/products/` — Etsy klasöründen seçilen dört ürün fotoğrafı

## Seçilen tasarım yönü

Bu sürüm, soğuk lüks değil, sıcak, neşeli ve hediye-gibi hissettiren bir mağaza yaklaşımını benimser:

- pastel arka planlar
- neşeli renkler
- hediye torbası / kutu hissi
- “kitap okuma anı” ve “hediye” odaklı içerik
- kitap ayracı fiyatı: adet başına en fazla €4,50
- kargo: sipariş başına yaklaşık €2,50
- satış bölgesi: şimdilik sadece Belçika ve Hollanda

## Yerel test

Aşağıdaki komutla yerelde çalıştırılabilir:

```bash
cd /Users/semra/Desktop/kitap-ayraci-git
python3 -m http.server 8000
```

Sonra tarayıcıda şu adrese gidin:

`http://localhost:8000`

## GitHub

Repo: [semracol/boekenleggers](https://github.com/semracol/boekenleggers)

GitHub Pages: [https://semracol.github.io/boekenleggers/](https://semracol.github.io/boekenleggers/)

Sepet şu an yalnızca arayüz demosudur; ödeme ve sipariş tamamlama entegrasyonu henüz yoktur.
