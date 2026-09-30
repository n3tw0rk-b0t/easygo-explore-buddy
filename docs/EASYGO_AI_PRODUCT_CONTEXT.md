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