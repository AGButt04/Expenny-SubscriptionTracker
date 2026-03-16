'use client'

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubsriptionSummary";
import { useState } from "react";

export default function DashboardPage() {
  const isAuthenicated = false;
  const [isAddEntry, setisAddEntry] = useState(false);

  function handleToggleInput() {
    setisAddEntry(!isAddEntry);
  }

  if (!isAuthenicated) {
    return (
      <Login />
    )
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay handleShowInput={isAddEntry? () => {} : handleToggleInput}/>
      {isAddEntry && (
        <SubscriptionForm onSubmit={() => {}} closeInput={handleToggleInput}/>
      )}
    </>
  );
}
