export interface LandingPageSection {
  id: string;
  type: 'hero' | 'form' | 'features' | 'footer';
  content: Record<string, any>;
}

export interface LandingPageContent {
  sections: LandingPageSection[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export const defaultLandingPage: LandingPageContent = {
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        title: 'Transform Your Space',
        subtitle: 'Professional design consultation for your dream home',
        backgroundImage: '',
      },
    },
    {
      id: 'form-1',
      type: 'form',
      content: {
        heading: 'Get Your Free Consultation',
        fields: [
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
          { name: 'message', label: 'Tell us about your project', type: 'textarea', required: false },
        ],
        submitText: 'Request Consultation',
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        heading: 'Why Choose Us',
        features: [
          {
            icon: '✨',
            title: 'Expert Design',
            description: '20+ years of experience in interior design',
          },
          {
            icon: '🎨',
            title: 'Custom Solutions',
            description: 'Tailored designs for your unique style',
          },
          {
            icon: '⚡',
            title: 'Fast Turnaround',
            description: 'Quick consultations and project delivery',
          },
        ],
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        text: '© 2026 Design Consultants. All rights reserved.',
      },
    },
  ],
  theme: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    fontFamily: 'Inter, sans-serif',
  },
};

export const templates = {
  default: defaultLandingPage,
  minimal: {
    sections: [
      {
        id: 'hero-minimal',
        type: 'hero' as const,
        content: {
          title: 'Start Your Project Today',
          subtitle: 'Simple. Fast. Professional.',
          backgroundImage: '',
        },
      },
      {
        id: 'form-minimal',
        type: 'form' as const,
        content: {
          heading: 'Contact Us',
          fields: [
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'name', label: 'Name', type: 'text', required: true },
          ],
          submitText: 'Submit',
        },
      },
    ],
    theme: {
      primaryColor: '#000000',
      secondaryColor: '#333333',
      fontFamily: 'Arial, sans-serif',
    },
  },
};
