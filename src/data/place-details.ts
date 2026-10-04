import type { Localized } from "./types";

export interface PlaceDetails {
  address: Localized;
  hours: Localized;
  about: Localized;
  tip: Localized;
  source?: string;
}

/** Visitor information; source links identify verified opening schedules. */
export const PLACE_DETAILS: Record<string, PlaceDetails> = {
  "alov-qulleleri": {
    "address": {
      "az": "Mehdi Hüseyn küçəsi 1A, Bakı",
      "en": "1A Mehdi Huseyn Street, Baku",
      "ru": "Ул. Мехди Гусейна, 1A, Баку"
    },
    "hours": {
      "az": "Kənardan baxış: 24 saat; daxili məkanlara giriş məhduddur",
      "en": "Exterior: 24 hours; indoor access restricted",
      "ru": "Осмотр снаружи: круглосуточно; доступ внутрь ограничен"
    },
    "about": {
      "az": "Alov formasındakı üç qüllə müasir Bakının əsas simvollarındandır. Kompleksdə hotel, ofislər və yaşayış sahələri yerləşir; axşam fasadlarda işıq animasiyaları göstərilir.",
      "en": "These three flame-shaped towers are among modern Baku’s defining landmarks. The complex contains a hotel, offices and residences, with animated lighting covering the façades after dark.",
      "ru": "Три башни в форме языков пламени стали одним из главных символов современного Баку. В комплексе находятся отель, офисы и квартиры, а вечером на фасадах показывают световые анимации."
    },
    "tip": {
      "az": "Qüllələri bütöv şəkildə çəkmək üçün axşam Bulvar tərəfdən baxın.",
      "en": "For a full view of the illuminated towers, photograph them from the Boulevard after dark.",
      "ru": "Чтобы снять подсвеченные башни целиком, фотографируйте их вечером со стороны бульвара."
    }
  },
  "dagustu-park": {
    "address": {
      "az": "Mehdi Hüseyn küçəsi, Bakı",
      "en": "Mehdi Huseyn Street, Baku",
      "ru": "Ул. Мехди Гусейна, Баку"
    },
    "hours": {
      "az": "Hər gün, 24 saat",
      "en": "Daily, 24 hours",
      "ru": "Ежедневно, круглосуточно"
    },
    "about": {
      "az": "Dağüstü Park Bakı buxtası, Bulvar və şəhər mərkəzinə panoramik mənzərələr açır. Terraslar və pilləkənlər Şəhidlər xiyabanı yaxınlığındakı təpə boyunca uzanır.",
      "en": "Highland Park offers panoramic views over Baku Bay, the Boulevard and the city centre. Its terraces and stairways spread across the hillside near Martyrs’ Lane.",
      "ru": "Из Нагорного парка открывается панорама Бакинской бухты, бульвара и центра города. Террасы и лестницы расположены на склоне рядом с Аллеей шехидов."
    },
    "tip": {
      "az": "Pilləkənlərlə qalxmaq istəmirsinizsə, funikulyorun həmin gün işləyib-işləmədiyini yoxlayın.",
      "en": "If you want to avoid the stairs, check whether the funicular is operating that day.",
      "ru": "Если хотите обойтись без подъёма по лестницам, проверьте, работает ли в этот день фуникулёр."
    }
  },
  "icerisheher": {
    "address": {
      "az": "Böyük Qala küçəsi, İçərişəhər, Bakı",
      "en": "Boyuk Qala Street, Icherisheher, Baku",
      "ru": "Ул. Бёюк Гала, Ичери-шехер, Баку"
    },
    "hours": {
      "az": "Küçələr: 24 saat; muzeylər adətən 10:00–18:00",
      "en": "Streets: 24 hours; museums usually 10:00–18:00",
      "ru": "Улицы: круглосуточно; музеи обычно 10:00–18:00"
    },
    "about": {
      "az": "UNESCO siyahısındakı İçərişəhər Bakının qala divarları ilə əhatələnmiş tarixi nüvəsidir. Dar küçələrdə karvansaralar, məscidlər, Qız qalası və Şirvanşahlar sarayı yerləşir.",
      "en": "UNESCO-listed Icherisheher is Baku’s historic walled core. Its narrow streets connect caravanserais, mosques, the Maiden Tower and the Palace of the Shirvanshahs.",
      "ru": "Включённый в список ЮНЕСКО Ичери-шехер — историческое ядро Баку, окружённое крепостными стенами. В узких улицах находятся караван-сараи, мечети, Девичья башня и дворец Ширваншахов."
    },
    "tip": {
      "az": "Daş döşəmələrdə rahat gəzmək üçün sürüşməyən ayaqqabı geyinin.",
      "en": "Wear shoes with good grip for the uneven stone lanes.",
      "ru": "Для прогулки по неровной каменной мостовой наденьте обувь с нескользящей подошвой."
    }
  },
  "qiz-qalasi": {
    "address": {
      "az": "Neftçilər prospekti 58, Bakı",
      "en": "58 Neftchilar Avenue, Baku",
      "ru": "Просп. Нефтяников, 58, Баку"
    },
    "hours": {
      "az": "Ziyarət saatları təsdiqlənməyib. Getməzdən əvvəl məkanla dəqiqləşdirin.",
      "en": "Visiting hours are not confirmed. Check with the venue before visiting.",
      "ru": "Часы посещения не подтверждены. Уточните перед визитом."
    },
    "about": {
      "az": "Qız qalası İçərişəhərin ən tanınmış abidələrindən biridir; tikilmə tarixi və ilkin təyinatı barədə müxtəlif fikirlər var. İçəridə tarixi ekspozisiyalar, yuxarıda isə köhnə şəhərə və buxtaya baxış meydançası yerləşir.",
      "en": "The Maiden Tower is one of the Old City’s best-known monuments, although its construction date and original purpose remain debated. Inside are historical displays, while the rooftop offers views across the Old City and bay.",
      "ru": "Девичья башня — один из самых известных памятников Старого города, но её возраст и первоначальное назначение остаются предметом споров. Внутри размещены исторические экспозиции, а наверху находится смотровая площадка с видом на город и бухту."
    },
    "tip": {
      "az": "Yuxarı qalxmaq dar pilləkənlər tələb etdiyindən hərəkət məhdudiyyətiniz varsa giriş imkanlarını əvvəlcədən soruşun.",
      "en": "The climb involves narrow stairs, so ask about access beforehand if you have limited mobility.",
      "ru": "Наверх ведут узкие лестницы, поэтому при ограниченной подвижности заранее уточните условия доступа."
    }
  },
  "heyder-eliyev-merkezi": {
    "address": {
      "az": "Heydər Əliyev prospekti 1, Bakı",
      "en": "1 Heydar Aliyev Avenue, Baku",
      "ru": "Просп. Гейдара Алиева, 1, Баку"
    },
    "hours": {
      "az": "Ziyarət saatları təsdiqlənməyib. Getməzdən əvvəl məkanla dəqiqləşdirin.",
      "en": "Visiting hours are not confirmed. Check with the venue before visiting.",
      "ru": "Часы посещения не подтверждены. Уточните перед визитом."
    },
    "about": {
      "az": "Zaha Hadidin layihələndirdiyi mərkəz 2012-ci ildə açılıb və axıcı ağ formaları ilə tanınır. Burada Azərbaycan tarixinə və mədəniyyətinə aid ekspozisiyalar, həmçinin müvəqqəti incəsənət sərgiləri keçirilir.",
      "en": "Designed by Zaha Hadid and opened in 2012, the centre is celebrated for its flowing white architecture. It hosts displays on Azerbaijani history and culture alongside temporary art exhibitions.",
      "ru": "Центр по проекту Захи Хадид открылся в 2012 году и известен плавными линиями белого здания. Здесь представлены экспозиции об истории и культуре Азербайджана, а также временные художественные выставки."
    },
    "tip": {
      "az": "Bilet almadan əvvəl hansı sərgilərin qiymətə daxil olduğunu yoxlayın.",
      "en": "Check which exhibitions are included before buying your ticket.",
      "ru": "Перед покупкой билета уточните, какие выставки входят в его стоимость."
    }
  },
  "baki-bulvari": {
    "address": {
      "az": "Neftçilər prospekti boyunca, Bakı",
      "en": "Along Neftchilar Avenue, Baku",
      "ru": "Вдоль просп. Нефтяников, Баку"
    },
    "hours": {
      "az": "Hər gün, 24 saat; attraksionların saatları fərqlidir",
      "en": "Daily, 24 hours; attraction hours vary",
      "ru": "Ежедневно, круглосуточно; часы аттракционов различаются"
    },
    "about": {
      "az": "1909-cu ildə əsası qoyulan Bakı Bulvarı Xəzər sahili boyunca uzanan geniş gəzinti zonasıdır. Burada bağlar, kafelər, Kiçik Venesiya və Xalça Muzeyi kimi məkanlar yerləşir.",
      "en": "Established in 1909, Baku Boulevard is a broad promenade along the Caspian waterfront. Its gardens and cafés connect attractions including Little Venice and the Carpet Museum.",
      "ru": "Бакинский бульвар, основанный в 1909 году, — широкая прогулочная зона вдоль Каспийского моря. Среди садов и кафе расположены Малая Венеция, Музей ковра и другие достопримечательности."
    },
    "tip": {
      "az": "Sahildə külək güclü ola bildiyindən yüngül gödəkçə götürün.",
      "en": "Bring a light jacket, as the waterfront can be windy.",
      "ru": "Возьмите лёгкую куртку: на набережной бывает ветрено."
    }
  },
  "azerbaycan-xalca-muzeyi": {
    "address": {
      "az": "Mikayıl Hüseynov prospekti 28, Bakı",
      "en": "28 Mikayil Huseynov Avenue, Baku",
      "ru": "Просп. Микаила Гусейнова, 28, Баку"
    },
    "hours": {
      "az": "Ekspozisiya: ç.a.–c. 10:00–19:00; ş.–b. 11:00–20:00\nKassa: ç.a.–c. 10:00–18:00; ş.–b. 11:00–19:00\nBazar ertəsi bağlıdır",
      "en": "Exhibition: Tue–Fri 10:00–19:00; Sat–Sun 11:00–20:00\nTicket office: Tue–Fri 10:00–18:00; Sat–Sun 11:00–19:00\nClosed Monday",
      "ru": "Экспозиция: вт–пт 10:00–19:00; сб–вс 11:00–20:00\nКасса: вт–пт 10:00–18:00; сб–вс 11:00–19:00\nПонедельник — выходной"
    },
    "about": {
      "az": "1967-ci ildə yaradılan muzey Azərbaycan xalçaçılığının regional məktəblərini və toxuculuq ənənələrini təqdim edir. 2014-cü ildən kolleksiya bükülmüş xalçanı xatırladan sahilyanı binada nümayiş olunur.",
      "en": "Founded in 1967, the museum explores Azerbaijan’s regional carpet schools and weaving traditions. Since 2014, its collection has occupied a waterfront building shaped like a rolled carpet.",
      "ru": "Музей, основанный в 1967 году, знакомит с региональными школами азербайджанского ковроткачества. С 2014 года коллекция размещается у набережной в здании, напоминающем свёрнутый ковёр."
    },
    "tip": {
      "az": "Canlı toxuculuq nümayişinin vaxtını girişdə soruşun.",
      "en": "Ask at reception when a live weaving demonstration is available.",
      "ru": "Уточните на входе время демонстрации ручного ткачества."
    },
    "source": "https://azcarpetmuseum.az/en/ticket"
  },
  "baki-zooloji-parki": {
    "address": {
      "az": "Abbasqulu ağa Bakıxanov küçəsi 39, Bakı",
      "en": "39 Abbasgulu Agha Bakikhanov Street, Baku",
      "ru": "Ул. Аббаскули-ага Бакиханова, 39, Баку"
    },
    "hours": {
      "az": "Bazar ertəsi–cümə: 10:00–19:00\nŞənbə–bazar: 09:00–19:00",
      "en": "Mon–Fri: 10:00–19:00\nSat–Sun: 09:00–19:00",
      "ru": "Пн–пт: 10:00–19:00\nСб–вс: 09:00–19:00"
    },
    "about": {
      "az": "Bakı Zooloji Parkı 1928-ci ildə yaradılıb və geniş yenidənqurmadan sonra 2021-ci ildə açılıb. Yaşıllıqlar arasındakı volyerlərdə yerli və ekzotik heyvanlar nümayiş olunur.",
      "en": "Baku Zoo was founded in 1928 and reopened in 2021 after extensive redevelopment. Landscaped enclosures house both regional wildlife and exotic species.",
      "ru": "Бакинский зоопарк был основан в 1928 году и вновь открылся в 2021 году после масштабной реконструкции. В озеленённых вольерах содержатся местные и экзотические виды животных."
    },
    "tip": {
      "az": "Heyvanların daha fəal olduğu səhər saatlarında gəlməyə çalışın.",
      "en": "Visit in the morning, when many animals are more active.",
      "ru": "Приходите утром, когда многие животные более активны."
    },
    "source": "https://bakuzoo.az/en/contact"
  },
  "sultanahmet": {
    "address": {
      "az": "Atmeydanı küçəsi, Sultanahmet, Fatih, İstanbul",
      "en": "Atmeydanı Caddesi, Sultanahmet, Fatih, Istanbul",
      "ru": "Atmeydanı Caddesi, Султанахмет, Фатих, Стамбул"
    },
    "hours": {
      "az": "Hər gün, 24 saat",
      "en": "Daily, 24 hours",
      "ru": "Ежедневно, круглосуточно"
    },
    "about": {
      "az": "Sultanahmet meydanı Bizans dövründə araba yarışlarının keçirildiyi Hippodromun yerindədir. Misir obeliski, İlanlı sütun və Alman fəvvarəsi burada görüləcək əsas abidələrdir.",
      "en": "Sultanahmet Square occupies the site of the Byzantine Hippodrome, once used for chariot racing. Its surviving monuments include the Egyptian Obelisk, Serpent Column and the later German Fountain.",
      "ru": "Площадь Султанахмет занимает место византийского Ипподрома, где проходили гонки колесниц. Здесь можно увидеть Египетский обелиск, Змеиную колонну и более поздний Немецкий фонтан."
    },
    "tip": {
      "az": "Sakit gəzinti və daha rahat fotoşəkillər üçün səhər tezdən gəlin.",
      "en": "Arrive early for a quieter walk and less crowded photographs.",
      "ru": "Приходите рано утром, чтобы спокойно погулять и сделать фотографии без толпы."
    }
  },
  "galata-qullesi": {
    "address": {
      "az": "Bereketzade, Galata Kulesi, 34421 Beyoğlu, İstanbul",
      "en": "Bereketzade, Galata Kulesi, 34421 Beyoğlu, Istanbul",
      "ru": "Bereketzade, Galata Kulesi, 34421 Бейоглу, Стамбул"
    },
    "hours": {
      "az": "Hər gün: 08:30–18:30\nAxşam ziyarəti: 18:30–22:00",
      "en": "Daily: 08:30–18:30\nEvening visits: 18:30–22:00",
      "ru": "Ежедневно: 08:30–18:30\nВечернее посещение: 18:30–22:00"
    },
    "about": {
      "az": "Genuyalılar tərəfindən 1348-ci ildə tikilən Qalata qülləsi şəhərin ən tanınmış orta əsr abidələrindəndir. Muzey ekspozisiyası və yuxarı baxış səviyyəsi Haliç, Bosfor və tarixi yarımadanı görməyə imkan verir.",
      "en": "Built by the Genoese in 1348, Galata Tower is one of Istanbul’s most recognisable medieval landmarks. Its museum displays and upper viewing level introduce the city’s history and panoramas of the Golden Horn, Bosphorus and historic peninsula.",
      "ru": "Галатская башня, построенная генуэзцами в 1348 году, — один из самых узнаваемых средневековых памятников Стамбула. Внутри находятся музейные экспозиции, а сверху открываются виды на Золотой Рог, Босфор и исторический полуостров."
    },
    "tip": {
      "az": "Günbatımı vaxtı növbələr uzandığından bileti və giriş qaydalarını əvvəlcədən yoxlayın.",
      "en": "Check tickets and entry arrangements ahead of time, as sunset queues can be long.",
      "ru": "Заранее проверьте билеты и правила входа: к закату очереди могут быть длинными."
    },
    "source": "https://muze.gov.tr/muze-detay?distId=MRK&sectionId=GLT04"
  },
  "bosfor-sahili": {
    "address": {
      "az": "Mecidiye Köprüsü küçəsi, Ortaköy, Beşiktaş, İstanbul",
      "en": "Mecidiye Köprüsü Sokak, Ortaköy, Beşiktaş, Istanbul",
      "ru": "Mecidiye Köprüsü Sokak, Ортакёй, Бешикташ, Стамбул"
    },
    "hours": {
      "az": "Açıq sahil məkanları: 24 saat",
      "en": "Public waterfront areas: 24 hours",
      "ru": "Общедоступная набережная: круглосуточно"
    },
    "about": {
      "az": "Ortaköy sahili Bosfor boğazına, sahilyanı məscidə və 15 İyul Şəhidlər körpüsünə mənzərəsi ilə məşhurdur. Meydan ətrafında kafelər, küçə yeməkləri və gəmi gəzintiləri üçün dayanacaqlar var.",
      "en": "The Ortaköy waterfront is known for views of the Bosphorus, its waterside mosque and the 15 July Martyrs Bridge. The square has cafés, street-food stalls and nearby departure points for sightseeing boats.",
      "ru": "Набережная Ортакёя известна видами на Босфор, мечеть у воды и мост Мучеников 15 Июля. Вокруг площади расположены кафе, киоски с уличной едой и причалы прогулочных судов."
    },
    "tip": {
      "az": "Həftəsonu sahil yolu sıx olduğundan ictimai nəqliyyata üstünlük verin.",
      "en": "Use public transport, as the coastal road becomes congested on weekends.",
      "ru": "Выбирайте общественный транспорт: по выходным прибрежная дорога часто стоит в пробках."
    }
  },
  "istanbul-muasir-muzeyi": {
    "address": {
      "az": "Kılıç Ali Paşa Mahallesi, Tophane İskele Caddesi 1/1, 34433 Beyoğlu, İstanbul",
      "en": "Kılıç Ali Paşa Mahallesi, Tophane İskele Caddesi 1/1, 34433 Beyoğlu, Istanbul",
      "ru": "Kılıç Ali Paşa Mahallesi, Tophane İskele Caddesi 1/1, 34433 Бейоглу, Стамбул"
    },
    "hours": {
      "az": "Çərşənbə axşamı–bazar: 10:00–18:00\nCümə: 10:00–20:00\nBazar ertəsi bağlı; son giriş bağlanışdan 30 dəqiqə əvvəl",
      "en": "Tue–Sun: 10:00–18:00\nFri: 10:00–20:00\nMon closed; last entry 30 minutes before closing",
      "ru": "Вт–вс: 10:00–18:00\nПт: 10:00–20:00\nПн закрыто; последний вход за 30 минут до закрытия"
    },
    "about": {
      "az": "2004-cü ildə yaradılan İstanbul Modern Türkiyənin müasir və çağdaş incəsənətinə həsr olunub. Muzey 2023-cü ildə Renzo Pianonun layihələndirdiyi yeni sahilyanı binada fəaliyyətə başlayıb.",
      "en": "Founded in 2004, Istanbul Modern focuses on modern and contemporary art from Turkey. In 2023 it opened its new waterfront building designed by Renzo Piano.",
      "ru": "Основанный в 2004 году Istanbul Modern посвящён современному искусству Турции. В 2023 году музей открыл новое здание на набережной по проекту Ренцо Пиано."
    },
    "tip": {
      "az": "Müvəqqəti sərgilərin proqramını səfərdən əvvəl yoxlayın.",
      "en": "Check the temporary exhibition programme before your visit.",
      "ru": "Перед посещением проверьте программу временных выставок."
    },
    "source": "https://www.istanbulmodern.org/en/visit/museum"
  },
  "bratislava-kohne-seher": {
    "address": {
      "az": "Hlavné námestie, Bratislava",
      "en": "Hlavné námestie, Bratislava",
      "ru": "Главная площадь — Hlavné námestie, Братислава"
    },
    "hours": {
      "az": "Küçələr və meydanlar: 24 saat",
      "en": "Streets and squares: 24 hours",
      "ru": "Улицы и площади: круглосуточно"
    },
    "about": {
      "az": "Bratislavanın Köhnə şəhəri orta əsr küçələri, barokko sarayları və kiçik meydanları birləşdirir. Köhnə Bələdiyyə binası, Mixail qapısı və küçə heykəlləri əsas görməli yerlərdəndir.",
      "en": "Bratislava’s Old Town combines medieval lanes, Baroque palaces and compact squares. Highlights include the Old Town Hall, Michael’s Gate and the district’s playful street sculptures.",
      "ru": "Старый город Братиславы объединяет средневековые улочки, барочные дворцы и небольшие площади. Среди главных достопримечательностей — Старая ратуша, Михайловские ворота и городские уличные скульптуры."
    },
    "tip": {
      "az": "Tarixi mərkəzi piyada gəzin, çünki bir çox küçə avtomobillər üçün bağlıdır.",
      "en": "Explore on foot, as many central streets are pedestrian-only.",
      "ru": "Осматривайте центр пешком: многие исторические улицы закрыты для автомобилей."
    }
  },
  "bratislava-qalasi": {
    "address": {
      "az": "Hrad, 811 06 Bratislava",
      "en": "Hrad, 811 06 Bratislava",
      "ru": "Hrad, 811 06 Братислава"
    },
    "hours": {
      "az": "Muzey: 10:00–18:00; çərşənbə axşamı bağlı\nSon giriş: 17:00\nƏrazi: hər gün 08:00–22:00\nBarokko bağı (mart, oktyabr): 09:00–17:00",
      "en": "Museum: 10:00–18:00; Tue closed\nLast entry: 17:00\nGrounds: daily 08:00–22:00\nBaroque garden (March, October): 09:00–17:00",
      "ru": "Музей: 10:00–18:00; вт закрыто\nПоследний вход: 17:00\nТерритория: ежедневно 08:00–22:00\nБарочный сад (март, октябрь): 09:00–17:00"
    },
    "about": {
      "az": "Dunay üzərində yüksələn dördqülləli qala Bratislavanın əsas simvoludur. Yenidən qurulmuş sarayda Slovakiya Milli Muzeyinin tarixi ekspozisiyaları yerləşir, həyətlərdən isə şəhərə geniş mənzərə açılır.",
      "en": "The four-towered castle above the Danube is Bratislava’s principal landmark. Its reconstructed palace houses historical collections of the Slovak National Museum, while the courtyards offer wide city views.",
      "ru": "Четырёхбашенный замок над Дунаем — главный символ Братиславы. В восстановленном дворце размещены исторические коллекции Словацкого национального музея, а из дворов открывается панорама города."
    },
    "tip": {
      "az": "Köhnə şəhərdən qalaya gedən yol yoxuşlu olduğundan rahat ayaqqabı geyinin.",
      "en": "Wear comfortable shoes for the uphill walk from the Old Town.",
      "ru": "Наденьте удобную обувь: дорога из Старого города к замку идёт в гору."
    },
    "source": "https://www.snm.sk/en/visit/opening-hours"
  },
  "dunay-sahili": {
    "address": {
      "az": "Rázusovo nábrežie, Bratislava",
      "en": "Rázusovo nábrežie, Bratislava",
      "ru": "Набережная Разуса — Rázusovo nábrežie, Братислава"
    },
    "hours": {
      "az": "Hər gün, 24 saat",
      "en": "Daily, 24 hours",
      "ru": "Ежедневно, круглосуточно"
    },
    "about": {
      "az": "Dunayın şimal sahilindəki gəzinti yolu Köhnə şəhəri çay mənzərələri ilə birləşdirir. Buradan Most SNP körpüsünü, sərnişin gəmilərini və qarşı sahildəki yaşıllıqları görmək olar.",
      "en": "The north-bank promenade links Bratislava’s Old Town with open river views. Along the way you can see Most SNP, passenger boats and the green spaces on the opposite bank.",
      "ru": "Набережная северного берега Дуная соединяет Старый город с открытыми видами на реку. Отсюда видны мост СНП, пассажирские суда и зелёные зоны противоположного берега."
    },
    "tip": {
      "az": "Gəzərkən velosiped zolaqlarına diqqət edin.",
      "en": "Watch for cycle lanes when walking along the river.",
      "ru": "Во время прогулки обращайте внимание на велосипедные дорожки."
    }
  },
  "slovakiya-milli-qalereyasi": {
    "address": {
      "az": "Rázusovo nábrežie 1, 811 02 Bratislava",
      "en": "Rázusovo nábrežie 1, 811 02 Bratislava",
      "ru": "Rázusovo nábrežie 1, 811 02 Братислава"
    },
    "hours": {
      "az": "Çərşənbə axşamı–bazar: 10:00–18:00\nCümə axşamı: 12:00–20:00\nBazar ertəsi bağlı",
      "en": "Tue–Sun: 10:00–18:00\nThu: 12:00–20:00\nMon closed",
      "ru": "Вт–вс: 10:00–18:00\nЧт: 12:00–20:00\nПн закрыто"
    },
    "about": {
      "az": "1948-ci ildə yaradılan Slovakiya Milli Qalereyası tarixi və müasir incəsənət kolleksiyalarını qoruyur. Dunay kənarındakı kompleks tarixi tikililəri modernist memarlıqla birləşdirir.",
      "en": "Founded in 1948, the Slovak National Gallery holds collections of historical and modern art. Its riverside complex combines historic buildings with striking modernist architecture.",
      "ru": "Словацкая национальная галерея, основанная в 1948 году, хранит коллекции старого и современного искусства. Её комплекс у Дуная сочетает исторические здания с выразительной модернистской архитектурой."
    },
    "tip": {
      "az": "Getməzdən əvvəl rəsmi saytda hansı sərgi zallarının açıq olduğunu yoxlayın.",
      "en": "Check the official website for currently accessible exhibition halls before travelling.",
      "ru": "Перед поездкой проверьте на официальном сайте, какие выставочные залы доступны."
    },
    "source": "https://sng.sk/en/slovak-national-gallery/visit"
  },
  "schonbrunn": {
    "address": {
      "az": "Schönbrunner Schloßstraße 47, 1130 Vyana",
      "en": "Schönbrunner Schloßstraße 47, 1130 Vienna",
      "ru": "Schönbrunner Schloßstraße 47, 1130 Вена"
    },
    "hours": {
      "az": "Saray: 08:30–17:30 (1 sentyabr–2 noyabr 2026)\n3 noyabr 2026–31 mart 2027: 08:30–17:00\nPark (oktyabr): 06:30–19:00",
      "en": "Palace: 08:30–17:30 (1 Sep–2 Nov 2026)\n3 Nov 2026–31 Mar 2027: 08:30–17:00\nPark (October): 06:30–19:00",
      "ru": "Дворец: 08:30–17:30 (1 сентября–2 ноября 2026)\n3 ноября 2026–31 марта 2027: 08:30–17:00\nПарк (октябрь): 06:30–19:00"
    },
    "about": {
      "az": "Şönbrunn Habsburqların yay iqamətgahı olub və UNESCO-nun Dünya İrsi siyahısındadır. Bəzəkli saray otaqları, geniş barokko bağları və təpədəki Qlorietta əsas görməli yerlərdir.",
      "en": "Schönbrunn was the Habsburgs’ summer residence and is a UNESCO World Heritage Site. Highlights include the richly decorated state rooms, extensive Baroque gardens and the hilltop Gloriette.",
      "ru": "Шёнбрунн служил летней резиденцией Габсбургов и включён в список Всемирного наследия ЮНЕСКО. Здесь стоит увидеть парадные залы, обширные барочные сады и Глориетту на холме."
    },
    "tip": {
      "az": "Saray üçün vaxtı müəyyən edilmiş bileti əvvəlcədən onlayn alın.",
      "en": "Book a timed palace ticket online in advance.",
      "ru": "Заранее купите онлайн билет во дворец на определённое время."
    },
    "source": "https://www.schoenbrunn.at/en/visitor-information/opening-times"
  },
  "vyana-tarixi-merkezi": {
    "address": {
      "az": "Stephansplatz, 1010 Vyana",
      "en": "Stephansplatz, 1010 Vienna",
      "ru": "Stephansplatz, 1010 Вена"
    },
    "hours": {
      "az": "Küçələr və meydanlar: 24 saat",
      "en": "Streets and squares: 24 hours",
      "ru": "Улицы и площади: круглосуточно"
    },
    "about": {
      "az": "Vyananın tarixi mərkəzi orta əsr küçələrini, imperiya saraylarını və məşhur qəhvəxana mədəniyyətini birləşdirir. Müqəddəs Stefan kafedralı, Hofburq və Ringstraße boyunca monumental binalar əsas dayanacaqlardır.",
      "en": "Vienna’s historic centre brings together medieval lanes, imperial palaces and a celebrated coffeehouse tradition. Key sights include St. Stephen’s Cathedral, the Hofburg and the monumental buildings along the Ringstraße.",
      "ru": "Исторический центр Вены объединяет средневековые улицы, императорские дворцы и знаменитую культуру кофеен. Главные ориентиры — собор Святого Стефана, Хофбург и монументальные здания вдоль Рингштрассе."
    },
    "tip": {
      "az": "Gəzintiyə başlamaq üçün U1 və ya U3 xətti ilə Stephansplatz stansiyasına gəlin.",
      "en": "Start your walk at Stephansplatz station, served by the U1 and U3.",
      "ru": "Начните прогулку от станции Stephansplatz, куда идут линии U1 и U3."
    }
  },
  "prater": {
    "address": {
      "az": "Riesenradplatz, 1020 Vyana",
      "en": "Riesenradplatz, 1020 Vienna",
      "ru": "Riesenradplatz, 1020 Вена"
    },
    "hours": {
      "az": "Park ərazisi: 24 saat\nAttraksionların saatları operatora və mövsümə görə dəyişir.",
      "en": "Park grounds: 24 hours\nRide hours vary by operator and season.",
      "ru": "Территория парка: круглосуточно\nЧасы аттракционов зависят от оператора и сезона."
    },
    "about": {
      "az": "Prater həm geniş yaşıl parkı, həm də Wurstelprater əyləncə zonasını əhatə edir. 1897-ci ildə açılan məşhur nəhəng dönmə çarxı Vyananın tarixi simvollarındandır.",
      "en": "The Prater includes both a large green park and the Wurstelprater amusement area. Its famous Giant Ferris Wheel opened in 1897 and remains one of Vienna’s historic symbols.",
      "ru": "Пратер включает большой зелёный парк и зону аттракционов Вурстельпратер. Знаменитое гигантское колесо обозрения открылось в 1897 году и остаётся одним из символов Вены."
    },
    "tip": {
      "az": "Əraziyə giriş pulsuzdur, amma hər attraksion üçün ayrıca ödəniş nəzərdə tutun.",
      "en": "Entry to the grounds is free, but budget separately for each ride.",
      "ru": "Вход на территорию бесплатный, но каждый аттракцион оплачивается отдельно."
    }
  },
  "dunay-parki": {
    "address": {
      "az": "Arbeiterstrandbadstraße, 1220 Vyana",
      "en": "Arbeiterstrandbadstraße, 1220 Vienna",
      "ru": "Arbeiterstrandbadstraße, 1220 Вена"
    },
    "hours": {
      "az": "Hər gün, 24 saat; ayrı-ayrı obyektlərin saatları fərqlidir",
      "en": "Daily, 24 hours; individual facilities have separate hours",
      "ru": "Ежедневно, круглосуточно; отдельные объекты работают по своему расписанию"
    },
    "about": {
      "az": "Donaupark 1964-cü il Vyana Beynəlxalq Bağçılıq Sərgisi üçün yaradılıb. Geniş çəmənliklər, gül bağları, uşaq meydançaları və Donauturm qülləsi parkın əsas xüsusiyyətləridir.",
      "en": "Donaupark was created for the 1964 Vienna International Garden Show. Broad lawns, flower gardens, playgrounds and the Donauturm observation tower are its main features.",
      "ru": "Донаупарк был создан к Венской международной садовой выставке 1964 года. Здесь находятся просторные лужайки, цветники, детские площадки и смотровая башня Донаутурм."
    },
    "tip": {
      "az": "Donauturm-a qalxmaq istəyirsinizsə, parkdan ayrı olan bilet və iş saatlarını yoxlayın.",
      "en": "If you plan to visit the Donauturm, check its separate tickets and opening hours.",
      "ru": "Если собираетесь подняться на Донаутурм, отдельно проверьте билеты и часы работы башни."
    }
  },
  "nizami-kucesi-kafeleri": {
    "address": {
      "az": "Nizami küçəsi, Fəvvarələr meydanı yaxınlığı, Bakı",
      "en": "Nizami Street, near Fountains Square, Baku",
      "ru": "Ул. Низами, рядом с площадью Фонтанов, Баку"
    },
    "hours": {
      "az": "Bu, məkanlar qrupudur. İş saatları seçilmiş kafeyə və ya puba görə dəyişir.",
      "en": "This is an area listing. Hours depend on the individual café or pub.",
      "ru": "Это группа заведений. Часы зависят от конкретного кафе или паба."
    },
    "about": {
      "az": "Nizami küçəsinin mərkəzi piyada hissəsində tarixi fasadlar arasında çoxsaylı kafelər yerləşir. Burada espresso məkanlarından Azərbaycan çayı və şirniyyatları təqdim edən kafelərə qədər müxtəlif seçimlər var.",
      "en": "The central pedestrian stretch of Nizami Street has numerous cafés set among historic façades. Options range from espresso bars to places serving Azerbaijani tea and sweets.",
      "ru": "На центральном пешеходном участке улицы Низами среди исторических фасадов расположено множество кафе. Здесь есть как кофейни с эспрессо, так и заведения с азербайджанским чаем и сладостями."
    },
    "tip": {
      "az": "Çay sifariş edərkən qiymətin bir stəkana, yoxsa çaydana aid olduğunu dəqiqləşdirin.",
      "en": "When ordering tea, check whether the listed price is per glass or per pot.",
      "ru": "Заказывая чай, уточните, указана ли цена за стакан или за чайник."
    }
  },
  "sahil-publari": {
    "address": {
      "az": "Neftçilər prospekti və yaxın küçələr, Bakı",
      "en": "Neftchilar Avenue and nearby streets, Baku",
      "ru": "Просп. Нефтяников и соседние улицы, Баку"
    },
    "hours": {
      "az": "Bu, məkanlar qrupudur. İş saatları seçilmiş kafeyə və ya puba görə dəyişir.",
      "en": "This is an area listing. Hours depend on the individual café or pub.",
      "ru": "Это группа заведений. Часы зависят от конкретного кафе или паба."
    },
    "about": {
      "az": "Bulvara yaxın küçələrdə publar, idman barları və rahat axşam məkanları var. Menyularda adətən pivə, kokteyllər və yüngül yeməklər olur; bəzi məkanlarda canlı musiqi keçirilir.",
      "en": "The streets near the Boulevard offer pubs, sports bars and casual evening venues. Menus typically feature beer, cocktails and simple food, with live music at some establishments.",
      "ru": "На улицах рядом с бульваром находятся пабы, спортивные бары и заведения для спокойного вечера. Обычно подают пиво, коктейли и несложные блюда; в некоторых местах бывает живая музыка."
    },
    "tip": {
      "az": "Sifarişdən əvvəl xidmət haqqının hesaba əlavə olunub-olunmadığını soruşun.",
      "en": "Ask whether a service charge is added before ordering.",
      "ru": "До заказа уточните, добавляется ли к счёту плата за обслуживание."
    }
  },
  "merkezi-mall": {
    "address": {
      "az": "Azadlıq prospekti, 28 May metrosu yaxınlığı, Bakı",
      "en": "Azadlig Avenue, near 28 May metro, Baku",
      "ru": "Просп. Азадлыг, рядом с метро «28 Мая», Баку"
    },
    "hours": {
      "az": "Konkret məkan göstərilməyib; iş saatları təsdiqlənməyib.",
      "en": "The exact venue is unspecified; hours are not confirmed.",
      "ru": "Конкретное заведение не указано; часы работы не подтверждены."
    },
    "about": {
      "az": "28 May ətrafındakı mərkəzi ticarət mərkəzləri geyim mağazalarını, kafeləri və gündəlik xidmətləri bir araya gətirir. Belə məkanlar isti və ya yağışlı havada alış-veriş və yemək fasiləsi üçün əlverişlidir.",
      "en": "Central shopping malls around 28 May bring together fashion shops, cafés and everyday services. They offer a convenient indoor stop for shopping or a meal during hot or rainy weather.",
      "ru": "Торговые центры в районе «28 Мая» объединяют магазины одежды, кафе и повседневные услуги. Это удобный вариант для покупок или обеда в жаркую либо дождливую погоду."
    },
    "tip": {
      "az": "Axşam avtomobil sıxlığından yayınmaq üçün 28 May metrosundan istifadə edin.",
      "en": "Use 28 May metro to avoid evening road congestion.",
      "ru": "Чтобы избежать вечерних пробок, воспользуйтесь метро «28 Мая»."
    }
  },
  "yasil-bazar": {
    "address": {
      "az": "Xətai prospekti, Bakı",
      "en": "Khatai Avenue, Baku",
      "ru": "Просп. Хатаи, Баку"
    },
    "hours": {
      "az": "Ziyarət saatları təsdiqlənməyib. Getməzdən əvvəl məkanla dəqiqləşdirin.",
      "en": "Visiting hours are not confirmed. Check with the venue before visiting.",
      "ru": "Часы посещения не подтверждены. Уточните перед визитом."
    },
    "about": {
      "az": "Yaşıl Bazar Bakının tanınmış ərzaq bazarlarından biridir. Piştaxtalarda mövsümi meyvələr, göyərti, ədviyyatlar, quru meyvələr, qoz-fındıq və yerli turşular satılır.",
      "en": "Green Bazaar is one of Baku’s best-known food markets. Stalls sell seasonal fruit, herbs, spices, dried fruit, nuts and local pickles.",
      "ru": "Зелёный базар — один из самых известных продуктовых рынков Баку. На прилавках продаются сезонные фрукты, зелень, специи, сухофрукты, орехи и местные соленья."
    },
    "tip": {
      "az": "Almazdan əvvəl qiyməti və çəki vahidini dəqiqləşdirin.",
      "en": "Confirm the price and unit of weight before buying.",
      "ru": "Перед покупкой уточните цену и единицу веса."
    }
  },
  "teze-pir-mescidi": {
    "address": {
      "az": "Mirzə Fətəli Axundov küçəsi 7, Bakı",
      "en": "7 Mirza Fatali Akhundov Street, Baku",
      "ru": "Ул. Мирзы Фатали Ахундова, 7, Баку"
    },
    "hours": {
      "az": "Ziyarət saatları təsdiqlənməyib. Getməzdən əvvəl məkanla dəqiqləşdirin.",
      "en": "Visiting hours are not confirmed. Check with the venue before visiting.",
      "ru": "Часы посещения не подтверждены. Уточните перед визитом."
    },
    "about": {
      "az": "Təzəpir məscidi XX əsrin əvvəllərində xeyriyyəçi Nabat xanım Aşurbəyovanın təşəbbüsü ilə tikilib. Qızılı rəngli günbəzlər, qoşa minarələr və bəzəkli interyer onun əsas memarlıq xüsusiyyətləridir.",
      "en": "Taza Pir Mosque was built in the early twentieth century through the patronage of philanthropist Nabat Khanum Ashurbeyova. Its gold-coloured domes, twin minarets and decorated interior distinguish the complex.",
      "ru": "Мечеть Тезепир построена в начале XX века по инициативе благотворительницы Набат ханум Ашурбековой. Её отличают золотистые купола, два минарета и богато оформленный интерьер."
    },
    "tip": {
      "az": "Qapalı geyim seçin və ibadət zalına daxil olmamışdan əvvəl icazə istəyin.",
      "en": "Dress modestly and ask permission before entering the prayer hall.",
      "ru": "Выбирайте закрытую одежду и спросите разрешение перед входом в молитвенный зал."
    }
  },
  "sahil-hotel": {
    "address": {
      "az": "Neftçilər prospekti, Bulvar yaxınlığı, Bakı",
      "en": "Neftchilar Avenue, near the Boulevard, Baku",
      "ru": "Просп. Нефтяников, рядом с бульваром, Баку"
    },
    "hours": {
      "az": "Konkret məkan göstərilməyib; iş saatları təsdiqlənməyib.",
      "en": "The exact venue is unspecified; hours are not confirmed.",
      "ru": "Конкретное заведение не указано; часы работы не подтверждены."
    },
    "about": {
      "az": "Bakı Bulvarı yaxınlığındakı sahilyanı hotellər gəzinti zonasına və mərkəzi görməli yerlərə rahat çıxış verir. Dəniz mənzərəsi və səs-küy səviyyəsi otağın mərtəbəsinə və istiqamətinə görə dəyişir.",
      "en": "Waterfront hotels near Baku Boulevard offer convenient access to the promenade and central sights. Sea views and noise levels depend on the room’s floor and orientation.",
      "ru": "Отели у Бакинского бульвара удобны для прогулок по набережной и посещения центральных достопримечательностей. Вид на море и уровень шума зависят от этажа и расположения номера."
    },
    "tip": {
      "az": "Rezervasiya zamanı dəniz mənzərəsinin zəmanətli olub-olmadığını yazılı təsdiqləyin.",
      "en": "Confirm in writing whether your booked room has a guaranteed sea view.",
      "ru": "При бронировании письменно уточните, гарантирован ли из номера вид на море."
    }
  },
  "ayasofya": {
    "address": {
      "az": "Ayasofya Meydanı 1, Sultanahmet, Fatih, İstanbul",
      "en": "Ayasofya Meydanı 1, Sultanahmet, Fatih, Istanbul",
      "ru": "Ayasofya Meydanı, 1, Султанахмет, Фатих, Стамбул"
    },
    "hours": {
      "az": "Ziyarət saatları təsdiqlənməyib. Getməzdən əvvəl məkanla dəqiqləşdirin.",
      "en": "Visiting hours are not confirmed. Check with the venue before visiting.",
      "ru": "Часы посещения не подтверждены. Уточните перед визитом."
    },
    "about": {
      "az": "537-ci ildə imperator Yustinianın dövründə tamamlanan Ayasofya Bizans memarlığının şah əsəridir. Sonralar məscid və muzey kimi fəaliyyət göstərib, 2020-ci ildə yenidən məscid olub; böyük günbəzi və qorunmuş mozaikaları ilə məşhurdur.",
      "en": "Completed in 537 under Emperor Justinian, Hagia Sophia is a masterpiece of Byzantine architecture. It later served as a mosque and museum before becoming a mosque again in 2020, and is renowned for its vast dome and surviving mosaics.",
      "ru": "Айя-София, завершённая в 537 году при императоре Юстиниане, — шедевр византийской архитектуры. Позднее она была мечетью и музеем, а в 2020 году вновь стала мечетью; особенно известны её огромный купол и сохранившиеся мозаики."
    },
    "tip": {
      "az": "Turist girişini əvvəlcədən yoxlayın və çiyinləri, dizləri örtən geyim seçin; qadınlar baş örtüyü götürsün.",
      "en": "Check the visitor entrance and wear clothing covering shoulders and knees; women should bring a headscarf.",
      "ru": "Заранее уточните туристический вход и наденьте одежду, закрывающую плечи и колени; женщинам стоит взять платок."
    }
  },
  "kapali-carsi": {
    "address": {
      "az": "Kalpakçılar küçəsi, Beyazıt, Fatih, İstanbul",
      "en": "Kalpakçılar Caddesi, Beyazıt, Fatih, Istanbul",
      "ru": "Kalpakçılar Caddesi, Беязыт, Фатих, Стамбул"
    },
    "hours": {
      "az": "Ziyarət saatları təsdiqlənməyib. Getməzdən əvvəl məkanla dəqiqləşdirin.",
      "en": "Visiting hours are not confirmed. Check with the venue before visiting.",
      "ru": "Часы посещения не подтверждены. Уточните перед визитом."
    },
    "about": {
      "az": "XV əsrdə əsası qoyulan Qapalıçarşı dünyanın ən məşhur tarixi örtülü bazarlarındandır. Tağlı keçidlər boyunca zərgərlik, xalça, keramika, dəri məmulatları və suvenir mağazaları yerləşir.",
      "en": "Founded in the fifteenth century, the Grand Bazaar is one of the world’s best-known historic covered markets. Its vaulted lanes contain shops selling jewellery, carpets, ceramics, leather goods and souvenirs.",
      "ru": "Основанный в XV веке Гранд-базар — один из самых известных исторических крытых рынков мира. В его сводчатых проходах продают украшения, ковры, керамику, кожаные изделия и сувениры."
    },
    "tip": {
      "az": "Böyük alış etməzdən əvvəl bir neçə mağazada qiymətləri müqayisə edin.",
      "en": "Compare prices in several shops before making a substantial purchase.",
      "ru": "Перед крупной покупкой сравните цены в нескольких магазинах."
    }
  },
  "mavi-kilse": {
    "address": {
      "az": "Bezručova 2, Bratislava",
      "en": "Bezručova 2, Bratislava",
      "ru": "Bezručova, 2, Братислава"
    },
    "hours": {
      "az": "B.e., ç.a., ç., ş.: 06:30–07:30\nC.a., c.: 17:30–19:00\nBazar: 07:30–11:00 və 17:30–19:00\nİbadət zamanı sakitliyə riayət edin",
      "en": "Mon, Tue, Wed, Sat: 06:30–07:30\nThu, Fri: 17:30–19:00\nSun: 07:30–11:00 & 17:30–19:00\nPlease respect worship",
      "ru": "Пн, вт, ср, сб: 06:30–07:30\nЧт, пт: 17:30–19:00\nВс: 07:30–11:00 и 17:30–19:00\nСоблюдайте тишину во время служб"
    },
    "about": {
      "az": "Müqəddəs Yelizaveta kilsəsi mavi fasadı və şirli kirəmitlərinə görə Mavi kilsə adlanır. Ödön Lechnerin layihəsi ilə 1909–1913-cü illərdə tikilmiş bina macar secession üslubunun seçilən nümunəsidir.",
      "en": "The Church of St. Elizabeth is known as the Blue Church for its pastel-blue façade and glazed roof tiles. Built in 1909–1913 to designs by Ödön Lechner, it is a distinctive example of Hungarian Secession architecture.",
      "ru": "Церковь Святой Елизаветы называют Голубой церковью из-за пастельно-голубого фасада и глазурованной черепицы. Построенная в 1909–1913 годах по проекту Эдёна Лехнера, она представляет венгерский сецессион."
    },
    "tip": {
      "az": "İçəri girmək istəyirsinizsə, kilsə qapısındakı ibadət cədvəlini yoxlayın və mərasimə mane olmayın.",
      "en": "Check the service timetable at the entrance if you want to see inside, and avoid disturbing worship.",
      "ru": "Если хотите зайти внутрь, проверьте расписание служб у входа и не мешайте богослужению."
    },
    "source": "https://www.bluechurch.sk/"
  },
  "ufo-korpusu": {
    "address": {
      "az": "Most SNP, 851 01 Bratislava",
      "en": "Most SNP, 851 01 Bratislava",
      "ru": "Most SNP, 851 01 Братислава"
    },
    "hours": {
      "az": "Baxış meydançası və bar: 10:00–23:00\nRestoran: 12:00–23:00\nİldə 364 gün açıqdır",
      "en": "Observation deck & bar: 10:00–23:00\nRestaurant: 12:00–23:00\nOpen 364 days a year",
      "ru": "Смотровая площадка и бар: 10:00–23:00\nРесторан: 12:00–23:00\nОткрыто 364 дня в году"
    },
    "about": {
      "az": "1972-ci ildə açılan Most SNP körpüsü uçan boşqabı xatırladan qülləüstü qurğusu ilə tanınır. Burada restoran və Dunay, qala, Köhnə şəhərə panoramik mənzərəsi olan açıq baxış meydançası yerləşir.",
      "en": "Opened in 1972, Most SNP is recognised by the flying-saucer-shaped structure above its pylon. It contains a restaurant and an open-air observation deck overlooking the Danube, castle and Old Town.",
      "ru": "Мост СНП, открытый в 1972 году, известен конструкцией в форме летающей тарелки над пилоном. В ней расположены ресторан и открытая смотровая площадка с видом на Дунай, замок и Старый город."
    },
    "tip": {
      "az": "Baxış meydançası üçün görünüşün yaxşı olduğu açıq hava gününü seçin.",
      "en": "Choose a clear day for the best visibility from the observation deck.",
      "ru": "Для посещения смотровой площадки выбирайте ясный день с хорошей видимостью."
    },
    "source": "https://www.u-f-o.sk/information"
  },
  "stefan-kilsesi": {
    "address": {
      "az": "Stephansplatz 3, 1010 Vyana",
      "en": "Stephansplatz 3, 1010 Vienna",
      "ru": "Stephansplatz, 3, 1010 Вена"
    },
    "hours": {
      "az": "Kafedral: b.e.–ş. 06:00–22:00; bazar və bayramlar 07:00–22:00\nTurist ziyarəti: b.e.–ş. 09:00–11:30 və 13:00–16:30; bazar və bayramlar 13:00–16:30",
      "en": "Cathedral: Mon–Sat 06:00–22:00; Sun & holidays 07:00–22:00\nSightseeing: Mon–Sat 09:00–11:30 & 13:00–16:30; Sun & holidays 13:00–16:30",
      "ru": "Собор: пн–сб 06:00–22:00; вс и праздники 07:00–22:00\nОсмотр: пн–сб 09:00–11:30 и 13:00–16:30; вс и праздники 13:00–16:30"
    },
    "about": {
      "az": "Müqəddəs Stefan kafedralı orta əsr Vyanasının əsas dini abidəsi və şəhərin simvoludur. Qotik cənub qülləsi, rəngli kirəmit damı, bəzəkli interyeri və katakombaları ilə tanınır.",
      "en": "St. Stephen’s Cathedral is Vienna’s principal medieval religious landmark and a symbol of the city. It is known for its Gothic south tower, patterned tile roof, ornate interior and catacombs.",
      "ru": "Собор Святого Стефана — главный средневековый религиозный памятник Вены и символ города. Он известен готической южной башней, узорчатой черепичной крышей, богато оформленным интерьером и катакомбами."
    },
    "tip": {
      "az": "Pilləkənlə qalxmaq çətindirsə, cənub qülləsi əvəzinə liftli şimal qülləsinin girişini yoxlayın.",
      "en": "If stairs are difficult, check access to the north tower’s lift rather than climbing the south tower.",
      "ru": "Если подъём по лестницам затруднителен, уточните доступ к лифту северной башни вместо подъёма на южную."
    },
    "source": "https://stephanskirche.at/visit.php"
  },
  "naschmarkt": {
    "address": {
      "az": "Wienzeile, 1060 Vyana",
      "en": "Wienzeile, 1060 Vienna",
      "ru": "Wienzeile, 1060 Вена"
    },
    "hours": {
      "az": "Piştaxtaların icazə verilən maksimum saatları: b.e.–c. 06:00–21:00; ş. 06:00–18:00\nRestoran/barlar: b.e.–ş. 06:00–23:00; bazar və bayramlar 09:00–21:00\nFərdi məkanların saatları dəyişə bilər",
      "en": "Maximum permitted stall hours: Mon–Fri 06:00–21:00; Sat 06:00–18:00\nRestaurants/bars: Mon–Sat 06:00–23:00; Sun & holidays 09:00–21:00\nIndividual opening hours may vary",
      "ru": "Максимально разрешённые часы прилавков: пн–пт 06:00–21:00; сб 06:00–18:00\nРестораны/бары: пн–сб 06:00–23:00; вс и праздники 09:00–21:00\nЧасы отдельных заведений могут отличаться"
    },
    "about": {
      "az": "Naschmarkt Vyananın ən tanınmış ərzaq bazarıdır və kökləri XVI əsrə gedib çıxır. Piştaxtalarda təzə məhsullar, pendirlər, ədviyyatlar və beynəlxalq delikateslər satılır; şənbə günləri yaxınlıqda bit bazarı qurulur.",
      "en": "Naschmarkt is Vienna’s best-known food market, with roots reaching back to the sixteenth century. Stalls sell produce, cheeses, spices and international delicacies, while a nearby flea market operates on Saturdays.",
      "ru": "Нашмаркт — самый известный продуктовый рынок Вены, история которого восходит к XVI веку. Здесь продают свежие продукты, сыры, специи и деликатесы разных стран, а по субботам рядом работает блошиный рынок."
    },
    "tip": {
      "az": "Ərzaq alış-verişi üçün səhər gəlin, çünki bəzi piştaxtalar rəsmi bağlanışdan əvvəl işini bitirir.",
      "en": "Come in the morning for food shopping, as some stalls close before the official closing time.",
      "ru": "За продуктами приходите утром: некоторые прилавки закрываются раньше официального окончания работы."
    },
    "source": "https://www.wien.gv.at/freizeit/naschmarkt"
  }
};
