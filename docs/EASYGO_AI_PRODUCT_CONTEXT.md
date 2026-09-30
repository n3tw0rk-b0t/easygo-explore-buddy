# EasyGo AI Mobile — Product Vision & Project Context

Bu prompt hazırda bütün funksiyaları bir dəfəyə implement etmək üçün deyil.

Bu məlumatları **EasyGo AI Mobile layihəsinin əsas məhsul vizyonu, gələcək inkişaf istiqaməti və source of truth** kimi qəbul et.

Mövcud layihəni analiz et və aşağıdakı məhsul məntiqini gələcək bütün dəyişikliklərdə əsas götür.

Mümkündürsə layihənin daxilində ayrıca:

`PROJECT_CONTEXT.md`

və ya

`docs/EASYGO_AI_PRODUCT_CONTEXT.md`

faylı yarat və bu məhsul vizyonunu orada saxla ki, gələcək development mərhələlərində istifadə olunsun.

---

# 1. Layihənin kimliyi

Layihənin adı:

**EasyGo AI Mobile**

Alternativ daxili ad:

**EasyGo AI Global v1**

Bu layihə əvvəlki Bakı əsaslı EasyGo AI prototipindən ayrıdır.

Köhnə layihənin:

- Bakı üçün hazırlanmış strukturu
- köhnə səhifələri
- köhnə naviqasiyası
- hardcoded Bakı məkanları
- web-first yanaşması

bu layihənin əsas arxitekturası kimi istifadə edilməməlidir.

Bakı yalnız demo şəhərlərdən biri ola bilər.

Bu yeni layihə başlanğıcdan:

- global
- mobile-first
- location-aware
- city-aware
- scalable

şəkildə hazırlanmalıdır.

---

# 2. Məhsulun əsas məqsədi

EasyGo AI yerli sakinlərə və turistlərə:

1. Getmək istədikləri məkanı tapmağa
2. Hara getmək istədiklərini bilmirlərsə yeni məkanlar kəşf etməyə
3. Seçilmiş məkan haqqında məlumat əldə etməyə
4. Ora necə gedəcəklərini müqayisə etməyə
5. Uyğun nəqliyyat və naviqasiya tətbiqinə keçməyə

kömək edən ağıllı səyahət platformasıdır.

Məhsul mümkün qədər qısa və sadə istifadəçi axınına malik olmalıdır.

Əsas prinsip:

**3 əsas mərhələ / 3 əsas ekran**

Home → Place Details → Travel Options

---

# 3. Platforma strategiyası

Əsas prioritet:

**Mobile-first**

İlk versiya:

**responsive PWA**

olmalıdır.

Telefon ekranında native mobil tətbiqə yaxın görünüş və istifadə təcrübəsi yaradılmalıdır.

Mobil dizayn tam oturduqdan sonra eyni sistem desktop/web versiyasına genişləndiriləcək.

Gələcəkdə App Store və Google Play üçün həqiqi native tətbiq hazırlanması qərarı ayrıca veriləcək.

---

# 4. Vizual istiqamət

Ana səhifənin vizual dili:

- Google Search qədər sadə
- Gemini giriş ekranı qədər minimalist
- sakit
- təmiz
- müasir
- etibarlı
- insan yönümlü
- səyahət və şəhər həyatına uyğun

olmalıdır.

İstifadəçini çoxlu məlumat, xəritələr və panellərlə qarşılamamaq lazımdır.

Əsas fokus:

**“Hara gedirsən?”**

---

# 5. Brend

Brend xarakteri:

**Calm Urban Tech**

Əsas rəng:

`#355070`

Coral accent:

`#E56B6F`

Yellow accent:

`#F6BD60`

Başlıqlar:

**Manrope**

UI və body:

**Inter**

Sloqan:

**“Vaxtını yolda yox, gedəcəyin yerdə keçir.”**

---

# 6. Əsas istifadəçi axını

## Ekran 1 — Home

İstifadəçi tətbiqi açdıqda birbaşa Home səhifəsini görür.

Yuxarı orta hissədə:

**EasyGo AI**

loqosu yerləşir.

Loqo:

- canlı
- yaradıcı
- sadə
- yüngül animasiyalı

ola bilər.

Lakin ağır animasiya istifadə edilməməlidir.

---

## Əsas axtarış

Səhifənin əsas hissəsində:

**“Hara gedirsən?”**

s

---

---

# 7. Əsas axtarış sistemi

Ana səhifənin əsas məqsədi istifadəçinin mümkün qədər tez getmək istədiyi məkanı tapmasıdır.

Əsas başlıq:

**Hara gedirsən?**

Aşağıda böyük və rahat istifadə olunan search input yerləşdir.

İstifadəçi:

- məkan adı
- turistik yer
- restoran
- muzey
- park
- alış-veriş mərkəzi
- əyləncə məkanı
- başqa POI

axtara bilməlidir.

Search input-un sağ hissəsində Telegram `send` ikonuna bənzəyən sağ istiqamətli arrow düyməsi yerləşdir.

Bu düymə Search / Enter funksiyası daşıyır.

Desktop və mobil keyboard-dan Enter basıldıqda da eyni search əməliyyatı işləməlidir.

İstifadəçi yazmağa başladıqda gələcəkdə autocomplete nəticələri göstəriləcək.

Nəticələr cari:

- ölkə
- şəhər
- radius

kontekstinə uyğun olmalıdır.

İlkin prototipdə demo nəticələr istifadə edilə bilər.

---

# 8. Kəşf et

Axtarışın yanında və ya mobil layout-da dərhal altında:

**Kəşf et**

düyməsi yerləşdir.

Bu funksiya hara getmək istədiyini bilməyən istifadəçi üçündür.

Kliklədikdə aşağıdakı kimi kateqoriyalar göstərilə bilər:

- Məşhur
- Tarixi məkanlar
- Muzeylər
- Parklar
- Təbiət
- Restoranlar
- Alış-veriş
- Əyləncə
- Ailə üçün
- Pulsuz məkanlar

Təkliflər cari şəhər və seçilmiş radiusa uyğun dəyişməlidir.

İstifadəçi bir məkan seçdikdə həmin məkanın Place Details səhifəsinə keçməlidir.

---

# 9. Yaxındakı məkanlar

Ana səhifədə ayrıca:

**Yaxındakı Məkanlar**

bölməsi olmalıdır.

Məkanlar horizontal swipe edilən kartlar şəklində göstərilməlidir.

Hər kartda:

- əsas şəkil
- məkan adı
- kateqoriya
- rating
- rating ulduzu

göstərilməlidir.

Sonrakı versiyalarda:

- məsafə
- açıq/qapalı status
- qiymət səviyyəsi
- favori

də əlavə edilə bilər.

Kart seçildikdə Place Details səhifəsinə keç.

---

# 10. Location və şəhər sistemi

IP yalnız istifadəçinin təxmini ölkə və şəhərini müəyyən etmək üçün istifadə edilə bilər.

Məsələn:

**“Görünür, Bakıdasınız.”**

İstifadəçi:

- şəhəri təsdiq edə
- dəyişə
- manual şəhər daxil edə

bilməlidir.

IP heç vaxt dəqiq istifadəçi koordinatı kimi istifadə edilməməlidir.

VPN və mobil operator səbəbindən IP səhv şəhər göstərə bilər.

Dəqiq marşrut hesablaması lazım olduqda cihazın location icazəsi ayrıca istənilməlidir.

İstifadəçi location icazəsi verməzsə:

**manual başlanğıc ünvanı**

daxil edə bilməlidir.

---

# 11. Radius sistemi

Search və Explore nəticələri üçün radius filter olmalıdır.

Seçimlər:

- 1 km
- 3 km
- 5 km
- 10 km
- 25 km
- 50 km
- 100 km

Radius aşağıdakılara təsir etməlidir:

- Yaxındakı Məkanlar
- Kəşf et
- search nəticələri

Məsələn:

Bakı + 3 km → yaxın mərkəzi məkanlar

Bakı + 100 km → Bakı və ətraf rayonlardakı uyğun məkanlar

Bu məntiq bütün ölkə və şəhərlər üçün scalable olmalıdır.

---

# 12. İkinci əsas ekran — Place Details

İstifadəçi bir məkan seçdikdə ikinci əsas ekran açılır.

Bu səhifənin məqsədi istifadəçiyə həmin məkan haqqında qərar vermək üçün lazım olan məlumatı qısa və aydın şəkildə göstərməkdir.

Yuxarı hissədə:

- böyük əsas şəkil
- məkan adı
- kateqoriya
- rating
- review sayı

göstər.

Daha sonra:

- qısa təsvir
- ünvan
- xəritədə mövqe
- iş saatları
- qiymət və ya giriş haqqı
- uyğun olduqda əlaqə məlumatı

göstərilə bilər.

Əlavə actions:

- Favorilərə əlavə et
- Paylaş

---

# 13. Reviews

Place Details səhifəsində real istifadəçi rəyləri üçün ayrıca bölmə nəzərdə tut.

Gələcəkdə rəylər yalnız:

- rəsmi API
- licensed integration
- approved partner source

vasitəsilə istifadə edilməlidir.

Google və Booking məlumatlarını scraping etmə.

İlkin prototipdə demo review istifadə edilirsə bunu real review kimi göstərmə.

Məsələn:

**Demo review**

və ya

**Demo məlumat**

etiketi göstər.

---

# 14. “Getməyə hazıram” CTA

Place Details səhifəsinin aşağı hissəsində mobile-first fixed CTA yerləşdir:

**Getməyə hazıram**

Bu düymə üçüncü əsas ekran olan:

**Travel Options**

səhifəsinə keçməlidir.

Bu CTA Place Details səhifəsinin əsas conversion action-u olmalıdır.

---

# 15. Üçüncü əsas ekran — Travel Options

Bu səhifə istifadəçiyə seçilmiş məkana necə gedəcəyini müəyyən etməyə kömək edir.

Yuxarı hissədə:

- məkanın adı
- əsas şəkli
- cari mövqedən məsafə
- təxmini çatma vaxtı

göstər.

Aşağıda nəqliyyat seçimləri göstər:

- Taksi
- Avtobus
- Metro
- Skuter
- Velosiped
- Piyada

Vacib:

Bütün nəqliyyat növlərini bütün şəhərlərdə göstərmə.

Mövcud transport modes ölkə və şəhərə görə dinamik müəyyən edilməlidir.

---

# 16. Taxi

İstifadəçi Taxi seçdikdə həmin şəhərdə mövcud provider-lər göstərilə bilər.

Məsələn:

- Bolt
- Uber
- Yango
- local taxi providers

Hər provider kartında mümkün olduqda:

- logo
- provider adı
- estimated arrival time
- estimated price
- Tətbiqdə aç

göstərilə bilər.

Lakin real qiymət yalnız official integration olduqda göstərilməlidir.

Əgər qiymət məlumatı alınmırsa:

**Tətbiqdə qiymətə bax**

göstər.

Demo qiyməti heç vaxt real qiymət kimi təqdim etmə.

---

# 17. Deep link sistemi

İstifadəçi məsələn Bolt seçdikdə:

Əgər tətbiq telefonda varsa:

**deep link**

ilə tətbiqi açmaq nəzərdə tutulmalıdır.

Tətbiq yoxdursa:

- App Store
- Google Play

səhifəsinə yönləndirmə nəzərdə tutulsun.

Eyni sistem gələcəkdə digər transport provider-lər üçün reusable olmalıdır.

---

# 18. Public transport

Avtobus və Metro seçildikdə gələcəkdə aşağıdakılar göstərilə bilər:

- uyğun xətt
- dayanacaq
- minmə nöqtəsi
- transfer sayı
- walking hissəsi
- ümumi travel time

Bu məlumatlar yalnız etibarlı transit data və ya rəsmi API-dən gəlməlidir.

---

# 19. Scooter və Bicycle

Əgər şəhərdə scooter və ya bicycle sharing xidməti varsa həmin seçim göstərilsin.

Gələcəkdə:

- provider
- yaxın vehicle
- məsafə
- qiymət
- tətbiqdə aç

məlumatları göstərilə bilər.

Xidmət olmayan şəhərdə həmin transport mode gizlədilməlidir.

---

# 20. Walking

Piyada seçildikdə istifadəçiyə navigation app seçimləri göstərilə bilər:

- Google Maps
- Apple Maps
- Waze

İstifadəçi birini seçdikdə destination həmin tətbiqdə açılmalıdır.

Platformaya uyğun tətbiqlər dinamik göstərilə bilər.

---

# 21. Real place data

Google, Booking və digər platformalardan scraping etmə.

Real məlumatlar yalnız:

- official API
- licensed API
- approved integration
- legally usable open data

ilə əldə edilməlidir.

Place data strukturu gələcəkdə ən azı aşağıdakı sahələri dəstəkləməlidir:

- id
- name
- localized name
- description
- coordinates
- country
- city
- category
- photos
- rating
- review count
- opening hours
- price level
- address

UI ilə data source bir-birindən ayrılmalıdır.

---

# 22. Emergency / Yardım

Ana səhifədə həmişə əlçatan:

**Yardım**

floating action olmalıdır.

Kliklədikdə avtomatik telefon zəngi başlatma.

Əvvəl emergency ekranı aç.

İstifadəçinin ölkəsinə uyğun:

- Ümumi emergency
- Polis
- Ambulans
- Yanğın xidməti
- Cari lokasiyanı paylaş
- Dəstəyə keç

variantları göstər.

Zəng etmək istədikdə confirmation göstər:

**“Bu nömrəyə zəng etmək istəyirsiniz?”**

Emergency nömrələri ölkəyə görə dəyişməlidir və gələcəkdə verified data source-dan gəlməlidir.

---

# 23. Dil sistemi

İlkin dillər:

- AZ
- EN
- RU

Translation strukturu scalable olmalıdır.

Component daxilində bütün mətnləri ayrıca hardcode etmə.

Mərkəzləşdirilmiş i18n strukturu istifadə et ki, gələcəkdə yeni dillər rahat əlavə edilə bilsin.

---

# 24. Data və arxitektura

Layihəni yalnız demo UI kimi qurma.

Gələcək real API-lərə uyğun təmiz arxitektura saxla.

Centralized data/config layer nəzərdə tut.

Gələcək entity-lər:

- countries
- cities
- places
- categories
- languages
- transport modes
- transport providers
- emergency numbers
- radius options
- user preferences

UI component-ləri data source-dan mümkün qədər ayrılmış olsun.

---

# 25. Demo data

Hazırda real integration olmayan hissələrdə demo/mock data istifadə edilə bilər.

Lakin demo məlumat real məlumat kimi göstərilməməlidir.

Bu aşağıdakılara aiddir:

- place data
- reviews
- prices
- distance
- transport information

Mock data gələcəkdə API response ilə asanlıqla əvəz edilə biləcək şəkildə qurulmalıdır.

---

# 26. User və Super Admin

Gələcək mərhələlərdə User panel və Super Admin panel ayrıca hazırlanacaq.

User panel üçün gələcək funksiyalar:

- Profil
- Avatar
- Dil
- Favorilər
- Search history
- Viewed places
- My Places
- Settings
- Notifications
- Support
- Emergency settings

Super Admin üçün gələcək funksiyalar:

- User management
- Role management
- Places management
- City management
- Country management
- Categories
- Moderation
- User-submitted places
- Reviews
- Localization
- Emergency numbers
- Transport provider configuration
- Notifications
- Analytics
- Audit logs
- Support tickets
- Feature flags

Bunları hazırda implement etmə.

Sadəcə gələcək arxitekturada nəzərə al.

---

# 27. EasyGo AI əsas UX flow

Məhsulun əsas axını mümkün qədər sadə qalmalıdır:

**Hara gedirsən?**

↓

**Məkanı seç / Kəşf et**

↓

**Məkan haqqında məlumat al**

↓

**Getməyə hazıram**

↓

**Necə getmək istəyirsən?**

↓

**Uyğun transport seç**

↓

**Xarici tətbiq və ya navigation ilə davam et**

İstifadəçini lazımsız əlavə ekranlardan keçirmə.

---

# 28. Development mərhələləri

Layihəni bu ardıcıllıqla inkişaf etdirəcəyik:

### Mərhələ 1
Mobile-first baza və tam Home screen

### Mərhələ 2
Search və Kəşf et davranışlarının genişləndirilməsi

### Mərhələ 3
Place Details

### Mərhələ 4
Travel Options

### Mərhələ 5
Location və city detection

### Mərhələ 6
External app deep links

### Mərhələ 7
AZ / EN / RU sisteminin tamlaşdırılması

### Mərhələ 8
User account və personal features

### Mərhələ 9
Super Admin

### Mərhələ 10
Real data və service integrations

### Mərhələ 11
Responsive desktop/web optimization

Bir mərhələ tamamlanmadan səbəbsiz şəkildə sonrakı böyük mərhələləri implement etmə.

---

# 29. Hansı mərhələdən başlayırıq?

Hazırkı development başlanğıcı:

## Mərhələ 1 — Mobile-first baza və Home screen

Əvvəlcə mövcud layihəni analiz et.

Əgər Home screen artıq mövcuddursa onu silib sıfırdan yaratma.

Mövcud implementasiyanı bu Product Context ilə müqayisə et və yalnız tələb olunan düzəlişləri et.

Mərhələ 1-in əsas məqsədləri:

- Mobile-first responsive struktur
- EasyGo AI branding
- “Hara gedirsən?” əsas UX
- Search component
- Kəşf et
- Radius
- City selector UI
- Nearby Places
- Hamburger menu
- AZ/EN/RU bazası
- Yardım
- Reusable component strukturu

Place Details və Travel Options hələ tam implement edilməməlidir.

Onlar ayrıca mərhələlərdə hazırlanacaq.

---

# 30. Vacib qayda

Bu sənəd:

**EasyGo AI Mobile layihəsinin əsas Product Context sənədidir.**

Gələcək dəyişikliklərdə bunu source of truth kimi istifadə et.

Yeni feature əlavə ediləndə:

1. Əvvəl mövcud kodu və component-i yoxla.
2. Eyni funksiyanın ikinci versiyasını yaratma.
3. Lazımsız yeni səhifə yaratma.
4. Mobile-first prinsipini qoru.
5. İşləyən funksiyanı səbəbsiz pozma.
6. Reusable component istifadə et.
7. Gələcək API inteqrasiyalarını nəzərə al.
8. Demo məlumatı real məlumat kimi göstərmə.
9. Accessibility və performance-a diqqət et.
10. Köhnə Bakı əsaslı EasyGo AI prototipinin strukturunu bu layihəyə qaytarma.

Bu məlumatları əvvəl saxladığın `PROJECT_CONTEXT.md` sənədinin davamına əlavə et və sənədi tamamla.

Hazırda əlavə böyük feature implement etmə.

Sonda yalnız bildir:

- `PROJECT_CONTEXT.md` tamamlandımı?
- Product Vision tam saxlanıldımı?
- Hazırkı başlanğıc mərhələsinin **Mərhələ 1 — Mobile-first baza və Home screen** olduğunu başa düşdünmü?