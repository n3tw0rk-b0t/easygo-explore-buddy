import { useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CATEGORIES } from "@/data/categories";
import { CITIES } from "@/data/cities";
import type { CityId, Lang } from "@/data/types";
import { communityPlacesQuery } from "@/hooks/use-all-places";
import { addCommunityPlace } from "@/lib/community.functions";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/add-place")({
  head: () => ({
    meta: [
      { title: "Add a place — EasyGo AI" },
      { name: "description", content: "Share a favourite place with photos and details so others can discover it on EasyGo AI." },
      { property: "og:title", content: "Add a place — EasyGo AI" },
      { property: "og:description", content: "Share a favourite place with photos and details on EasyGo AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AddPlace,
});

const COPY: Record<Lang, Record<string, string>> = {
  az: { title: "Yeni məkan əlavə et", helper: "Sevdiyiniz məkanı paylaşın — hamı görə biləcək.", photo: "Şəkil seç", name: "Məkanın adı", city: "Şəhər", category: "Kateqoriya", address: "Ünvan (istəyə bağlı)", desc: "Qısa təsvir", save: "Əlavə et", saving: "Yüklənir…", ok: "Məkan əlavə edildi!", needPhoto: "Zəhmət olmasa şəkil seçin.", invalid: "Ad (2+) və təsvir (10+ simvol) tələb olunur." },
  en: { title: "Add a new place", helper: "Share a place you love — everyone will be able to see it.", photo: "Choose photo", name: "Place name", city: "City", category: "Category", address: "Address (optional)", desc: "Short description", save: "Add place", saving: "Uploading…", ok: "Place added!", needPhoto: "Please choose a photo.", invalid: "Name (2+) and description (10+ characters) are required." },
  ru: { title: "Добавить новое место", helper: "Поделитесь любимым местом — его увидят все.", photo: "Выбрать фото", name: "Название места", city: "Город", category: "Категория", address: "Адрес (необязательно)", desc: "Краткое описание", save: "Добавить", saving: "Загрузка…", ok: "Место добавлено!", needPhoto: "Пожалуйста, выберите фото.", invalid: "Нужны название (2+) и описание (10+ символов)." },
};

async function resizeImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function AddPlace() {
  const { lang, tr, cityId: currentCity, t } = useAppState();
  const c = COPY[lang];
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const save = useServerFn(addCommunityPlace);

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [cityId, setCityId] = useState<CityId>(currentCity);
  const [category, setCategory] = useState("parks");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const field = "w-full rounded-2xl border border-border bg-card p-3 text-base text-foreground outline-none focus:border-primary";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!image) return setError(c.needPhoto);
    if (name.trim().length < 2 || description.trim().length < 10) return setError(c.invalid);
    setBusy(true);
    setError(null);
    try {
      const res = await save({ data: { name, description, address, cityId, category, image } });
      if (!res.ok) return setError(res.message);
      await queryClient.invalidateQueries({ queryKey: communityPlacesQuery.queryKey });
      toast(c.ok);
      navigate({ to: "/place/$slug", params: { slug: res.slug } });
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="mx-auto w-full max-w-[560px] safe-x px-4 pb-16 pt-4 lg:pt-8">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-alt-foreground shadow-soft hover:bg-secondary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("backHome")}
        </Link>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">{c.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{c.helper}</p>

        <form onSubmit={submit} className="mt-5 grid gap-4">
          <label className="block cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-border bg-card">
            {image ? (
              <img src={image} alt="" className="h-52 w-full object-cover" />
            ) : (
              <span className="flex h-52 flex-col items-center justify-center gap-2 text-sm font-semibold text-primary">
                <ImagePlus className="h-8 w-8" aria-hidden="true" />
                {c.photo}
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label={c.photo}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) setImage(await resizeImage(file));
              }}
            />
          </label>

          <label className="grid gap-1 text-sm font-semibold text-foreground">
            {c.name}
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className={field} />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1 text-sm font-semibold text-foreground">
              {c.city}
              <select value={cityId} onChange={(e) => setCityId(e.target.value as CityId)} className={field}>
                {CITIES.map((city) => (
                  <option key={city.id} value={city.id}>{tr(city.name)}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-semibold text-foreground">
              {c.category}
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
                {CATEGORIES.filter((x) => x.id !== "popular").map((x) => (
                  <option key={x.id} value={x.id}>{tr(x.label)}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-1 text-sm font-semibold text-foreground">
            {c.address}
            <input value={address} onChange={(e) => setAddress(e.target.value)} maxLength={160} className={field} />
          </label>

          <label className="grid gap-1 text-sm font-semibold text-foreground">
            {c.desc}
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={600} rows={4} className={`${field} resize-none`} />
          </label>

          {error ? <p role="alert" className="text-sm font-medium text-destructive">{error}</p> : null}

          <button type="submit" disabled={busy} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary-hover disabled:opacity-70">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {busy ? c.saving : c.save}
          </button>
        </form>
      </div>
    </div>
  );
}
