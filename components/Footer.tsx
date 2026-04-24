import { RegisterButton } from "@/components/RegisterButton";

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-bg py-8">
      <div className="c3-container">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <a
            href="#top"
            className="flex items-center"
          >
            <img src="/logo.png" alt="Shobhit Singhal" className="h-[36px] w-auto md:h-[44px] opacity-90" />
          </a>

          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.18em] text-white/65">
              6th and 7th June · 2026 · 10 AM - 5 PM IST
            </p>
            <p className="text-sm text-muted">
              © 2026 Crore Club Consultant Bootcamp. All rights reserved.
            </p>
          </div>

          <RegisterButton
            className="px-6 py-3 text-lg"
            label="Register Now"
            variant="outline"
          />
        </div>
      </div>
    </footer>
  );
}
