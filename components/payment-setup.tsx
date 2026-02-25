"use client"

import { useState } from "react"
import {
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Plus,
  Trash2,
  Lock,
  IndianRupee,
  RefreshCw,
  AlertCircle,
  FileText,
  X,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface PaymentSetupProps {
  open: boolean
  onClose: () => void
}

type PaymentView =
  | "overview"
  | "add-upi"
  | "add-card"
  | "add-bank"
  | "transactions"
  | "refunds"

interface SavedPaymentMethod {
  id: string
  type: "upi" | "card" | "bank"
  label: string
  detail: string
  isDefault: boolean
}

const initialMethods: SavedPaymentMethod[] = [
  {
    id: "upi-1",
    type: "upi",
    label: "UPI",
    detail: "student@oksbi",
    isDefault: true,
  },
]

const demoTransactions = [
  {
    id: "txn-1",
    item: "MacBook Air M2",
    amount: 750,
    date: "Feb 22, 2026",
    status: "completed" as const,
    type: "rental" as const,
  },
  {
    id: "txn-2",
    item: "Canon EOS 200D",
    amount: 8000,
    date: "Feb 20, 2026",
    status: "completed" as const,
    type: "deposit" as const,
  },
  {
    id: "txn-3",
    item: "Yamaha Guitar",
    amount: 300,
    date: "Feb 18, 2026",
    status: "pending" as const,
    type: "rental" as const,
  },
  {
    id: "txn-4",
    item: "Canon EOS 200D",
    amount: 8000,
    date: "Feb 15, 2026",
    status: "refunded" as const,
    type: "refund" as const,
  },
]

function SectionHeader({
  title,
  onBack,
}: {
  title: string
  onBack: () => void
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
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

function PaymentMethodIcon({
  type,
}: {
  type: "upi" | "card" | "bank"
}) {
  const icons = {
    upi: Smartphone,
    card: CreditCard,
    bank: Building2,
  }
  const Icon = icons[type]
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
  )
}

export function PaymentSetup({ open, onClose }: PaymentSetupProps) {
  const [view, setView] = useState<PaymentView>("overview")
  const [methods, setMethods] = useState<SavedPaymentMethod[]>(initialMethods)
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [accountName, setAccountName] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleClose = () => {
    onClose()
    setTimeout(() => setView("overview"), 300)
  }

  const goBack = () => {
    setView("overview")
    setSaveSuccess(false)
  }

  const handleAddUpi = () => {
    if (!upiId.trim()) return
    const newMethod: SavedPaymentMethod = {
      id: `upi-${Date.now()}`,
      type: "upi",
      label: "UPI",
      detail: upiId,
      isDefault: methods.length === 0,
    }
    setMethods((prev) => [...prev, newMethod])
    setUpiId("")
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      setView("overview")
    }, 1500)
  }

  const handleAddCard = () => {
    if (!cardNumber.trim() || !cardName.trim()) return
    const masked = `**** **** **** ${cardNumber.slice(-4)}`
    const newMethod: SavedPaymentMethod = {
      id: `card-${Date.now()}`,
      type: "card",
      label: "Card",
      detail: masked,
      isDefault: methods.length === 0,
    }
    setMethods((prev) => [...prev, newMethod])
    setCardNumber("")
    setCardName("")
    setCardExpiry("")
    setCardCvv("")
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      setView("overview")
    }, 1500)
  }

  const handleAddBank = () => {
    if (!accountNumber.trim() || !ifscCode.trim()) return
    const masked = `**** ${accountNumber.slice(-4)}`
    const newMethod: SavedPaymentMethod = {
      id: `bank-${Date.now()}`,
      type: "bank",
      label: "Bank Account",
      detail: masked,
      isDefault: methods.length === 0,
    }
    setMethods((prev) => [...prev, newMethod])
    setAccountNumber("")
    setIfscCode("")
    setAccountName("")
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      setView("overview")
    }, 1500)
  }

  const removeMethod = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id))
  }

  const setDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    )
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 border-l border-border"
      >
        <SheetHeader className="p-5 pb-0">
          <SheetTitle className="text-lg font-bold text-foreground">
            Payments & Wallet
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Manage your payment methods, view transactions, and handle refunds
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100%-5rem)]">
          <div className="p-5">
            {/* Overview */}
            {view === "overview" && (
              <div className="flex flex-col gap-5">
                {/* Wallet Summary */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Wallet Balance
                    </span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[11px]">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    2,500.00
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available for deposits and rentals
                  </p>
                </div>

                {/* Saved Payment Methods */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      Payment Methods
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {methods.length} saved
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {methods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5"
                      >
                        <PaymentMethodIcon type={method.type} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {method.label}
                            </span>
                            {method.isDefault && (
                              <Badge
                                variant="outline"
                                className="bg-primary/10 text-primary border-primary/20 text-[10px] py-0"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">
                            {method.detail}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!method.isDefault && (
                            <button
                              onClick={() => setDefault(method.id)}
                              className="text-[11px] text-primary font-medium hover:underline px-2 py-1"
                            >
                              Set default
                            </button>
                          )}
                          <button
                            onClick={() => removeMethod(method.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                            aria-label="Remove payment method"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {methods.length === 0 && (
                      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                        <CreditCard className="mx-auto h-8 w-8 text-muted-foreground/50" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          No payment methods added yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Payment Method buttons */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Add Payment Method
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setView("add-upi")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <Smartphone className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        UPI
                      </span>
                    </button>
                    <button
                      onClick={() => setView("add-card")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        Card
                      </span>
                    </button>
                    <button
                      onClick={() => setView("add-bank")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <Building2 className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        Bank
                      </span>
                    </button>
                  </div>
                </div>

                <Separator />

                {/* Transactions & Refunds */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setView("transactions")}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-foreground">
                        Transaction History
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        View all past payments and receipts
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => setView("refunds")}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-foreground">
                        Refunds & Deposits
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Track deposit refunds and cancellations
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/30 p-4">
                  <Lock className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">
                      Secure Payments
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      All transactions are encrypted with 256-bit SSL. Your payment data is never stored on our servers. We use PCI-DSS compliant payment processing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Add UPI */}
            {view === "add-upi" && (
              <div>
                <SectionHeader title="Add UPI ID" onBack={goBack} />
                {saveSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      UPI ID Added Successfully
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Enter your UPI ID linked to your bank account. We support GPay, PhonePe, Paytm, and all UPI apps.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="upi-id" className="text-sm font-medium text-foreground">
                        UPI ID
                      </Label>
                      <Input
                        id="upi-id"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="border-border bg-muted/50"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Example: 9876543210@paytm, yourname@oksbi
                      </p>
                    </div>
                    <Button
                      onClick={handleAddUpi}
                      disabled={!upiId.trim()}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add UPI ID
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Add Card */}
            {view === "add-card" && (
              <div>
                <SectionHeader title="Add Debit/Credit Card" onBack={goBack} />
                {saveSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Card Added Successfully
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        We accept Visa, Mastercard, and RuPay debit/credit cards. Your card details are secured and tokenized.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="card-name" className="text-sm font-medium text-foreground">
                          Cardholder Name
                        </Label>
                        <Input
                          id="card-name"
                          placeholder="Name on card"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="border-border bg-muted/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="card-number" className="text-sm font-medium text-foreground">
                          Card Number
                        </Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
                          }
                          className="border-border bg-muted/50 font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="card-expiry" className="text-sm font-medium text-foreground">
                            Expiry
                          </Label>
                          <Input
                            id="card-expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                            className="border-border bg-muted/50 font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="card-cvv" className="text-sm font-medium text-foreground">
                            CVV
                          </Label>
                          <Input
                            id="card-cvv"
                            type="password"
                            placeholder="***"
                            value={cardCvv}
                            onChange={(e) =>
                              setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                            }
                            className="border-border bg-muted/50 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleAddCard}
                      disabled={!cardNumber.trim() || !cardName.trim()}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Add Card Securely
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                      <Shield className="h-3 w-3" />
                      PCI-DSS compliant. Card data is tokenized.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Add Bank Account */}
            {view === "add-bank" && (
              <div>
                <SectionHeader title="Add Bank Account" onBack={goBack} />
                {saveSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Bank Account Added Successfully
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Add your bank account for receiving rental earnings and deposit refunds via NEFT/IMPS.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="account-name" className="text-sm font-medium text-foreground">
                          Account Holder Name
                        </Label>
                        <Input
                          id="account-name"
                          placeholder="Full name as per bank"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          className="border-border bg-muted/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="account-number" className="text-sm font-medium text-foreground">
                          Account Number
                        </Label>
                        <Input
                          id="account-number"
                          placeholder="Enter account number"
                          value={accountNumber}
                          onChange={(e) =>
                            setAccountNumber(e.target.value.replace(/\D/g, ""))
                          }
                          className="border-border bg-muted/50 font-mono"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="ifsc-code" className="text-sm font-medium text-foreground">
                          IFSC Code
                        </Label>
                        <Input
                          id="ifsc-code"
                          placeholder="e.g. SBIN0001234"
                          value={ifscCode}
                          onChange={(e) =>
                            setIfscCode(e.target.value.toUpperCase().slice(0, 11))
                          }
                          className="border-border bg-muted/50 font-mono"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddBank}
                      disabled={!accountNumber.trim() || !ifscCode.trim()}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Add Bank Account
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Transactions */}
            {view === "transactions" && (
              <div>
                <SectionHeader title="Transaction History" onBack={goBack} />
                <div className="flex flex-col gap-2">
                  {demoTransactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          txn.type === "refund"
                            ? "bg-primary/10"
                            : txn.type === "deposit"
                              ? "bg-accent"
                              : "bg-muted"
                        }`}
                      >
                        {txn.type === "refund" ? (
                          <RefreshCw className="h-4 w-4 text-primary" />
                        ) : txn.type === "deposit" ? (
                          <Shield className="h-4 w-4 text-accent-foreground" />
                        ) : (
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {txn.item}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {txn.date} &middot;{" "}
                          <span className="capitalize">{txn.type}</span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={`text-sm font-bold ${
                            txn.type === "refund"
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {txn.type === "refund" ? "+" : "-"}{"₹"}
                          {txn.amount.toLocaleString("en-IN")}
                        </p>
                        <span
                          className={`text-[11px] font-medium ${
                            txn.status === "completed"
                              ? "text-primary"
                              : txn.status === "pending"
                                ? "text-muted-foreground"
                                : "text-primary"
                          }`}
                        >
                          {txn.status === "completed"
                            ? "Completed"
                            : txn.status === "pending"
                              ? "Pending"
                              : "Refunded"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Refunds */}
            {view === "refunds" && (
              <div>
                <SectionHeader title="Refunds & Deposits" onBack={goBack} />
                <div className="flex flex-col gap-4">
                  {/* Active Deposits */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Active Deposits
                    </h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                          <Shield className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            MacBook Air M2
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Held since Feb 22, 2026
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">
                            {"₹"}5,000
                          </p>
                          <span className="text-[11px] font-medium text-muted-foreground">
                            Held
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Refund Policy */}
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      Refund Policy
                    </h4>
                    <ul className="flex flex-col gap-2 text-xs text-muted-foreground leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5 text-primary" />
                        Security deposits are refunded within 24-48 hours after item return
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5 text-primary" />
                        Cancelled rentals (before acceptance) get full refund in 3-5 business days
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5 text-primary" />
                        Damage deductions are communicated before processing
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5 text-primary" />
                        Disputes are mediated by Fluxera support team
                      </li>
                    </ul>
                  </div>

                  {/* Past Refunds */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Past Refunds
                    </h4>
                    <div className="rounded-xl border border-border bg-card p-3.5 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <RefreshCw className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Canon EOS 200D deposit
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Refunded on Feb 15, 2026
                        </p>
                      </div>
                      <p className="text-sm font-bold text-primary">
                        +{"₹"}8,000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
