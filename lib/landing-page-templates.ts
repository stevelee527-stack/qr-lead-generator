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
        title: 'Custom Window Treatments for Your Home',
        subtitle: 'Free In-Home Consultation • We Bring the Showroom to You',
        backgroundImage: '',
      },
    },
    {
      id: 'form-1',
      type: 'form',
      content: {
        heading: 'Schedule Your Free Consultation',
        fields: [
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'text', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          {
            name: 'windowCount',
            label: 'How many windows do you have?',
            type: 'radio',
            required: true,
            options: [
              { value: '1-5', label: '1-5 windows' },
              { value: '5-10', label: '5-10 windows' },
              { value: '10+', label: '10+ windows' }
            ]
          },
        ],
        submitText: 'Request Free Consultation',
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        heading: 'Why Choose Us',
        features: [
          {
            icon: '🏠',
            title: 'In-Home Service',
            description: 'We bring our showroom to you for a convenient, pressure-free consultation',
          },
          {
            icon: '✂️',
            title: 'Custom Made',
            description: 'Blinds, shades, shutters, and draperies crafted to your exact specifications',
          },
          {
            icon: '🔧',
            title: 'Full Service',
            description: 'Professional measuring, manufacturing, and installation - all included',
          },
        ],
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        text: '© 2026 Custom Window Treatments. 40 Years of Excellence.',
      },
    },
  ],
  theme: {
    primaryColor: '#8b4513',
    secondaryColor: '#654321',
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
