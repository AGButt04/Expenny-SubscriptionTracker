import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubsriptionSummary";

export default function DashboardPage() {
  const isAuthenicated = false;
  const isAddEntry = true;

  if (!isAuthenicated) {
    return (
      <Login />
    )
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay />
      {isAddEntry && (
        <SubscriptionForm />
      )}
    </>
  );
}
