import { Minus, Plus } from "lucide-react";
import type { Transaction } from "../../types";
import ViewAllButton from "../ui/ViewAllButton";

type RecentTransactionsProps = {
  transactions: Transaction[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <section className="rounded-lg border border-border/70 bg-surface p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-primary">
            Recent transactions
          </h2>
        </div>

        <div className="self-start sm:self-auto">
          <ViewAllButton />
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Recent
          </p>

          <p className="hidden text-xs font-semibold uppercase tracking-wide text-text-muted sm:block">
            Amount
          </p>
        </div>

        <div className="divide-y divide-border/70">
          {recentTransactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <div
                key={transaction.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                {/* Transaction information */}
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-md ${isIncome ? "bg-success-50 text-success-600" : "bg-accent-coral/10 text-accent-coral"}`}
                  >
                    {isIncome ? (
                      <Plus className="size-4" />
                    ) : (
                      <Minus className="size-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {transaction.description}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {transaction.category} ·{formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                {/* Amount */}
                <p
                  className={`pl-11 text-sm font-semibold sm:shrink-0 sm:pl-0 ${isIncome ? "text-success-600" : "text-accent-coral"}`}
                >
                  {isIncome ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RecentTransactions;
