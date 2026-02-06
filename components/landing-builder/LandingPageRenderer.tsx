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
                className="py-24 px-6 text-center"
                style={{
                  background: section.content.backgroundImage
                    ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${section.content.backgroundImage})`
                    : `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                }}
              >
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                    {section.content.title}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto">
                    {section.content.subtitle}
                  </p>
                </div>
              </section>
            );

          case 'form':
            return (
              <section
                key={section.id}
                className="py-20 px-6"
                style={{ backgroundColor: '#f5f3ef' }}
              >
                <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-10 border border-gray-100">
                  <h2 className="text-3xl font-bold text-center mb-8" style={{ color: theme.primaryColor }}>
                    {section.content.heading}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {section.content.fields.map((field: any) => (
                      <div key={field.name}>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#9a9082' }}>
                          {field.label}
                          {field.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                            style={{ focusRingColor: theme.primaryColor } as any}
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                          />
                        )}
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold transition-all duration-200 disabled:opacity-50 hover:opacity-90 active:scale-[0.98]"
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
              <section key={section.id} className="py-20 px-6" style={{ backgroundColor: '#fff' }}>
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-14" style={{ color: theme.primaryColor }}>
                    {section.content.heading}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.content.features.map((feature: any, idx: number) => (
                      <div key={idx} className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                        <div className="text-5xl mb-5">{feature.icon}</div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: '#332e28' }}>{feature.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{feature.description}</p>
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
                className="py-10 px-6 text-center"
                style={{ backgroundColor: '#332e28', color: '#d5cfc4' }}
              >
                <p className="text-sm">{section.content.text}</p>
              </footer>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
