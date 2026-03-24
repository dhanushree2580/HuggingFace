import { Link } from "react-router-dom";

export default function HFFooter() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="hf-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">Website</h3>
            <ul className="space-y-2">
              {["Models", "Datasets", "Spaces", "Pricing", "Docs"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">Company</h3>
            <ul className="space-y-2">
              {["About", "Brand", "Terms of Service", "Privacy", "Jobs"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "Blog", "Forum", "GitHub", "Status"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">Social</h3>
            <ul className="space-y-2">
              {["Twitter", "LinkedIn", "Discord", "YouTube"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© 2024 Hugging Face Clone. Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
