import { customers, invoices, transactions } from "./mockData";

import type {
  Customer,
  Invoice,
  Transaction,
  FinancialSummary,
  MonthlyFinancials,
} from "../types";

function delay(ms = 400) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getCustomers(): Promise<Customer[]> {
  await delay();

  return customers;
}

export async function getTransactions(): Promise<Transaction[]> {
  await delay();

  return transactions;
}

export async function getInvoices(): Promise<Invoice[]> {
  await delay();

  return invoices;
}

export async function getFinancialSummary(): Promise<FinancialSummary> {
  await delay();

  const revenue = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const outstanding = invoices
    .filter(
      (invoice) => invoice.status === "sent" || invoice.status === "overdue",
    )
    .reduce((total, invoice) => {
      const invoiceTotal = invoice.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
      );

      return total + invoiceTotal;
    }, 0);

  return {
    revenue,
    expenses,
    outstanding,
    cashFlow: revenue - expenses,
  };
}

export async function getMonthlyFinancials(): Promise<MonthlyFinancials[]> {
  await delay();

  return [
    { month: "Sep", revenue: 26400, expenses: 12800 },
    { month: "Oct", revenue: 27800, expenses: 13100 },
    { month: "Nov", revenue: 29100, expenses: 13900 },
    { month: "Dec", revenue: 30200, expenses: 14500 },
    { month: "Jan", revenue: 31500, expenses: 14900 },
    { month: "Feb", revenue: 27600, expenses: 15200 },
    { month: "Mar", revenue: 28400, expenses: 13200 },
    { month: "Apr", revenue: 31200, expenses: 14100 },
    { month: "May", revenue: 29800, expenses: 15200 },
    { month: "Jun", revenue: 35400, expenses: 16800 },
    { month: "Jul", revenue: 38100, expenses: 17400 },
    { month: "Aug", revenue: 42840, expenses: 18240 },
  ];
}