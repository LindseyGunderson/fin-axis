export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "revenue"
  | "software"
  | "office"
  | "marketing"
  | "travel"
  | "meals"
  | "professional-services"
  | "other";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type Customer = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  customerId?: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  id: string;
  number: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
};

export type FinancialSummary = {
  revenue: number;
  expenses: number;
  outstanding: number;
  cashFlow: number;
};

export type MonthlyFinancials = {
  month: string;
  revenue: number;
  expenses: number;
};