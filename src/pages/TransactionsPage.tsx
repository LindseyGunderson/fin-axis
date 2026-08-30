import { useEffect, useMemo, useState } from "react";
import { getTransactions } from "../data/mockApi";
import type { Transaction } from "../types";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";

function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    async function loadTransactions() {
      const data = await getTransactions();
      setTransactions(data);
    }

    loadTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    const now = new Date();

    return [...transactions]
      .filter((transaction) => {
        const searchTerm = search.trim().toLowerCase();

        const matchesSearch =
          searchTerm === "" ||
          transaction.description.toLowerCase().includes(searchTerm) ||
          transaction.category.toLowerCase().includes(searchTerm);

        const matchesType = type === "all" || transaction.type === type;

        const transactionDate = new Date(`${transaction.date}T00:00:00`);

        let matchesDate = true;

        if (dateRange === "month") {
          matchesDate =
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear();
        }

        if (dateRange === "3-months") {
          const cutoff = new Date(now);
          cutoff.setMonth(cutoff.getMonth() - 3);

          matchesDate = transactionDate >= cutoff;
        }

        if (dateRange === "6-months") {
          const cutoff = new Date(now);
          cutoff.setMonth(cutoff.getMonth() - 6);

          matchesDate = transactionDate >= cutoff;
        }

        if (dateRange === "year") {
          matchesDate = transactionDate.getFullYear() === now.getFullYear();
        }

        return matchesSearch && matchesType && matchesDate;
      })
      .sort(
        (a, b) =>
          new Date(`${b.date}T00:00:00`).getTime() -
          new Date(`${a.date}T00:00:00`).getTime(),
      );

  }, [transactions, search, type, dateRange]);

  const hasActiveFilters =
    search !== "" || type !== "all" || dateRange !== "all";

  return (
    <PageContainer>
      <PageHeader
        title="Transactions"
        description="View and manage your business transactions."
      />

      <section className="mt-8">
        <h2 className="sr-only">Transaction history</h2>

        <TransactionFilters
          search={search}
          onSearchChange={setSearch}
          type={type}
          onTypeChange={setType}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={() => {
            setSearch("");
            setType("all");
            setDateRange("all");
          }}
        />

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p
              className="text-sm font-semibold text-text-primary"
              aria-live="polite"
            >
              {filteredTransactions.length}{" "}
              {filteredTransactions.length === 1
                ? "transaction"
                : "transactions"}
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              {hasActiveFilters
                ? "Showing filtered results"
                : "Showing all transactions"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <TransactionList transactions={filteredTransactions} />
        </div>
      </section>
    </PageContainer>
  );
}

export default TransactionsPage;