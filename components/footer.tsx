"use client"

interface FooterProps {
  onHelpOpen: () => void
}

export function Footer({ onHelpOpen }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                src="/images/fluxera-logo.jpg"
                alt="Fluxera logo"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="text-lg font-bold text-foreground">Fluxera</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The trusted campus rental marketplace. Share, rent, and save with your college community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Browse Items
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  List an Item
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Help & Support</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <button
                  onClick={onHelpOpen}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Help Center
                </button>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Payment & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">
                support@fluxera.in
              </li>
              <li>
                <button
                  onClick={onHelpOpen}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Chat with Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 Fluxera. All rights reserved. Made for students, by students.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
