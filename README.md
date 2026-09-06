# EasyGo AI Explorer

EasyGo AI Mobile — Mərhələ 1: Mobile-first baza və Ana səhifə

Sıfırdan yeni EasyGo AI Mobile prototipi yarat.

Bu mərhələdə yalnız:

Mobile-first layihə bazası

Dizayn sistemi

Ana səhifə

Axtarış davranışı

Kəşf et funksiyasının ilkin görünüşü

Lokasiya və radius interfeysi

Mobil menyu

Yaxındakı məkanlar

Yardım ekranı

AZ/EN/RU dil sistemi

hazırlanmalıdır.

Məkan detalları, səyahət seçimləri, real Google məlumatları, real lokasiya, taksi inteqrasiyaları, istifadəçi hesabı və Super Admin panelini hələ yaratma. Onlar sonrakı mərhələlərdə ayrıca əlavə ediləcək.

1. Məhsulun məqsədi

Platformanın adı:

EasyGo AI

EasyGo AI yerli sakinlərə və turistlərə getmək istədikləri məkanı tapmağa, yaxınlıqdakı maraqlı yerləri kəşf etməyə və sonrakı mərhələdə həmin məkana uyğun nəqliyyat variantlarını müqayisə etməyə kömək edən ağıllı səyahət platformasıdır.

Sloqan:

AZ: “Vaxtını yolda yox, gedəcəyin yerdə keçir.”

EN: “Spend your time at the destination, not on the road.”

RU: «Проводи время в месте назначения, а не в дороге.»

2. Dizayn istiqaməti

Tətbiqi əvvəlcə mobil telefonlar üçün dizayn et.

Əsas mobil ölçülər:

360px

390px

412px

430px

Tablet və desktop görünüşləri də responsive olmalıdır, lakin əsas prioritet mobil istifadəyə verilməlidir.

Vizual istiqamət:

Google axtarış səhifəsi kimi sadə

Gemini giriş səhifəsi kimi sakit və minimalist

Müasir

İnsani

Aydın

Yüngül

Etibarlı

Şəhər və səyahət yönümlü

Səhifədə ağır xəritə, çoxsaylı panellər və informasiya sıxlığı yaratma.

İstifadəçinin diqqəti ilk olaraq “Hara gedirsən?” sualına yönəlməlidir.

3. Brandbook

Başlıqlar:

Manrope

Əsas mətn və interfeys:

Inter

Rənglər:

Primary: #355070

Primary hover: #283E57

Coral accent: #E56B6F

Yellow attention: #F6BD60

Page background: #F8FAFC

Warm background: #FFF8F2

Card background: #FFFFFF

Primary text: #172033

Alternative text: #2B2D42

Secondary text: #667085

Border: #E2E8F0

Success: #067647

Error: #B42318

Kartlarda:

16–24px radius

Açıq sərhəd

Yumşaq kölgə

Kifayət qədər boşluq

Aydın mətn iyerarxiyası

İstifadə etmə:

Futuristik neon

Kripto üslubu

Ağır gradientlər

Metal effektlər

Həddindən artıq animasiya

Oyunlaşdırılmış xal sistemi

Lazımsız dekorasiyalar

4. Ana səhifənin ümumi quruluşu

Ana səhifə tam ekran mobil tətbiq görünüşündə olsun.

Yuxarıdan aşağıya struktur:

EasyGo AI loqosu

Sağ yuxarıda hamburger menyu

Cari şəhər və lokasiya göstəricisi

Əsas sual

Axtarış paneli

Radius filtri

Kəşf et funksiyası

Yaxındakı məkanlar

Floating Yardım düyməsi

Mobil cihazda səhifə təbii şəkildə scroll edilə bilsin.

Desktop görünüşündə məzmun həddindən artıq genişlənməsin. Əsas məzmun mərkəzdə, rahat oxunan maksimum genişlikdə göstərilsin.

5. EasyGo AI loqosu

Loqo ekranın yuxarı orta hissəsində yerləşsin.

Loqo:

Kreativ

Canlı

Müasir

Sadə

Asan tanınan

olsun.

“EasyGo AI” wordmark-ı qorunsun.

Loqoda səyahəti ifadə edən kiçik vizual detal istifadə edilə bilər:

Marşrut nöqtəsi

Yumşaq hərəkət edən nöqtə

İstiqamət oxu

Məkan pini

Sadə yol xətti

Animasiya çox yüngül və sakit olsun. Səhifənin sürətinə mane olmasın.

prefers-reduced-motion aktiv olduqda animasiya dayandırılsın.

Loqonu futuristik və neon etmə.

6. Hamburger menyu

Səhifənin yuxarı sağ küncündə üç xətli hamburger menyu yerləşdir.

Düymənin toxunma sahəsi minimum 44x44px olsun.

Kliklədikdə sağ tərəfdən açılan drawer göstər.

Menyu elementləri:

Profil

Dil

Tənzimləmələr

Favorilər

Dəstək

Çıxış

Hər elementin yanında uyğun sadə ikon göstər.

Bu mərhələdə Profil, Tənzimləmələr, Favorilər və Dəstək klikləri sadə placeholder səhifə və ya bottom sheet aça bilər.

“Çıxış” düyməsinə kliklədikdə:

“Real istifadəçi hesabı bu prototipdə aktiv deyil.”

məlumat mesajı göstər.

Drawer:

Overlay üzərində açılsın

Kənara kliklədikdə bağlansın

Escape düyməsi ilə bağlansın

Fokus drawer daxilində qorunsun

Mobil və desktop görünüşdə işləsin

7. Dil sistemi

İlkin dillər:

AZ

EN

RU

Dil seçimi drawer daxilində açılsın.

Aktiv dil vizual olaraq fərqləndirilsin.

Dil dəyişdikdə Ana səhifədəki bütün görünən mətnlər dəyişsin:

Əsas sual

Axtarış placeholder-i

Düymələr

Radius filtri

Cari lokasiya

Yaxındakı məkanlar

Kəşf et paneli

Menyu

Yardım ekranı

Xəta və məlumat mesajları

Seçilmiş dili localStorage-da saxla.

Səhifə yeniləndikdə seçilmiş dil qorunsun.

Əsas mətnlər:

AZ:

Hara gedirsən?

Məkan axtar

Kəşf et

Yaxındakı məkanlar

Axtarış radiusu

Cari şəhər

Yardım

EN:

Where are you going?

Search for a place

Explore

Places nearby

Search radius

Current city

Help

RU:

Куда вы направляетесь?

Найти место

Исследовать

Места поблизости

Радиус поиска

Текущий город

Помощь

Tərcümələr təbii UX dilində olsun.

8. Cari şəhər göstəricisi

Əsas axtarışın yuxarısında və ya yaxınlığında kompakt lokasiya chip-i göstər.

Demo başlanğıc vəziyyəti:

Bakı, Azərbaycan

Chip daxilində:

Məkan pini ikonu

Şəhər və ölkə

Aşağı ox

olsun.

Kliklədikdə şəhər seçimi bottom sheet açılsın.

Demo şəhərlər:

Bakı, Azərbaycan

İstanbul, Türkiyə

Bratislava, Slovakiya

Vyana, Avstriya

Əlavə seçim:

Şəhəri manual daxil et

Cari mövqeyimi müəyyən et

Bu mərhələdə real IP və GPS inteqrasiyası qurma.

“Cari mövqeyimi müəyyən et” klikləndikdə demo mesaj göstər:

“Dəqiq lokasiya funksiyası növbəti mərhələdə aktiv ediləcək.”

Seçilmiş şəhəri localStorage-da saxla.

Şəhər dəyişdikdə Yaxındakı Məkanlar nümunələri də uyğun şəhərə dəyişsin.

9. Əsas sual

Loqonun altında, səhifənin əsas diqqət nöqtəsində böyük başlıq göstər:

AZ: Hara gedirsən?

EN: Where are you going?

RU: Куда вы направляетесь?

Altında qısa köməkçi mətn:

AZ:

“Getmək istədiyin məkanı yaz və uyğun yolu birlikdə tapaq.”

EN:

“Enter your destination and let’s find the right way together.”

RU:

«Укажите место назначения, и мы вместе найдём подходящий маршрут.»

10. Axtarış paneli

Səhifənin mərkəzində böyük, yumşaq radiuslu axtarış paneli yarat.

Axtarış sahəsinin görünən label-i əlçatanlıq üçün mövcud olsun.

Placeholder:

AZ: “Məkanın adını yaz”

EN: “Enter a place name”

RU: «Введите название места»

Axtarış panelinin sağ tərəfində Telegram göndərmə işarəsinə bənzəyən, sağa istiqamətlənmiş arrow/send düyməsi yerləşdir.

Bu düymə axtarışı başlatmalıdır.

Desktop klaviaturasında Enter düyməsi də eyni əməliyyatı yerinə yetirsin.

Axtarış sahəsi boş olduqda düyməyə kliklənərsə:

AZ: “Getmək istədiyin məkanı daxil et.”

EN: “Enter the place you want to visit.”

RU: «Введите место, которое хотите посетить.»

xəta mesajı göstər.

Demo axtarış təklifləri

İstifadəçi yazmağa başladıqda axtarış sahəsinin altında autocomplete paneli açılsın.

Bakı üçün nümunələr:

Alov Qüllələri

Dağüstü Park

İçərişəhər

Qız Qalası

Heydər Əliyev Mərkəzi

Bakı Bulvarı

Azərbaycan Xalça Muzeyi

Bakı Zooloji Parkı

Hər təklifdə göstər:

Kiçik şəkil

Məkan adı

Kateqoriya

Şəhər

Reytinq

İstifadəçi təklif seçdikdə və ya göndərmə düyməsinə basdıqda sadə placeholder Məkan Detalları səhifəsinə keç.

Route nümunəsi:

/place/:slug

Məkan Detalları səhifəsini bu mərhələdə tam hazırlama. Sadəcə:

Seçilmiş məkanın adı

Placeholder şəkil

“Məkan detalları növbəti mərhələdə əlavə ediləcək” mesajı

Ana səhifəyə qayıt düyməsi

göstər.

Heç bir düymə işləməyən vəziyyətdə qalmasın.

11. Radius filtri

Axtarış panelinin yanında və ya dərhal altında “Axtarış radiusu” filtri göstər.

Seçimlər:

1 km

3 km

5 km

10 km

25 km

50 km

100 km

Mobil görünüşdə horizontal scroll chip-ləri və ya kompakt dropdown istifadə edilə bilər.

Default:

5 km

Aktiv radius vizual olaraq fərqləndirilsin.

Seçilmiş radius localStorage-da saxlanılsın.

Bu mərhələdə real məsafə hesablaması etmə. Demo məkan siyahısını seçilmiş radiusa uyğun dəyişmiş kimi göstər.

12. Kəşf et düyməsi

Axtarış panelinin sağında və ya mobil görünüşdə onun dərhal altında ayrıca düymə göstər:

Kəşf et

Düymənin yanında lupa və ya kompas ikonu istifadə et.

Bu düymə axtarış arrow düyməsindən vizual olaraq fərqlənsin, lakin əsas axtarışla eyni komponent qrupuna aid görünsün.

Kliklədikdə bottom sheet və ya tam ekran mobil panel açılsın.

Başlıq:

AZ: “Nə kəşf etmək istəyirsən?”

EN: “What would you like to explore?”

RU: «Что вы хотите найти?»

Kateqoriyalar:

Məşhur

Tarixi məkanlar

Muzeylər

Parklar

Təbiət

Restoranlar

Ticarət

Əyləncə

Ailə üçün

Pulsuz məkanlar

Kateqoriya seçildikdə uyğun demo məkan kartları göstər.

Məkan kartına kliklədikdə /place/:slug placeholder səhifəsinə keç.

13. Yaxındakı məkanlar

Axtarış sahəsinin altında ayrıca bölmə yarat.

Başlıq:

AZ: Yaxındakı məkanlar

EN: Places nearby

RU: Места поблизости

Başlığın yanında:

Hamısına bax

Seçilmiş radius

Cari şəhər

məlumatı göstərilə bilər.

Məkanları horizontal sürüşən kartlar şəklində göstər.

Hər kartda:

Keyfiyyətli demo şəkil

Məkanın adı

Kateqoriya

Reytinq ulduzu

Reytinq dəyəri

Təxmini məsafə

Favori ürək ikonu

Bakı üçün nümunə kartlar:

Dağüstü Park — 4.8

İçərişəhər — 4.8

Heydər Əliyev Mərkəzi — 4.7

Qız Qalası — 4.6

Bakı Bulvarı — 4.7

Məlumatların real Google məlumatı olmadığını gizlətmə.

Bölmənin yaxınlığında kiçik badge göstər:

AZ: Demo məlumat

EN: Demo data

RU: Демонстрационные данные

Kartlar touch swipe, mouse drag və scroll ilə idarə edilə bilsin.

Favori düyməsinə kliklədikdə ürək vəziyyəti dəyişsin və localStorage-da saxlanılsın.

14. Yardım düyməsi

Ekranın aşağı sağ və ya aşağı sol küncündə floating “Yardım” düyməsi yerləşdir.

Düymə:

Asan görünən

Digər elementləri örtməyən

Minimum 48x48px

Mətn və yardım ikonu olan

komponent olsun.

Düymə qırmızı panika düyməsi kimi görünməsin. Etibarlı və aydın yardım komponenti olsun.

Kliklədikdə emergency bottom sheet açılsın.

Başlıq:

AZ: “Təcili yardıma ehtiyacın var?”

EN: “Do you need emergency assistance?”

RU: «Вам нужна экстренная помощь?»

Bakı demo vəziyyətində göstər:

Ümumi təcili yardım — 112

Polis — 102

Ambulans — 103

Yanğın xidməti — 101

Əlavə seçimlər:

Cari lokasiyanı paylaş

Dəstəyə keç

Bağla

Heç bir nömrəyə avtomatik zəng etmə.

“Zəng et” düyməsinə kliklədikdə əvvəl təsdiq modalı göstər:

“Bu nömrəyə zəng etmək istəyirsiniz?”

Bu mərhələdə real zəng başlatmaq əvəzinə demo məlumat mesajı göstər:

“Real zəng funksiyası prototipdə aktiv deyil.”

Şəhər dəyişdikdə emergency ekranında:

“Təcili yardım nömrələri ölkəyə görə dəyişir və növbəti mərhələdə doğrulanacaq.”

xəbərdarlığını göstər.

15. Demo məlumat strukturu

Məkan məlumatlarını birbaşa komponentlərin içində təkrarlama.

Sonrakı mərhələdə real API ilə dəyişdirilməsi asan olan mərkəzləşdirilmiş demo data strukturu yarat.

Hər məkan üçün nəzərdə tut:

ID

Slug

AZ/EN/RU ad

AZ/EN/RU qısa təsvir

Ölkə

Şəhər

Kateqoriya

Şəkil

Reytinq

Rəy sayı

Məsafə

Koordinat placeholder-i

Favori statusu

Şəhərlər, dillər və radius seçimləri də mərkəzləşdirilmiş data/config strukturunda saxlanılsın.

16. Bu mərhələyə daxil deyil

Aşağıdakıları hələ yaratma:

Real IP lokasiyası

Real GPS

Google Places API

Google rəylərinin gətirilməsi

Booking.com məlumatları

Real xəritə

Real taksi qiymətləri

Bolt/Uber/Yango inteqrasiyası

App Store və Google Play yönləndirməsi

Məkan detalları səhifəsinin tam versiyası

Səyahət seçimləri səhifəsi

İstifadəçi qeydiyyatı

Real sosial hesab bağlantısı

Super Admin paneli

Maliyyə və ödənişlər

Real database

Real emergency zəngi

Bunların əvəzinə yalnız gələcək inteqrasiyanı asanlaşdıran təmiz komponent və data strukturu yarat.

17. Əlçatanlıq

Bütün interaktiv elementlər minimum 44px toxunma sahəsinə malik olsun.

Axtarış sahəsinin görünən və proqramatik label-i olsun.

Fokus vəziyyətlərini gizlətmə.

Klaviatura ilə idarəetmə işləsin.

Yalnız rənglə məlumat vermə.

Mətn və fon kontrastı kifayət qədər olsun.

Drawer və bottom sheet açıldıqda fokus düzgün idarə edilsin.

İkon düymələrdə aria-label istifadə et.

Şəkillərdə uyğun alt-mətn istifadə et.

18. Yekun yoxlama

Implementasiyanı tamamladıqdan sonra yoxla:

Ana səhifə mobile-first görünür.

EasyGo AI loqosu yuxarı mərkəzdədir.

Hamburger menyu açılır və bağlanır.

AZ/EN/RU dil dəyişməsi bütün Ana səhifəyə tətbiq olunur.

Seçilmiş dil localStorage-da qorunur.

Demo şəhər dəyişdirilə bilir.

Seçilmiş şəhər localStorage-da qorunur.

Axtarış autocomplete göstərir.

Boş axtarışda xəta mesajı çıxır.

Enter və arrow düyməsi axtarışı başladır.

Kəşf et paneli açılır.

Kateqoriyalar kliklənir.

Yaxındakı məkanlar horizontal sürüşür.

Favori ürəyi işləyir.

Radius dəyişdirilə bilir.

Yardım paneli açılır.

Zəngdən əvvəl təsdiq göstərilir.

Məkan kartı placeholder detail səhifəsinə keçir.

Geri düyməsi Ana səhifəyə qaytarır.

Mobil görünüşdə horizontal səhifə daşması yoxdur.

Desktop görünüşündə məzmun həddindən artıq genişlənmir.

Console-da aydın runtime xətası yoxdur.

Sonda qısa şəkildə təqdim et:

Yaradılmış səhifələr

Yaradılmış komponentlər

İşləyən interaksiyalar

Demo məlumat istifadə edilən hissələr

Növbəti mərhələ üçün hazır saxlanılan strukturlar

Kod nümunəsi izah etmə. Dəyişiklikləri birbaşa yeni Lovable layihəsində tətbiq et.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://easygo-explore-buddy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9146dda1-3d7f-4f06-b253-b5d406ecaa3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
