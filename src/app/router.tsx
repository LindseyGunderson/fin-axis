import { Navigate, createBrowserRouter } from "react-router";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import TransactionsPage from "../pages/TransactionsPage";
import InvoicesPage from "../pages/InvoicesPage";
import CustomersPage from "../pages/CustomersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "invoices",
        element: <InvoicesPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
    ],
  },
]);
