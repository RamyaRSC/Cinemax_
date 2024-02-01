import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { useForm, ValidationError } from '@formspree/react';


export default function ContactForm() {
  const [state, handleSubmit] = useForm("mayrqagp");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
    </div>  
    
  );
}