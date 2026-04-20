export type Category = "foto" | "video" | "foto-video";

export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  features: string[];
  priceCard: number; // valor cartão / referência
  pricePix?: number; // se aplicável (com desconto)
  hourExtra: number;
  professionals: number;
}

export const plans: Plan[] = [
  // ===== FOTO + VÍDEO =====
  {
    id: "infantil-1",
    name: "Plano 1",
    subtitle: "Foto + Vídeo Completo",
    category: "foto-video",
    professionals: 2,
    hourExtra: 400,
    priceCard: 2760,
    pricePix: 2484,
    features: [
      "1 fotógrafo + 1 videomaker",
      "4 horas de cobertura",
      "Tratamento de TODAS as fotos (Lightroom)",
      "Quantidade de fotos ilimitada",
      "Fotos em alta resolução",
      "Vídeo de 8 a 10 min + teaser de 2 a 3 min",
      "Entrega digital (link por e-mail)",
    ],
  },
  {
    id: "infantil-2",
    name: "Plano 2",
    subtitle: "Foto + Teaser",
    category: "foto-video",
    professionals: 2,
    hourExtra: 400,
    priceCard: 2250,
    pricePix: 2025,
    features: [
      "1 fotógrafo + 1 videomaker",
      "100 fotos do seu evento",
      "3 horas de cobertura",
      "Tratamento de TODAS as fotos (Lightroom)",
      "1 vídeo teaser",
      "Entrega digital (link por e-mail)",
    ],
  },
  {
    id: "infantil-3",
    name: "Plano 3",
    subtitle: "Foto + Reels",
    category: "foto-video",
    professionals: 1,
    hourExtra: 400,
    priceCard: 1780,
    pricePix: 1602,
    features: [
      "1 fotógrafo",
      "4 horas de cobertura",
      "Tratamento de TODAS as fotos (Lightroom)",
      "Fotos ilimitadas em alta resolução",
      "1 reels de até 1 minuto",
      "Entrega digital (link por e-mail)",
    ],
  },

  // ===== FOTO =====
  {
    id: "ouro-foto",
    name: "Pacote Ouro",
    subtitle: "Foto Completo",
    category: "foto",
    professionals: 1,
    hourExtra: 250,
    priceCard: 1450,
    features: [
      "1 fotógrafo",
      "4 horas de cobertura fotográfica",
      "Tratamento de TODAS as fotos (Lightroom)",
      "Fotos ilimitadas em alta resolução",
      "Entrega digital (link por e-mail)",
    ],
  },
  {
    id: "prata-foto",
    name: "Prata",
    subtitle: "100 fotos",
    category: "foto",
    professionals: 1,
    hourExtra: 250,
    priceCard: 1220,
    features: [
      "1 fotógrafo",
      "3 horas de cobertura fotográfica",
      "Tratamento de TODAS as fotos (Lightroom)",
      "100 fotos do seu evento",
      "Entrega digital em alta resolução",
    ],
  },

  // ===== VÍDEO =====
  {
    id: "diamante",
    name: "Diamante",
    subtitle: "Compacto + Teaser",
    category: "video",
    professionals: 2,
    hourExtra: 400,
    priceCard: 2300,
    features: [
      "2 profissionais",
      "4 horas de cobertura",
      "Vídeo compacto de 15 a 20 min",
      "Teaser de aproximadamente 2 min",
      "1 vídeo vertical de até 1 min",
      "Opção de gravar depoimento (avisar antes)",
      "Entrega digital (link por e-mail)",
    ],
  },
  {
    id: "ouro-video",
    name: "Ouro",
    subtitle: "Resumo + Teaser",
    category: "video",
    professionals: 1,
    hourExtra: 400,
    priceCard: 1590,
    features: [
      "1 profissional",
      "4 horas de cobertura",
      "Vídeo resumo de 8 a 10 min",
      "Teaser de aproximadamente 2 min",
      "1 vídeo vertical de até 1 min",
      "Entrega digital (link por e-mail)",
    ],
  },
  {
    id: "bronze-video",
    name: "Bronze",
    subtitle: "Teaser",
    category: "video",
    professionals: 1,
    hourExtra: 400,
    priceCard: 1100,
    features: [
      "1 profissional",
      "3h de cobertura",
      "1 vídeo de aproximadamente 2 min",
      "1 vídeo vertical de até 1 min",
      "Entrega digital (link por e-mail)",
    ],
  },
];

export interface Optional {
  id: string;
  name: string;
  price: number;
  unit?: string;
}

export const optionals: Optional[] = [
  { id: "album-23", name: "Álbum 23x31 cm — Capa fotográfica", price: 1250 },
  { id: "album-20", name: "Álbum 20x20 cm — Capa fotográfica", price: 950 },
];

export const categoryInfo: Record<Category, { label: string; description: string; emoji: string }> = {
  foto: { label: "Foto", description: "Cobertura fotográfica profissional", emoji: "📸" },
  video: { label: "Vídeo", description: "Cobertura em vídeo cinematográfica", emoji: "🎬" },
  "foto-video": { label: "Foto + Vídeo", description: "Cobertura completa do seu evento", emoji: "✨" },
};

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
