import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyFinancials } from "../../types";

type FinancialChartProps = {
  data: MonthlyFinancials[];
};

type ChartPeriod = "3M" | "6M" | "1Y";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getChartSummary(data: MonthlyFinancials[]) {
  if (data.length === 0) {
    return "No financial data is available for this period.";
  }

  const revenueValues = data.map((item) => item.revenue);
  const expenseValues = data.map((item) => item.expenses);

  const minRevenue = Math.min(...revenueValues);
  const maxRevenue = Math.max(...revenueValues);

  const minExpenses = Math.min(...expenseValues);
  const maxExpenses = Math.max(...expenseValues);

  const firstMonth = data[0].month;
  const lastMonth = data[data.length - 1].month;

  return `Revenue and expenses from ${firstMonth} through ${lastMonth}. Revenue ranged from ${formatCurrency(
    minRevenue,
  )} to ${formatCurrency(maxRevenue)}. Expenses ranged from ${formatCurrency(
    minExpenses,
  )} to ${formatCurrency(maxExpenses)}.`;
}



function FinancialChart({ data }: FinancialChartProps) {
  const [period, setPeriod] = useState<ChartPeriod>("6M");

  const filteredData = useMemo(() => {
    const months = {
      "3M": 3,
      "6M": 6,
      "1Y": 12,
    };

    return data.slice(-months[period]);
  }, [data, period]);

  return (
    <section className="rounded-lg border border-border/70 bg-surface p-6">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-primary">
            Revenue & Expenses
          </h2>

          <p className="mt-1.5 text-sm text-text-secondary">
            Monthly financial performance
          </p>
        </div>

        <div
          className="flex items-center rounded-full border border-border/70 bg-background px-2 py-1"
          role="group"
          aria-label="Select chart time period"
        >
          {(["3M", "6M", "1Y"] as ChartPeriod[]).map((option) => {
            const isActive = period === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setPeriod(option)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-brand-900 text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{
              top: 8,
              right: 16,
              left: 0,
              bottom: 8,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-border)"
              strokeOpacity={0.55}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={16}
              tick={{
                fill: "var(--color-text-muted)",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{
                fill: "var(--color-text-muted)",
                fontSize: 12,
              }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              content={<FinancialTooltip />}
              cursor={{
                stroke: "var(--color-border-strong)",
                strokeDasharray: "4 4",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={32}
              iconType="line"
              iconSize={20}
              wrapperStyle={{
                paddingTop: "20px",
              }}
              formatter={(value) => (
                <span className="ml-1 text-xs font-medium text-text-secondary">
                  {value}
                </span>
              )}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="var(--color-info-600)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--color-info-600)",
              }}
            />

            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="var(--color-accent-coral)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--color-accent-coral)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="sr-only"> {getChartSummary(filteredData)} </p>
    </section>
  );
}

function FinancialTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-md bg-brand-900 px-4 py-3 shadow-popover">
      <p className="mb-2 text-xs font-medium text-white">{label}</p>

      <div className="space-y-2">
        {payload.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{
                  backgroundColor: entry.color,
                }}
                aria-hidden="true"
              />

              <span className="text-xs text-white/65">{entry.name}</span>
            </div>

            <span className="text-sm font-medium text-white">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialChart;
