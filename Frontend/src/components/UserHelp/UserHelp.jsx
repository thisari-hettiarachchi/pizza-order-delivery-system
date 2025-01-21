import React from 'react'
import './UserHelp.css';

const UserHelp = () => {
  const faqs = [
    { question: "How can i track my order?", answer: "You can track your order in the 'Order History' section."},
    { question: "What payment method do you accept?", answer: "We accept credit/debit cards and COD."},
    { question: "How do I cancel an order?", answer: "Go to 'Order History' and click 'Cancel Order' for your active order."},
    { question: "What should I do if my order is late?", answer: "Contact our support team through the 'Message' section."},
  ]
  
  return (
    <div className="help-section">
      <p className="help-title">Help</p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserHelp