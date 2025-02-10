import React, { useState } from 'react';
import { 
  BiCard, BiCoinStack, BiLockAlt, BiSolidBookAdd, BiSupport, 
  BiTargetLock, BiTransferAlt, BiUserCircle, BiXCircle, 
  BiChevronDown, BiChevronUp 
} from "react-icons/bi";
import './UserHelp.css';

const UserHelp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "How can I track my order?", answer: "You can track your order in the 'Order History' section." },
    { question: "What payment method do you accept?", answer: "We accept credit/debit cards and COD." },
    { question: "How do I cancel an order?", answer: "Go to 'Order History' and click 'Cancel Order' for your active order." },
    { question: "What should I do if my order is late?", answer: "Contact our support team through the 'Message' section." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      <header className="help-header">
        <p>Hi Thisari Hettiarachchi, How can we help?</p>
        <input type="text" placeholder="Search for topics, questions..." className="help-search" />
      </header>

      <section className="self-service">
        <p>Self Service Tools</p>
        <div className="service-options">
          <div className="service-row">
            <a href="#" className="service-item">
              <BiUserCircle className="service-icon" />
              <span>My Profile</span>
            </a>
            <a href="#" className="service-item">
              <BiSolidBookAdd className="service-icon" />
              <span>Address Book</span>
            </a>
            <a href="#" className="service-item">
              <BiTransferAlt className="service-icon" />
              <span>Return My Order</span>
            </a>
          </div>
          <div className="service-row">
            <a href="#" className="service-item">
              <BiTargetLock className="service-icon" />
              <span>Track My Order</span>
            </a>
            <a href="#" className="service-item">
              <BiLockAlt className="service-icon" />
              <span>Reset My Password</span>
            </a>
            <a href="#" className="service-item">
              <BiCard className="service-icon" />
              <span>My Payment Options</span>
            </a>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <p>Top Questions</p>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
              <div className="faq-question">
                <p>{faq.question}</p>
                {activeIndex === index ? (
                  <BiChevronUp className="faq-icon" />
                ) : (
                  <BiChevronDown className="faq-icon" />
                )}
              </div>
              {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="customer_care">
        <p className="customer-heading"><BiSupport className="customer-icon" /> Contact Customer Care</p>
        <p className="subheading">9am - 6pm Monday to Sunday</p>
      </section>
    </div>
  );
};

export default UserHelp;
