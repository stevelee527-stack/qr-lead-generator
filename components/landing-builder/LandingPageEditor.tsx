'use client';

import { useState } from 'react';
import { LandingPageContent } from '@/lib/landing-page-templates';
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{landingPage.name}</h1>
          <p className="text-gray-600 mt-1">
            URL: {process.env.NEXT_PUBLIC_APP_URL}/landing/{landingPage.slug}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Published</span>
          </label>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <input
                  type="color"
                  value={content.theme.primaryColor}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Secondary Color</label>
                <input
                  type="color"
                  value={content.theme.secondaryColor}
                  onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {content.sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 capitalize">{section.type} Section</h3>
              
              {section.type === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={section.content.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={section.content.subtitle}
                      onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              )}

              {section.type === 'form' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Form Heading</label>
                    <input
                      type="text"
                      value={section.content.heading}
                      onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Submit Button Text</label>
                    <input
                      type="text"
                      value={section.content.submitText}
                      onChange={(e) => updateSection(section.id, { submitText: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              )}

              {section.type === 'features' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Section Heading</label>
                  <input
                    type="text"
                    value={section.content.heading}
                    onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
            <div className="bg-white rounded shadow-lg overflow-hidden max-h-[800px] overflow-y-auto">
              <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%' }}>
                {/* Simplified preview - in production you'd render the actual component */}
                <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${content.theme.primaryColor}, ${content.theme.secondaryColor})`, color: 'white' }}>
                  <h1 className="text-4xl font-bold mb-4">
                    {content.sections.find(s => s.type === 'hero')?.content.title}
                  </h1>
                  <p className="text-xl">
                    {content.sections.find(s => s.type === 'hero')?.content.subtitle}
                  </p>
                </div>
                <div className="p-8 bg-gray-50">
                  <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: content.theme.primaryColor }}>
                      {content.sections.find(s => s.type === 'form')?.content.heading}
                    </h2>
                    <div className="space-y-3">
                      <div className="h-10 bg-gray-100 rounded"></div>
                      <div className="h-10 bg-gray-100 rounded"></div>
                      <button 
                        className="w-full h-10 rounded text-white font-semibold"
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
  );
}
