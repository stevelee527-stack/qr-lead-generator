'use client';

import { useState } from 'react';
import { LandingPageContent } from '@/lib/landing-page-templates';
import toast from 'react-hot-toast';

interface LandingPageRendererProps {
  content: LandingPageContent;
  slug: string;
  campaignId: string;
  landingPageId: string;
}

export default function LandingPageRenderer({
  content,
  slug,
  campaignId,
  landingPageId,
}: LandingPageRendererProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          landingPageId,
          ...formData,
          source: 'landing_page',
        }),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      toast.success('Thank you! We\'ll be in touch soon.');
      setFormData({});
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { sections, theme } = content;

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: theme.fontFamily }}
    >
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return (
              <section
                key={section.id}
                className="py-20 px-4 text-center"
                style={{
                  background: section.content.backgroundImage
                    ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${section.content.backgroundImage})`
                    : `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                }}
              >
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    {section.content.title}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90">
                    {section.content.subtitle}
                  </p>
                </div>
              </section>
            );

          case 'form':
            return (
              <section
                key={section.id}
                className="py-16 px-4 bg-gray-50"
              >
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-center mb-8" style={{ color: theme.primaryColor }}>
                    {section.content.heading}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {section.content.fields.map((field: any) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-md text-white font-semibold transition-colors disabled:opacity-50"
                      style={{
                        backgroundColor: theme.primaryColor,
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : section.content.submitText}
                    </button>
                  </form>
                </div>
              </section>
            );

          case 'features':
            return (
              <section key={section.id} className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-12" style={{ color: theme.primaryColor }}>
                    {section.content.heading}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.content.features.map((feature: any, idx: number) => (
                      <div key={idx} className="text-center p-6">
                        <div className="text-5xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'footer':
            return (
              <footer
                key={section.id}
                className="py-8 px-4 text-center text-white"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                <p>{section.content.text}</p>
              </footer>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
