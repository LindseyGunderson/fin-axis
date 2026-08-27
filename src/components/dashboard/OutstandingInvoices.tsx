import { AlertCircle } from "lucide-react";
import type { Customer, Invoice } from "../../types";
import ViewAllButton from "../ui/ViewAllButton";

type OutstandingInvoicesProps = {
  invoices: Invoice[];
  customers: Customer[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(value);
}

function getInvoiceTotal(invoice: Invoice) {
  return invoice.items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  );
}

function InvoiceRow({
  invoice,
  customer,
}: {
  invoice: Invoice;
  customer?: Customer;
}) {
  const isOverdue = invoice.status === "overdue";

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
            isOverdue
              ? "bg-danger-50 text-danger-700"
              : "bg-brand-50 text-brand-700"
          }`}
        >
          {invoice.number.replace("INV-", "")}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text-primary">
            {customer?.company ?? customer?.name}
          </p>

          <p className="mt-0.5 text-xs text-text-secondary">{invoice.number}</p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <p className="text-sm font-semibold text-text-primary">
          {formatCurrency(getInvoiceTotal(invoice))}
        </p>

        {isOverdue ? (
          <span className="text-xs font-medium text-danger-600">Overdue</span>
        ) : (
          <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-text-secondary">
            Awaiting payment
          </span>
        )}
      </div>
    </div>
  );
}

function InvoiceSection({
  label,
  invoices,
  customers,
  isUrgent = false,
}: {
  label: string;
  invoices: Invoice[];
  customers: Customer[];
  isUrgent?: boolean;
}) {
  const getCustomer = (customerId: string) =>
    customers.find((customer) => customer.id === customerId);

  if (invoices.length === 0) {
    return null;
  }

  const total = invoices.reduce(
    (sum, invoice) => sum + getInvoiceTotal(invoice),
    0,
  );

  return (
    <div
      className={isUrgent
           ? "rounded-md border border-danger-50 bg-danger-50/30 p-4"
           : ""
       }
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isUrgent && <AlertCircle className="size-3.5 text-accent-coral" />}

          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              isUrgent ? "text-accent-coral" : "text-text-muted"
            }`}
          >
            {label}
          </p>

          <span className="text-xs text-text-muted">· {invoices.length}</span>
        </div>

        <p
          className={`text-xs font-medium ${
            isUrgent ? "text-accent-coral" : "text-text-muted"
          }`}
        >
          {formatCurrency(total)}
        </p>
      </div>

      <div className="divide-y divide-border/70">
        {invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            customer={getCustomer(invoice.customerId)}
          />
        ))}
      </div>
    </div>
  );
}

function OutstandingInvoices({
  invoices,
  customers,
}: OutstandingInvoicesProps) {
  const outstandingInvoices = invoices.filter(
    (invoice) => invoice.status === "sent" || invoice.status === "overdue",
  );

  const overdueInvoices = outstandingInvoices.filter(
    (invoice) => invoice.status === "overdue",
  );

  const recentInvoices = outstandingInvoices.filter(
    (invoice) => invoice.status === "sent",
  );

  const outstandingTotal = outstandingInvoices.reduce(
    (total, invoice) => total + getInvoiceTotal(invoice),
    0,
  );

  return (
    <section className="rounded-lg border border-border/70 bg-surface p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-primary">
            Outstanding invoices
          </h2>
        </div>

        <ViewAllButton />
      </div>

      {/* Summary */}
      <div className="mt-7">
        <p className="text-3xl font-semibold tracking-tight text-text-primary">
          {formatCurrency(outstandingTotal)}
        </p>

        <p className="mt-1.5 text-sm text-text-secondary">
          {outstandingInvoices.length}{" "}
          {outstandingInvoices.length === 1 ? "invoice" : "invoices"}{" "}
          outstanding
        </p>
      </div>

      {/* Invoice groups */}
      <div className="mt-8 space-y-12">
        <InvoiceSection
          label="Overdue"
          invoices={overdueInvoices}
          customers={customers}
          isUrgent
        />

        <InvoiceSection
          label="Recent"
          invoices={recentInvoices}
          customers={customers}
        />
      </div>
    </section>
  );
}

export default OutstandingInvoices;
