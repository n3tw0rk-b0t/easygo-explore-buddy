import photo0 from "@/assets/places/gallery/alov-qulleleri-3.jpg.asset.json";
import photo1 from "@/assets/places/gallery/icerisheher-2.jpg.asset.json";
import photo2 from "@/assets/places/gallery/qiz-qalasi-2.jpg.asset.json";
import photo3 from "@/assets/places/gallery/qiz-qalasi-3.jpg.asset.json";
import photo4 from "@/assets/places/gallery/baki-bulvari-3.jpg.asset.json";
import photo5 from "@/assets/places/gallery/azerbaycan-xalca-muzeyi-3.jpg.asset.json";
import photo6 from "@/assets/places/gallery/baki-zooloji-parki-2.jpg.asset.json";
import photo7 from "@/assets/places/gallery/nizami-kucesi-kafeleri-3.jpg.asset.json";
import photo8 from "@/assets/places/gallery/merkezi-mall-2.jpg.asset.json";
import photo9 from "@/assets/places/gallery/merkezi-mall-3.jpg.asset.json";
import photo10 from "@/assets/places/gallery/yasil-bazar-2.jpg.asset.json";
import photo11 from "@/assets/places/gallery/teze-pir-mescidi-2.jpg.asset.json";
import photo12 from "@/assets/places/gallery/sultanahmet-3.jpg.asset.json";
import photo13 from "@/assets/places/gallery/galata-qullesi-3.jpg.asset.json";
import photo14 from "@/assets/places/gallery/istanbul-muasir-muzeyi-2.jpg.asset.json";
import photo15 from "@/assets/places/gallery/istanbul-muasir-muzeyi-3.jpg.asset.json";
import photo16 from "@/assets/places/gallery/kapali-carsi-2.jpg.asset.json";
import photo17 from "@/assets/places/gallery/bratislava-kohne-seher-3.jpg.asset.json";
import photo18 from "@/assets/places/gallery/bratislava-qalasi-3.jpg.asset.json";
import photo19 from "@/assets/places/gallery/dunay-sahili-2.jpg.asset.json";
import photo20 from "@/assets/places/gallery/dunay-sahili-3.jpg.asset.json";
import photo21 from "@/assets/places/gallery/mavi-kilse-3.jpg.asset.json";
import photo22 from "@/assets/places/gallery/ufo-korpusu-3.jpg.asset.json";
import photo23 from "@/assets/places/gallery/schonbrunn-2.jpg.asset.json";
import photo24 from "@/assets/places/gallery/vyana-tarixi-merkezi-3.jpg.asset.json";
import photo25 from "@/assets/places/gallery/prater-2.jpg.asset.json";
import photo26 from "@/assets/places/gallery/prater-3.jpg.asset.json";
import photo27 from "@/assets/places/gallery/dunay-parki-2.jpg.asset.json";
import photo28 from "@/assets/places/gallery/dunay-parki-3.jpg.asset.json";
import photo29 from "@/assets/places/gallery/stefan-kilsesi-2.jpg.asset.json";
import photo30 from "@/assets/places/gallery/stefan-kilsesi-3.jpg.asset.json";
import photo31 from "@/assets/places/gallery/naschmarkt-3.jpg.asset.json";
import photo32 from "@/assets/places/gallery/kapali-carsi-12.jpg.asset.json";
import photo33 from "@/assets/places/gallery/ayasofya-12.jpg.asset.json";
import photo34 from "@/assets/places/gallery/bosfor-sahili-12.jpg.asset.json";
import photo35 from "@/assets/places/gallery/slovakiya-milli-qalereyasi-12.jpg.asset.json";
import photo36 from "@/assets/places/gallery/vyana-tarixi-merkezi-12.jpg.asset.json";
import photo37 from "@/assets/places/gallery/icerisheher-12.jpg.asset.json";
import photo38 from "@/assets/places/gallery/mavi-kilse-12.jpg.asset.json";
import photo39 from "@/assets/places/gallery/dagustu-park-22.jpg.asset.json";
import photo40 from "@/assets/places/gallery/heyder-eliyev-merkezi-3.jpg.asset.json";

export interface GalleryPhoto { image: string; artist: string; license: string; source: string }

export const PLACE_GALLERY_PHOTOS: Record<string, GalleryPhoto[]> = {
  "alov-qulleleri": [
    { image: photo0.url, artist: "Xoncha", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AFlame%20towers%20from%20Baku%20boulevard.JPG" },
  ],
  "icerisheher": [
    { image: photo1.url, artist: "Diego Delso", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AFuente%20en%20Baku%2C%20Azerbaiy%C3%A1n%2C%202016-09-26%2C%20DD%20227-229%20HDR.jpg" },
    { image: photo37.url, artist: "Matti Blume", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Icheri_Sheher,_Baku_(P1090263).jpg" },
  ],
  "qiz-qalasi": [
    { image: photo2.url, artist: "Derek Jones, uploaded by Jacobolus 09:16, 17 Jan 2005 (UTC)", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File%3ABaku%20Maiden%20Tower.jpg" },
    { image: photo3.url, artist: "AlixSaz", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AMaiden%20Tower%20in%20Baku%202015.jpg" },
  ],
  "baki-bulvari": [
    { image: photo4.url, artist: "Matti Blume", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3ABBMM%2C%20Baku%20%28P1090265%29.jpg" },
  ],
  "azerbaycan-xalca-muzeyi": [
    { image: photo5.url, artist: "Bernard Gagnon", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File%3ATombstone%20in%20Azerbaijan%20Carpet%20Museum.jpg" },
  ],
  "baki-zooloji-parki": [
    { image: photo6.url, artist: "Rzv Rauf", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3ABaku%20Zoo.jpg" },
  ],
  "nizami-kucesi-kafeleri": [
    { image: photo7.url, artist: "Shikhlinski", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3ANizami%20street-Baku-01.jpg" },
  ],
  "merkezi-mall": [
    { image: photo8.url, artist: "Gulustan", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3AParkbulvar%202162.jpg" },
    { image: photo9.url, artist: "Stomatoloq Fərid Zey…", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3APark%20Bulvar%20-%20panoramio.jpg" },
  ],
  "yasil-bazar": [
    { image: photo10.url, artist: "Asif Masimov (masimovasif.net)", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AYashil%20bazar.jpg" },
  ],
  "teze-pir-mescidi": [
    { image: photo11.url, artist: "Petar Milošević", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3ADome%20of%20Taza%20Pir%20Mosque%2C%20Baku%2C%20Azerbaijan.jpg" },
  ],
  "sultanahmet": [
    { image: photo12.url, artist: "Sourabh.biswas003", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:PXL_20241211_074621005_Sultanahmet_Square_Istanbul,_Turkiye_19.jpg" },
  ],
  "galata-qullesi": [
    { image: photo13.url, artist: "Julian Lupyan", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Ceiling_of_Galata_Tower.jpg" },
  ],
  "istanbul-muasir-muzeyi": [
    { image: photo14.url, artist: "Kadı Kadı", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:%C4%B0stanbul_Modern_(10072023).jpg" },
    { image: photo15.url, artist: "Freedom's Falcon", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Istanbul_Modern_Art_Museum_50.jpg" },
  ],
  "kapali-carsi": [
    { image: photo16.url, artist: "Martin Falbisoner", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Sample_of_Tee_-_Grand_Bazaar.JPG" },
    { image: photo32.url, artist: "Bahnfrend", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Grand_Bazaar,_Istanbul,_2007_(05).JPG" },
  ],
  "bratislava-kohne-seher": [
    { image: photo17.url, artist: "Radler59 (talk)", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Bratislava_Old_Town_Hall-01.jpg" },
  ],
  "bratislava-qalasi": [
    { image: photo18.url, artist: "Jakub Hałun", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Bratislava_Castle,_20210727_1058_0316.jpg" },
  ],
  "dunay-sahili": [
    { image: photo19.url, artist: "Dguendel", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Bratislava,_promenade_along_Danube.jpg" },
    { image: photo20.url, artist: "Dguendel", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Bratislava,_Eurovea,_Danube_promenade.JPG" },
  ],
  "mavi-kilse": [
    { image: photo21.url, artist: "Marc Ryckaert (MJJR)", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Bratislava_Blue_Church_R01.jpg" },
    { image: photo38.url, artist: "Thomas Ledl", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Blue_Church,_Bratislava_01.jpg" },
  ],
  "ufo-korpusu": [
    { image: photo22.url, artist: "Jules Verne Times Two", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Mural_on_one_of_the_pillars_of_the_Most_SNP_(Bridge_of_the_Slovak_National_Uprising)_(Bratislava,_Slovakia)_julesvernex2.jpg" },
  ],
  "schonbrunn": [
    { image: photo23.url, artist: "Diego Delso", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Palacio_de_Sch%C3%B6nbrunn,_Viena,_Austria,_2020-02-02,_DD_10.jpg" },
  ],
  "vyana-tarixi-merkezi": [
    { image: photo24.url, artist: "Dietmar Rabich", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wien,_Stephansdom,_Blick_vom_S%C3%BCdturm_--_2018_--_3282.jpg" },
    { image: photo36.url, artist: "Dimitry Anikin", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Stephansplatz_Wien.jpg" },
  ],
  "prater": [
    { image: photo25.url, artist: "Robert F. Tobler", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Giant_Ferris_Wheel_Vienna_from_W_on_2010-09-20.jpg" },
    { image: photo26.url, artist: "Dietmar Rabich", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wien,_Prater,_Riesenrad_--_2018_--_3163.jpg" },
  ],
  "dunay-parki": [
    { image: photo27.url, artist: "Manfred Werner (Tsui)", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Donaupark_Wien_2019-07-12_Irissee_15_Ente.jpg" },
    { image: photo28.url, artist: "Manfred Werner - Tsui", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Donaupark_Wien_Irissee_Koreanisches_Kulturhaus_2016_a.jpg" },
  ],
  "stefan-kilsesi": [
    { image: photo29.url, artist: "Uoaei1", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Stephansdom_Barbarakapelle_Gew%C3%B6lbe_01.JPG" },
    { image: photo30.url, artist: "C.Stadler/Bwag", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Wien_-_Stephansdom_(1).JPG" },
  ],
  "naschmarkt": [
    { image: photo31.url, artist: "Slyronit", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Naschmarkt,_Vienna.jpg" },
  ],
  "ayasofya": [
    { image: photo33.url, artist: "Dean Strelau", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Interior_of_Hagia_Sophia.jpg" },
  ],
  "bosfor-sahili": [
    { image: photo34.url, artist: "flowcomm", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Istanbul,_Turkey_Bosporus.jpg" },
  ],
  "slovakiya-milli-qalereyasi": [
    { image: photo35.url, artist: "Fred Romero from Paris, France", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Bratislava_-_Slovensk%C3%A1_n%C3%A1rodn%C3%A1_gal%C3%A9ria_(SNG).jpg" },
  ],
  "dagustu-park": [
    { image: photo39.url, artist: "Gulustan", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Panoramic_Baku.jpg" },
  ],
  "heyder-eliyev-merkezi": [
    { image: photo40.url, artist: "Fanti Salms", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AHeydar%20Aliyev%20International%20Conference%20Center%20Baku%20Azerbaijan.jpg" },
  ],
};
