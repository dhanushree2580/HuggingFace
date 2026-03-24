import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Log In</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back to Hugging Face</p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Sign in with email</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full hf-btn-primary py-2.5 text-sm disabled:opacity-50">
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="hf-link font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
