import { describe, it, expect } from "vitest";
import { generateContractText } from "@/lib/contract-text";
import { calcPrice } from "@/lib/pricing";
import { plans } from "@/data/plans";
import type { ContractData } from "@/store/contract";

const baseData = (planId: string, dataEvento: string): ContractData => ({
  plan: plans.find((p) => p.id === planId)!,
  extraHours: 0,
  selectedOptionals: [],
  paymentMethod: "pix-2x",
  nomeContratante: "Juliana Vieira Souza",
  cpf: "090.039.727-61",
  telefone: "21993363808",
  endereco: "Av. Brás De Pina 1731, Casa 22",
  email: "julipepper@gmail.com",
  localEvento: "Salão de Festas",
  dataEvento,
  horarioInicio: "14:00",
  horarioFim: "18:00",
  nomeAniversariante: "Maria",
  idadeAniversariante: "5",
  usoImagem: "autoriza",
  liEConcordo: true,
});

describe("event date in the generated contract", () => {
  it("shows the photo contract date exactly as typed (10/08/2026)", () => {
    const data = baseData("foto-ouro", "2026-08-10");
    const text = generateContractText(data, calcPrice(data.plan!, 0, [], "pix-2x"));
    expect(text).toContain("Data: 10/08/2026");
    expect(text).not.toContain("09/08/2026");
  });

  it("shows the video contract date exactly as typed (10/08/2026)", () => {
    const data = baseData("video-ouro", "2026-08-10");
    const text = generateContractText(data, calcPrice(data.plan!, 0, [], "pix-2x"));
    expect(text).toContain("Data: 10/08/2026");
    expect(text).not.toContain("09/08/2026");
  });
});
