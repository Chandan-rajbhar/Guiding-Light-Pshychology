import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { doctorData } from '../data/doctor';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Your name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Connect to Contact Form 7 endpoint or trigger mailto fallback
      // Real form submission with proper feedback
      const payload = new FormData();
      payload.append('_wpcf7', '515');
      payload.append('_wpcf7_version', '6.2.5');
      payload.append('_wpcf7_locale', 'en_US');
      payload.append('_wpcf7_unit_tag', 'wpcf7-f515-p499-o1');
      payload.append('your-name', formData.name);
      payload.append('your-email', formData.email);
      payload.append('your-subject', formData.subject);
      payload.append('your-message', formData.message || '');

      let sentSuccessfully = false;

      try {
        const response = await fetch('https://guidinglightnow.com/wp-json/contact-form-7/v1/contact-forms/515/feedback', {
          method: 'POST',
          body: payload
        });
        if (response.ok) {
          const resJson = await response.json();
          if (resJson.status === 'mail_sent') {
            sentSuccessfully = true;
          }
        }
      } catch (networkErr) {
        // Fallback for CORS or server-side restrictions on client fetch
        console.log('Online endpoint not accepting direct CORS request, utilizing standard client mail dispatch');
      }

      // If direct API endpoint was blocked by browser CORS, open default email client with exact pre-filled parameters
      if (!sentSuccessfully) {
        const mailtoLink = `mailto:${doctorData.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoLink;
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setErrorMessage('There was an issue sending your message. Please reach out directly via phone or email.');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-soft">
      <h3 className="font-serif font-bold text-lg text-brand-dark mb-1">
        Send a Message
      </h3>
      <p className="text-xs text-neutral-600 mb-5 leading-relaxed">
        Fill out the form below to inquire about therapy, scheduling, or questions. I look forward to connecting with you.
      </p>

      {status === 'success' && (
        <div className="p-4 mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-emerald-900">Message Prepared / Sent!</h4>
            <p className="mt-0.5 text-emerald-700">Thank you for reaching out. Dr. Anna will get back to you within 24-48 business hours.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-rose-900">Unable to Submit</h4>
            <p className="mt-0.5 text-rose-700">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 border transition-all focus:bg-white focus:outline-hidden ${
              errors.name 
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-300' 
                : 'border-neutral-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
            }`}
          />
          {errors.name && <p className="mt-1 text-[11px] text-rose-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Your Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. jane@example.com"
            className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 border transition-all focus:bg-white focus:outline-hidden ${
              errors.email 
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-300' 
                : 'border-neutral-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
            }`}
          />
          {errors.email && <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Inquiry regarding ADHD Therapy"
            className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 border transition-all focus:bg-white focus:outline-hidden ${
              errors.subject 
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-300' 
                : 'border-neutral-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
            }`}
          />
          {errors.subject && <p className="mt-1 text-[11px] text-rose-600">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Your Message <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share a bit about what you're seeking help with..."
            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 border border-neutral-200 focus:border-brand-primary focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-brand-primary resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-xs hover:shadow-md active:scale-[0.99] transition-all disabled:opacity-70 cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
