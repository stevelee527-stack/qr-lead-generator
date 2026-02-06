'use client';

import { useState } from 'react';
import { LandingPageContent } from '@/lib/landing-page-templates';
import { Save, Eye, Palette } from 'lucide-react';
import toast from 'react-hot-toast';

interface LandingPageEditorProps {
  landingPage: {
    id: string;
    name: string;
    slug: string;
    content: LandingPageContent;
    isPublished: boolean;
  };
}

export default function LandingPageEditor({ landingPage }: LandingPageEditorProps) {
  const [content, setContent] = useState<LandingPageContent>(landingPage.content);
  const [isPublished, setIsPublished] = useState(landingPage.isPublished);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/landing-pages/${landingPage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isPublished }),
      });

      if (!response.ok) throw new Error('Failed to save');

      toast.success('Landing page saved successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (sectionId: string, updates: any) => {
    setContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, ...updates } }
          : section
      ),
    }));
  };

  const updateTheme = (updates: Partial<LandingPageContent['theme']>) => {
    setContent((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...updates },
    }));
  };

  return (
    <div className="min-h-screen bg-sand-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-sand-900 tracking-tight">{landingPage.name}</h1>
            <p className="text-sm text-sand-500 mt-1">
              {process.env.NEXT_PUBLIC_APP_URL}/landing/{landingPage.slug}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-sand-200 cursor-pointer">
              <div className={`w-9 h-5 rounded-full transition-colors ${isPublished ? 'bg-emerald-500' : 'bg-sand-300'} relative`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isPublished ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm font-medium text-sand-700">
                {isPublished ? 'Published' : 'Draft'}
              </span>
            </label>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-5">
            <div className="card">
              <div className="flex items-center gap-2 mb-5">
                <Palette className="w-4 h-4 text-accent" />
                <h2 className="text-base font-semibold text-sand-800">Theme Settings</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">Primary</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-sand-200 p-0.5"
                    />
                    <span className="text-sm text-sand-600 font-mono">{content.theme.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">Secondary</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-sand-200 p-0.5"
                    />
                    <span className="text-sm text-sand-600 font-mono">{content.theme.secondaryColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {content.sections.map((section) => (
              <div key={section.id} className="card">
                <h3 className="text-base font-semibold text-sand-800 mb-4 capitalize">{section.type} Section</h3>

                {section.type === 'hero' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">Title</label>
                      <input
                        type="text"
                        value={section.content.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={section.content.subtitle}
                        onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>
                )}

                {section.type === 'form' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">Form Heading</label>
                      <input
                        type="text"
                        value={section.content.heading}
                        onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">Submit Button</label>
                      <input
                        type="text"
                        value={section.content.submitText}
                        onChange={(e) => updateSection(section.id, { submitText: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>
                )}

                {section.type === 'features' && (
                  <div>
                    <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">Section Heading</label>
                    <input
                      type="text"
                      value={section.content.heading}
                      onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                      className="input-field"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="card bg-sand-50">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-accent" />
                <h2 className="text-base font-semibold text-sand-800">Live Preview</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-soft-md overflow-hidden max-h-[700px] overflow-y-auto border border-sand-100">
                <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%' }}>
                  <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${content.theme.primaryColor}, ${content.theme.secondaryColor})`, color: 'white' }}>
                    <h1 className="text-4xl font-bold mb-4">
                      {content.sections.find(s => s.type === 'hero')?.content.title}
                    </h1>
                    <p className="text-xl opacity-90">
                      {content.sections.find(s => s.type === 'hero')?.content.subtitle}
                    </p>
                  </div>
                  <div className="p-8 bg-sand-50">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-soft">
                      <h2 className="text-2xl font-bold mb-4" style={{ color: content.theme.primaryColor }}>
                        {content.sections.find(s => s.type === 'form')?.content.heading}
                      </h2>
                      <div className="space-y-3">
                        <div className="h-11 bg-sand-50 rounded-xl border border-sand-200" />
                        <div className="h-11 bg-sand-50 rounded-xl border border-sand-200" />
                        <button
                          className="w-full h-11 rounded-xl text-white font-semibold"
                          style={{ backgroundColor: content.theme.primaryColor }}
                        >
                          {content.sections.find(s => s.type === 'form')?.content.submitText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
