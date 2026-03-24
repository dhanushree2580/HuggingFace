import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const HFLogo = () => (
  <svg className="h-7 w-7" viewBox="0 0 95 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.2119 76.5C56.5 76.5 64.0238 73.0829 69.7838 66.2488C69.3052 61.7592 67.4532 57.8598 64.2282 54.5507C60.6998 50.9295 56.2174 49.119 50.7812 49.119H43.6425C38.2063 49.119 33.7239 50.9295 30.1955 54.5507C26.9706 57.8598 25.1185 61.7592 24.64 66.2488C30.4 73.0829 37.9238 76.5 47.2119 76.5Z" fill="currentColor"/>
    <path d="M36.69 37.5C39.9 37.5 42.5 34.9 42.5 31.69V26.81C42.5 23.6 39.9 21 36.69 21C33.48 21 30.88 23.6 30.88 26.81V31.69C30.88 34.9 33.48 37.5 36.69 37.5Z" fill="currentColor"/>
    <path d="M57.73 37.5C60.94 37.5 63.54 34.9 63.54 31.69V26.81C63.54 23.6 60.94 21 57.73 21C54.52 21 51.92 23.6 51.92 26.81V31.69C51.92 34.9 54.52 37.5 57.73 37.5Z" fill="currentColor"/>
    <path d="M47.21 0C21.14 0 0 19.7 0 44C0 68.3 21.14 88 47.21 88C73.28 88 94.42 68.3 94.42 44C94.42 19.7 73.28 0 47.21 0ZM47.21 82.54C24.15 82.54 5.46 65.28 5.46 44C5.46 22.72 24.15 5.46 47.21 5.46C70.27 5.46 88.96 22.72 88.96 44C88.96 65.28 70.27 82.54 47.21 82.54Z" fill="currentColor"/>
  </svg>
);

export default function HFHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: "Models", href: "/models" },
    { label: "Datasets", href: "/datasets" },
    { label: "Spaces", href: "/spaces" },
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="hf-container flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 text-foreground hover:text-primary transition-colors">
          <HFLogo />
          <span className="font-semibold text-lg hidden sm:block">Hugging Face</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search + Auth */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, datasets, users..."
                className="w-48 sm:w-64 px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors">
              <Search className="h-5 w-5" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2">
            <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="hf-btn-primary text-sm py-1.5">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-border mt-2">
              <Link to="/login" className="flex-1 text-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg">
                Log In
              </Link>
              <Link to="/signup" className="flex-1 text-center hf-btn-primary text-sm py-2">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
