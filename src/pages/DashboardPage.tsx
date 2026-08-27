import { useEffect, useState } from "react";
import {
  getCustomers,
  getFinancialSummary,
  getInvoices,
  getMonthlyFinancials,
} from "../data/mockApi";
import type {
  Customer,
  FinancialSummary,
  Invoice,
  MonthlyFinancials,
} from "../types";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import FinancialSummaryCard from "../components/dashboard/FinancialSummaryCard";
import FinancialChart from "../components/dashboard/FinancialChart";
import OutstandingInvoices from "../components/dashboard/OutstandingInvoices";

function DashboardPage() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);

  const [monthlyFinancials, setMonthlyFinancials] = useState<
    MonthlyFinancials[]
  >([]);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [summaryData, monthlyData, invoiceData, customerData] =
          await Promise.all([
            getFinancialSummary(),
            getMonthlyFinancials(),
            getInvoices(),
            getCustomers(),
          ]);

        setSummary(summaryData);
        setMonthlyFinancials(monthlyData);
        setInvoices(invoiceData);
        setCustomers(customerData);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Overview"
        description="Here's how your business is doing."
      />

      <div className="mt-8 max-w-5xl">
        {!isLoading && summary && <FinancialSummaryCard summary={summary} />}

        {!isLoading && (
          <div className="mt-6">
            <FinancialChart data={monthlyFinancials} />
          </div>
        )}

        {!isLoading && (
          <div className="mt-6">
            <OutstandingInvoices invoices={invoices} customers={customers} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default DashboardPage;
