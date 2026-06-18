import { create } from "zustand";
import { Plan } from "@/data/plans";

export type PaymentMethod = "pix-vista" | "pix-2x" | "cartao-6x";

export interface ContractData {
  // Plano
  plan: Plan | null;
  extraHours: number;
  selectedOptionals: string[]; // ids
  paymentMethod: PaymentMethod | null;

  // Contratante
  nomeContratante: string;
  cpf: string;
  telefone: string;
  endereco: string;
  email: string;

  // Evento
  localEvento: string;
  dataEvento: string;
  horarioInicio: string;
  horarioFim: string;

  // Aniversariante
  nomeAniversariante: string;
  idadeAniversariante: string;

  // Autorizações
  usoImagem: "autoriza" | "nao-autoriza" | "";
  liEConcordo: boolean;
}

interface ContractStore extends ContractData {
  setPlan: (p: Plan) => void;
  update: (data: Partial<ContractData>) => void;
  toggleOptional: (id: string) => void;
  reset: () => void;
}

const initial: ContractData = {
  plan: null,
  extraHours: 0,
  selectedOptionals: [],
  paymentMethod: null,
  nomeContratante: "",
  cpf: "",
  telefone: "",
  endereco: "",
  email: "",
  localEvento: "",
  dataEvento: "",
  horarioInicio: "",
  horarioFim: "",
  nomeAniversariante: "",
  idadeAniversariante: "",
};

export const useContract = create<ContractStore>((set) => ({
  ...initial,
  setPlan: (plan) => set({ plan, extraHours: 0, selectedOptionals: [] }),
  update: (data) => set(data),
  toggleOptional: (id) =>
    set((s) => ({
      selectedOptionals: s.selectedOptionals.includes(id)
        ? s.selectedOptionals.filter((x) => x !== id)
        : [...s.selectedOptionals, id],
    })),
  reset: () => set(initial),
}));
