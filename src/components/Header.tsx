import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Header = () => (
  <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-30">
    <div className="container flex items-center justify-between py-4">
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
        <Logo className="h-12 w-12 object-contain" />
        <div className="hidden sm:block">
          <h1 className="font-brand text-2xl text-secondary leading-none">Trevo Filmes</h1>
          <p className="text-xs text-muted-foreground">Contrato online</p>
        </div>
      </Link>
      <a
        href="https://wa.me/5521993363808"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-muted-foreground hover:text-primary transition-smooth"
      >
        Precisa de ajuda?
      </a>
    </div>
  </header>
);
