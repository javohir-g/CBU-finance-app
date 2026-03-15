import { createBrowserRouter } from "react-router";
import Onboarding from "./pages/Onboarding";
import TelegramLogin from "./pages/TelegramLogin";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";
import CardSettings from "./pages/CardSettings";
import Security from "./pages/Security";
import Savings from "./pages/Savings";
import More from "./pages/More";
import ProfileSettings from "./pages/ProfileSettings";
import About from "./pages/About";
import Transactions from "./pages/Transactions";
import Statistics from "./pages/Statistics";
import ExchangeRate from "./pages/ExchangeRate";
import InviteFriend from "./pages/InviteFriend";
import Transfer from "./pages/Transfer";
import MyHome from "./pages/MyHome";
import MyCar from "./pages/MyCar";
import OrderCard from "./pages/OrderCard";
import AutoPayments from "./pages/AutoPayments";
import Conversion from "./pages/Conversion";
import Charity from "./pages/Charity";
import GovServices from "./pages/GovServices";
import FinesMIB from "./pages/FinesMIB";
import Transport from "./pages/Transport";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Onboarding,
  },
  {
    path: "/login",
    Component: TelegramLogin,
  },
  {
    path: "/complete-profile",
    Component: CompleteProfile,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/transactions",
    Component: Transactions,
  },
  {
    path: "/statistics",
    Component: Statistics,
  },
  {
    path: "/cards",
    Component: CardSettings,
  },
  {
    path: "/card-settings",
    Component: CardSettings,
  },
  {
    path: "/security",
    Component: Security,
  },
  {
    path: "/savings",
    Component: Savings,
  },
  {
    path: "/more",
    Component: More,
  },
  {
    path: "/profile-settings",
    Component: ProfileSettings,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/exchange-rate",
    Component: ExchangeRate,
  },
  {
    path: "/my-home",
    Component: MyHome,
  },
  {
    path: "/my-car",
    Component: MyCar,
  },
  {
    path: "/order-card",
    Component: OrderCard,
  },
  {
    path: "/auto-payments",
    Component: AutoPayments,
  },
  {
    path: "/conversion",
    Component: Transfer,
  },
  {
    path: "/transfer",
    Component: Transfer,
  },
  {
    path: "/invite-friend",
    Component: InviteFriend,
  },
  {
    path: "/charity",
    Component: Charity,
  },
  {
    path: "/gov-services",
    Component: GovServices,
  },
  {
    path: "/fines-mib",
    Component: FinesMIB,
  },
  {
    path: "/transport",
    Component: Transport,
  },
]);