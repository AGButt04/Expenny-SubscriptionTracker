import Login from "@/components/Login";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubsriptionSummary";

export default function DashboardPage() {
  const isAuthenicated = false;

  if (!isAuthenicated) {
    return (
      <Login />
    )
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay />
    </>
  );
}
