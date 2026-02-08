import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("cybertrace_token");
    if (!token) navigate("/auth", { replace: true });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("cybertrace_token");
    toast({ title: "Session ended", description: "You have been logged out." });
    navigate("/auth", { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 cyber-bg" />
      <div className="absolute inset-0 opacity-20 cyber-grid" />

      <main className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10">
        <Card className="w-full max-w-2xl border-border/80 bg-card/80 p-8 shadow-panel backdrop-blur animate-enter">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-primary/25 bg-background/40 shadow-glow">
                <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-wide">CyberTrace Dashboard</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Secure workspace placeholder — connect your telemetry and case management here.
                </p>
              </div>
            </div>

            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border/70 bg-background/30 p-4">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="mt-2 text-lg font-semibold">Operational</p>
            </div>
            <div className="rounded-lg border border-border/70 bg-background/30 p-4">
              <p className="text-sm text-muted-foreground">Next step</p>
              <p className="mt-2 text-sm">Add your first protected API call using the stored token.</p>
            </div>
          </section>
        </Card>
      </main>
    </div>
  );
}
