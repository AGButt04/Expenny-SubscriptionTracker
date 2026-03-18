'use client'

import { useAuth } from "@/context/AuthContext";
import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubsriptionSummary";
import { useState } from "react";

const blankSubscription = {
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
  };

export default function DashboardPage() {
  const [isAddEntry, setisAddEntry] = useState(false);
  const { handleDeleteSubscription, userData, currentUser, loading  } = useAuth();

  const isAuthenicated = !!currentUser;

  const [formData, setFormData] = useState(blankSubscription);
 
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

  function handleResetForm() {
    setFormData(blankSubscription);
  }

  function handleToggleInput(index) {
    setisAddEntry(!isAddEntry);
  }


  if (loading) {
    return (<p>Loading...</p>)
  }
  if (!isAuthenicated) {
    return (
      <Login />
    )
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay handleEditSubscription={handleEditSubscription} handleShowInput={isAddEntry? () => {} : handleToggleInput}/>
      {isAddEntry && (
        <SubscriptionForm handleResetForm={handleResetForm}
        closeInput={handleToggleInput} formData={formData} 
        handleChangeInput={handleChangeInput}/>
      )}
    </>
  );
}
