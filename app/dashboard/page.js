'use client'

import { useAuth } from "@/context/AuthContext";
import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubsriptionSummary";
import { useState } from "react";

export default function DashboardPage() {
  const isAuthenicated = true;
  const [isAddEntry, setisAddEntry] = useState(false);
  const { handleDeleteSubscription  } = useAuth();

  const [formData, setFormData] = useState({
      name: '',
      category: 'Web Services',
      cost: '',
      currency: 'USD',
      billingFrequency: 'Monthly',
      nextBillingDate: '',
      paymentMethod: 'Credit Card',
      startDate: '',
      renewelType: '',
      notes: '',
      status: 'Active'
  });
 
  function handleChangeInput(event) {
      const newData = {
          ...formData,
          [event.target.name]: event.target.value
      }
      setFormData(newData)
  }

  function handleEditSubscription(index) {
    const inputObj = userData.subscrioptions.find((val, valIndex) => {
      return valIndex === index;
    });

    setFormData(inputObj);
    handleDeleteSubscription(index)
    setisAddEntry(true);
  }

  function handleToggleInput(index) {
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
        <SubscriptionForm onSubmit={() => {}} 
        closeInput={handleToggleInput} formData={formData} handleChangeInput={handleChangeInput}/>
      )}
    </>
  );
}
