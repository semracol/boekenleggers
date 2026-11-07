# Boekenleggers.be — boekenleggerwinkel

Werkmap: de hoofdmap van deze repository.

Bu klasör, hediye odaklı kitap ayracı mağazasının analizlerini ve GitHub Pages üzerinde yayınlanan statik web prototipini içerir.

## İçerik

- `pazar-ve-musteri-analizi.md` — pazar, rakip ve müşteri analizi
- `etsy-fotograf-analizi.md` — mevcut Etsy görselleri üzerinden uygun ürün ve stil analizi
- `etsy-kaligrafi-analizi.md` — Etsy benzeri fiyat aralığı ve marka konumlandırması
- `web-tasarim-onerileri.md` — tasarım yönü ve görsel yaklaşım notları
- `site-guncelleme.md` — mağaza güncellemeleri, yayın geçmişi ve yayına çıkış kontrol listesi
- `taslaklar/mockup-1.html` — seçilen tasarım yönü, daha canlı ve pastel bir versiyon
- `index.html` — responsive mağaza, ürün kartları, sepet ve çerez arayüzü
- `styles.css` — ana tasarım, animasyonlar ve mobile-first stiller
- `redesign.css` — nieuwe papier-en-inktstijl en interactieve boekenleggerrail
- `script.js` — sepet, ücretsiz kargo eşiği ve interface animasyonları
- `consent.js` — çerez tercihleri ve açık onaya bağlı opsiyonel script yükleme kapısı
- `privacy.html`, `cookies.html`, `voorwaarden.html`, `herroeping.html`, `verzending-retour.html`, `juridische-info.html` — Nederlandstalige juridische pagina's
- `legal.css` — juridische pagina's
- `robots.txt`, `sitemap.xml` — zoekmachine-instellingen
- `assets/logo.svg`, `assets/logo-mark.svg`, `assets/logo-mark-mono.svg`, `assets/favicon.svg` — logo en favicon
- `assets/fonts/` — lokaal gehoste Baloo 2- en Inter-lettertypen met OFL-licenties
- `assets/products/` — de vier bestaande productfoto's en 78 extra boekenleggerontwerpen uit `ayraclar_ornek`
- WhatsApp-contactknop op de winkel- en juridische pagina's, gekoppeld aan `+32 465 75 82 40`

## Seçilen tasarım yönü

Deze versie combineert een warme papierkleur met diepe inktkleuren, productillustraties en een interactieve rail die de boekenleggers centraal stelt:

- warme papier- en inktkleuren met accenten uit de productillustraties
- een interactieve, responsieve rail met vier uitgelichte ontwerpen en een doorzoekbare catalogus met alle 82 ontwerpen
- elk ontwerp kost €4,50; de 78 nieuw toegevoegde afbeeldingen staan lokaal onder `assets/products/BM-*.jpg`
- cadeaubox voor vijf boekenleggers: €22,50
- boekenleggerprijs: €4,50 per stuk
- verzending: €2,50 per bestelling bij 1–4 stuks; gratis vanaf 5 stuks
- verkoopgebied: momenteel België en Nederland

## Privacy, juridisch en checkout

- Optionele statistieken en marketing staan standaard uit. Het prototype bevat geen analytics- of marketingtags.
- Winkelmandje en cookievoorkeuren worden lokaal in de browser opgeslagen. Cookiekeuzes worden na zes maanden opnieuw gevraagd.
- De checkout is een demo: er wordt geen bestelling of betaling verwerkt.
- Juridische teksten zijn voorbereidingen en vormen geen vervanging van juridisch advies.
- GitHub Pages wordt vanuit de hoofdmap van de `main`-branch gepubliceerd. De winkel blijft een demo en is niet geschikt voor echte verkoop zolang bedrijfs- en betaalgegevens ontbreken.

### Nodig vóór publicatie/verkoop

- `[BEDRIJFSNAAM]` — officiële juridische naam van Kalem.
- `[ONDERNEMINGSNUMMER]` — actief KBO-ondernemingsnummer.
- `[BTW-NUMMER]` of `[BTW-VRIJSTELLING INDIEN VAN TOEPASSING]` — bevestigde btw-status en correcte prijs-/factuurvermelding.
- `[ADRES]` — officiële vestigings- en contactadres.
- `[E-MAIL]` en `[TELEFOON]` — werkende klant- en privacycontactgegevens.
- `[BETAALMETHODEN]` — gekozen betaalprovider(s) en juiste privacy-/betaalbeschrijvingen.
- `[LEVERTERMIJN]`, `[VERWERKINGSTERMIJN]`, `[LEVERTERMIJN PER LAND]` — bevestigde verzend- en bezorgtermijnen.
- `[RETOURADRES]` — adres voor herroepingen en retouren.
- Controleer de juridische pagina's met een Belgische boekhouder/juridisch adviseur en configureer pas daarna live betaling en bestelling.

## Yerel test

Aşağıdaki komutla yerelde çalıştırılabilir:

```bash
python3 -m http.server 8000
```

Sonra tarayıcıda şu adrese gidin:

`http://localhost:8000`

## GitHub Pages

Repo: [semracol/boekenleggers](https://github.com/semracol/boekenleggers)

GitHub Pages: [https://semracol.github.io/boekenleggers/](https://semracol.github.io/boekenleggers/)

GitHub Pages gebruikt de bestaande legacy-bron: de hoofdmap van de `main`-branch. Start voor lokaal testen de server vanuit de repository-root en open daarna `http://localhost:8000`.
