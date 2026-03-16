'use client'
import { useState } from "react"

export default function SubscriptionForm(props) {
    const { onSubmit, closeInput } = props;
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

    function handleFormSubmit(event) {
        // Prevents the random s behavious of reloading the webpage
        event.preventDefault();
        onSubmit
    }

    function handleChangeInput(event) {
        const newData = {
            ...formData,
            [event.target.name]: event.target.value
        }
        setFormData(newData)
    }

    return (
        <section>
            <h2>Add a new subscription</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    <span>Subscription Name</span>
                    <input value={formData.value} onChange={handleChangeInput} 
                    type="text" name="name" placeholder="e.g. Netflix, Spotify, AWS Hosting " 
                    required />
                </label>

                <label>
                    <span>Category</span>
                    <select value={formData.category} onChange={handleChangeInput} name="category">
                        {['Entertainment', 'Music', 'Software', 'Web Services', 
                        'Health&fitness', 'Other'].map((cat, catIndex) => {
                            return (
                                <option key={catIndex}>
                                    {cat}
                                </option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Cost</span>
                    <input value={formData.cost} onChange={handleChangeInput} 
                    type="number" name="cost" placeholder="e.g. 12.00" step="0.01" />
                </label>

                <label>
                    <span>Currency</span>
                    <select value={formData.currency} onChange={handleChangeInput} name="currency">
                        {['USD', 'EUR', 'GBP', 'NZD', 'AUD', 'Other'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Billing Frequency</span>
                    <select value={formData.billingFrequency} onChange={handleChangeInput} name="billingFrequency">
                        {['Monthly', 'Yearly', 'Quarterly', 'One-time'].map((bill, billIndex) => {
                            return (
                                <option key={billIndex}>{bill}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Payment Method</span>
                    <select value={formData.paymentMethod} onChange={handleChangeInput} name="paymentMethod">
                        {['Credit Card', 'Debit Card', 'PayPal', 'Bank transfer', 'Other'].map((pay, payIndex) => {
                            return (
                                <option key={payIndex}>{pay}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Subscription Start Date</span>
                    <input value={formData.startDate} onChange={handleChangeInput} 
                    type="date" name="startDate" required />
                </label>

                <label>
                    <span>Status</span>
                    <select value={formData.status} onChange={handleChangeInput} name="status">
                        {['Active', 'Paused', 'Cancelled'].map((stat, statIndex) => {
                            return (
                                <option key={statIndex}>{stat}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="fat-column">
                    <span>Notes</span>
                    <textarea value={formData.notes} onChange={handleChangeInput} 
                    name="notes" placeholder="e.g. Shared with family, includes cloud storage" />

                </label>
                
                <div className="fat-column form-submit-btns">
                    <button onClick={closeInput}>Cancel</button>
                    <button type="submit">
                        Add subscription
                    </button>
                </div>
            </form>
        </section>
    )
}