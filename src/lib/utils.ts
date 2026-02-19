// src/lib/utils.ts

const WA_PHONE_NUMBER = "6282240072717";

// format currency
const formatCurrency = (amount: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// parse JSON safely
const safeJsonParse = <T>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return defaultValue;
  }
};

const handlePesanWA = (paket: string) => {
  const nomorWA = WA_PHONE_NUMBER;
  let pesan = "";

  if (paket === "Tanya-tanya" || paket === "Umum") {
    pesan =
      "Halo Admin, saya mau bikin NPWP 30 menit jadi. Bayar setelah jadi kan?";
  } else {
    pesan = `Halo Admin, saya mau ambil *${paket}*. Apa benar bayar setelah dokumen jadi?`;
  }

  const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const encodeSlug = (slug: string) => encodeURIComponent(slug);

export { formatCurrency, safeJsonParse, handlePesanWA, slugify, encodeSlug };
