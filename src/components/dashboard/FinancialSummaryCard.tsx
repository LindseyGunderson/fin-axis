import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from "lucide-react";
import type { FinancialSummary as FinancialSummaryData } from "../../types";

type FinancialSummaryCardProps = {
  summary: FinancialSummaryData;
};

type SummaryCard = {
  label: string;
  value: number;
  change: number;
  icon: typeof DollarSign;
  description: string;
};

function FinancialSummaryCard({ summary }: FinancialSummaryCardProps) {
  const cards: SummaryCard[] = [
    {
      label: "Revenue",
      value: summary.revenue,
      change: 12.4,
      icon: DollarSign,
      description: "from last month",
    },
    {
      label: "Expenses",
      value: summary.expenses,
      change: 4.8,
      icon: ArrowDownRight,
      description: "from last month",
    },
    {
      label: "Cash flow",
      value: summary.cashFlow,
      change: 18.2,
      icon: Wallet,
      description: "from last month",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;

        return (
          <div
            key={card.label}
            className="rounded-lg border border-border/70 bg-surface px-6 py-6"
          >
            {/* Label */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-secondary">
                {card.label}
              </p>

              <div className="flex size-8 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <Icon className="size-4" strokeWidth={1.8} />
              </div>
            </div>

            {/* Value */}
            <p className="mt-6 text-3xl font-semibold tracking-tight text-text-primary">
              $
              {card.value.toLocaleString("en-CA", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            {/* Change */}
            <div className="mt-5 flex items-center gap-1.5 text-xs">
              <span
                className={
                  isPositive
                    ? "flex items-center gap-0.5 font-medium text-success-600"
                    : "flex items-center gap-0.5 font-medium text-danger-600"
                }
              >
                {isPositive ? (
                  <ArrowUpRight className="size-3.5" />
                ) : (
                  <ArrowDownRight className="size-3.5" />
                )}
                {Math.abs(card.change)}%
              </span>

              <span className="text-text-muted">{card.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FinancialSummaryCard;
