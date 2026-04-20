import logoUrl from "@/assets/trevo-logo.jpg";

export const Logo = ({ className = "" }: { className?: string }) => (
  <img src={logoUrl} alt="Trevo Filmes" className={className} />
);
