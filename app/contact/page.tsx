'use client';

import { useState } from 'react';
import AdSlot from '../components/AdSlot';

const SUPPORT_EMAIL = 'hello@JigMerge.online';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const mailSubject = `[JigMerge] ${formData.subject || 'General Inquiry'}`;
        const mailBody = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Topic: ${formData.subject}`,
            '',
            formData.message,
        ].join('\n');

        const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        window.location.href = mailtoUrl;
        setSubmitted(true);
    };

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Contact Us</h1>
                    <p>Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.</p>
                </div>
            </div>

            <div className="page-content">
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2>Get In Touch</h2>
                    <p>
                        We value every message from our community. Whether you&apos;re reporting a bug, suggesting
                        a new feature, asking about partnerships, or simply sharing your love for puzzles,
                        we&apos;re here to listen.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        margin: '2rem 0',
                    }}>
                        {[
                            { icon: '📧', label: 'Email', value: SUPPORT_EMAIL },
                            { icon: '⏱️', label: 'Response Time', value: 'Within 48 hours' },
                            { icon: '🌍', label: 'Available', value: 'Worldwide' },
                        ].map((item) => (
                            <div key={item.label} className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                                <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{item.label}</strong>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <AdSlot type="in-content" />

                    <h2>Send Us a Message</h2>

                    {submitted ? (
                        <div className="card" style={{
                            textAlign: 'center',
                            padding: '3rem 2rem',
                            borderColor: 'var(--accent)',
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📨</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Email app opened</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                If your email app did not open, send your message manually to {SUPPORT_EMAIL}.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label htmlFor="name" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: 'var(--text)',
                                }}>
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-card)',
                                        color: 'var(--text)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color var(--transition)',
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: 'var(--text)',
                                }}>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-card)',
                                        color: 'var(--text)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color var(--transition)',
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: 'var(--text)',
                                }}>
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-card)',
                                        color: 'var(--text)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                    }}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="General Feedback">General Feedback</option>
                                    <option value="Bug Report">Bug Report</option>
                                    <option value="Feature Request">Feature Request</option>
                                    <option value="Partnership Inquiry">Partnership Inquiry</option>
                                    <option value="Privacy Concern">Privacy Concern</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: 'var(--text)',
                                }}>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={6}
                                    placeholder="Tell us what's on your mind..."
                                    value={formData.message}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-card)',
                                        color: 'var(--text)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Compose Email
                            </button>
                        </form>
                    )}

                    <h2>Frequently Asked</h2>
                    <p>
                        Before reaching out, you might find your answer in our <a href="/faq">FAQ page</a>.
                        We&apos;ve compiled answers to the most common questions about JigMerge, gameplay
                        mechanics, and technical issues.
                    </p>
                </div>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
