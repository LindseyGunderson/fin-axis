import { Search } from "lucide-react";

type TransactionFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

function TransactionFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  hasActiveFilters,
  onClearFilters,
}: TransactionFiltersProps) {
  return (
    <div className="rounded-lg border border-border/70 bg-surface p-4 sm:p-5">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]">
        {/* Search */}
        <div className="relative">
          <label htmlFor="transaction-search" className="sr-only">
            Search transactions
          </label>

          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
          />

          <input
            id="transaction-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search transactions..."
            className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* Type */}
        <div>
          <label htmlFor="transaction-type" className="sr-only">
            Transaction type
          </label>

          <select
            id="transaction-type"
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>

        {/* Date range */}
        <div>
          <label htmlFor="transaction-date" className="sr-only">
            Date range
          </label>

          <select
            id="transaction-date"
            value={dateRange}
            onChange={(event) => onDateRangeChange(event.target.value)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All time</option>
            <option value="month">This month</option>
            <option value="3-months">Last 3 months</option>
            <option value="6-months">Last 6 months</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end border-t border-border/70 pt-4">
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionFilters;
