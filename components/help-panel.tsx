"use client"

import { useState } from "react"
import {
  BookOpen,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Headphones,
  MessageSquare,
  Mail,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface HelpPanelProps {
  open: boolean
  onClose: () => void
  onChatOpen: () => void
}

type HelpSection = "menu" | "how-it-works" | "payment" | "safety" | "report" | "contact" | "faq"

const helpMenuItems = [
  { id: "how-it-works" as const, icon: BookOpen, label: "How Fluxera Works", desc: "Learn the basics of renting and listing" },
  { id: "payment" as const, icon: CreditCard, label: "Payment & Refund Policy", desc: "Understand our payment process" },
  { id: "safety" as const, icon: ShieldCheck, label: "Safety Guidelines", desc: "Stay safe while renting" },
  { id: "report" as const, icon: AlertTriangle, label: "Report an Issue", desc: "Report problems or violations" },
  { id: "contact" as const, icon: Headphones, label: "Contact Support", desc: "Get in touch with our team" },
  { id: "faq" as const, icon: HelpCircle, label: "FAQ", desc: "Frequently asked questions" },
]

const faqItems = [
  {
    q: "How do I rent an item?",
    a: "Browse items on the marketplace, click on the one you like, and tap 'Request Item'. The owner will receive your request and can accept or decline. Once accepted, you arrange a pickup time and location.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We support UPI, debit/credit cards, and net banking. All payments are processed securely through our payment gateway. Cash payments can be arranged directly with the seller for on-campus transactions.",
  },
  {
    q: "What happens if an item gets damaged?",
    a: "If an item is damaged during the rental period, the security deposit may be partially or fully used for repairs. Both parties can report damage through the app, and our support team will mediate if needed.",
  },
  {
    q: "How does the security deposit work?",
    a: "A security deposit is held when you rent an item. It's fully refundable when you return the item in its original condition. The deposit amount is set by the owner and displayed on each listing.",
  },
  {
    q: "Can I cancel a rental request?",
    a: "Yes, you can cancel a rental request before it's accepted by the owner at no charge. After acceptance, cancellation may be subject to the owner's cancellation policy.",
  },
  {
    q: "How do I contact the seller?",
    a: "Use the 'Chat with Owner' button on any item listing to send a direct message. All conversations are kept within the app for safety and record-keeping.",
  },
]

function SectionHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={onBack}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
    </div>
  )
}

export function HelpPanel({ open, onClose, onChatOpen }: HelpPanelProps) {
  const [section, setSection] = useState<HelpSection>("menu")

  const goBack = () => setSection("menu")

  const handleClose = () => {
    onClose()
    setTimeout(() => setSection("menu"), 300)
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 border-l border-border"
      >
        <SheetHeader className="p-5 pb-0">
          <SheetTitle className="text-lg font-bold text-foreground">
            Help & Support
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Find answers or get in touch with us
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-5rem)]">
          <div className="p-5">
            {section === "menu" && (
              <div className="flex flex-col gap-2">
                {helpMenuItems.map((menuItem) => (
                  <button
                    key={menuItem.id}
                    onClick={() => setSection(menuItem.id)}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <menuItem.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-foreground">
                        {menuItem.label}
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {menuItem.desc}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}

                <Separator className="my-2" />

                <Button
                  onClick={() => {
                    handleClose()
                    setTimeout(onChatOpen, 400)
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Support Bot
                </Button>
              </div>
            )}

            {section === "how-it-works" && (
              <div>
                <SectionHeader title="How Fluxera Works" onBack={goBack} />
                <div className="flex flex-col gap-4">
                  {[
                    { step: "1", title: "Browse & Discover", desc: "Explore items listed by students at your college. Use categories and search to find what you need." },
                    { step: "2", title: "Request & Connect", desc: "Click 'Request Item' to send a rental request to the owner. Chat with them to arrange details." },
                    { step: "3", title: "Pay & Pickup", desc: "Pay the rental fee plus security deposit. Meet the owner at the designated campus location for pickup." },
                    { step: "4", title: "Use & Return", desc: "Enjoy using the item during your rental period. Return it on time and in the same condition to get your deposit back." },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {s.step}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "payment" && (
              <div>
                <SectionHeader title="Payment & Refund Policy" onBack={goBack} />
                <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <h4 className="font-semibold text-foreground mb-2">Payment Methods</h4>
                    <p>We accept UPI (GPay, PhonePe, Paytm), debit/credit cards, net banking, and on-campus cash transactions by mutual agreement.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <h4 className="font-semibold text-foreground mb-2">Rental Fee</h4>
                    <p>Rental fees are charged per day as listed. The total is calculated at checkout based on your rental duration.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <h4 className="font-semibold text-foreground mb-2">Security Deposit</h4>
                    <p>A refundable deposit is required for most items. It is returned within 24-48 hours after the item is returned in its original condition.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <h4 className="font-semibold text-foreground mb-2">Refunds</h4>
                    <p>Refunds for cancelled rentals are processed within 3-5 business days. For disputes, contact our support team.</p>
                  </div>
                </div>
              </div>
            )}

            {section === "safety" && (
              <div>
                <SectionHeader title="Safety Guidelines" onBack={goBack} />
                <div className="flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed">
                  {[
                    "Always meet in public campus areas for item exchanges.",
                    "Verify the item condition before accepting the rental.",
                    "Never share personal financial details outside the app.",
                    "Report suspicious behavior or listings immediately.",
                    "Take photos of items before and after rental for documentation.",
                    "Use only in-app communication for rental discussions.",
                    "Check seller verification badges before transacting.",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/30 p-3">
                      <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "report" && (
              <div>
                <SectionHeader title="Report an Issue" onBack={goBack} />
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you encounter any issues with a listing, seller, or transaction, please report it to us. We take all reports seriously and will investigate promptly.
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "Fraudulent or misleading listing",
                      "Item not as described",
                      "Seller not responding",
                      "Payment dispute",
                      "Safety concern",
                      "Other issue",
                    ].map((reason) => (
                      <button
                        key={reason}
                        className="flex items-center justify-between rounded-xl border border-border bg-card p-3.5 text-left text-sm text-foreground transition-all hover:border-primary/30"
                      >
                        {reason}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section === "contact" && (
              <div>
                <SectionHeader title="Contact Support" onBack={goBack} />
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      handleClose()
                      setTimeout(onChatOpen, 400)
                    }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-foreground">Support Bot</span>
                      <p className="text-xs text-muted-foreground mt-0.5">Get instant answers to common questions</p>
                    </div>
                  </button>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-foreground">Email Support</span>
                      <p className="text-xs text-muted-foreground mt-0.5">support@fluxera.in</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section === "faq" && (
              <div>
                <SectionHeader title="Frequently Asked Questions" onBack={goBack} />
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-sm text-left font-medium text-foreground hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
