import { Minus, Plus } from "lucide-react";
import type { Transaction } from "../../types";

type TransactionListProps = {
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
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-border/70 bg-surface p-6">
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-text-primary">
            No transactions found.
          </p>

          <p className="mt-1 text-sm text-text-secondary">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border/70 bg-surface">
      {/* List header */}
      <div className="hidden border-b border-border/70 px-6 py-3 sm:grid sm:grid-cols-[minmax(0,1fr)_140px_140px]">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Transaction
        </p>

        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Date
        </p>

        <p className="text-right text-xs font-semibold uppercase tracking-wide text-text-muted">
          Amount
        </p>
      </div>

      <ul className="divide-y divide-border/70">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <li key={transaction.id} className="px-4 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[minmax(0,1fr)_140px_140px] sm:items-center">
                {/* Transaction */}
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
                      isIncome
                        ? "bg-success-50 text-success-600"
                        : "bg-accent-coral/10 text-accent-coral-600"
                    }`}
                  >
                    {isIncome ? (
                      <Plus
                        aria-hidden="true"
                        className="size-4"
                      />
                    ) : (
                      <Minus
                        aria-hidden="true"
                        className="size-4"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {transaction.description}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {transaction.category}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <p className="pl-11 text-xs text-text-secondary sm:pl-0 sm:text-sm">
                  {formatDate(transaction.date)}
                </p>

                {/* Amount */}
                <p
                  className={`pl-11 text-sm font-semibold sm:pl-0 sm:text-right ${
                    isIncome
                      ? "text-success-600"
                      : "text-accent-coral-600"
                  }`}
                >
                  {isIncome ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TransactionList;
