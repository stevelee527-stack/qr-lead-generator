const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const defaultLandingPage = {
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

async function main() {
    // Get the admin user
    const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });

    if (!admin) {
        console.error('No admin user found. Please run seed first.');
        process.exit(1);
    }

    // Create a test campaign
    const campaign = await prisma.campaign.upsert({
        where: { id: 'test-campaign-window-treatment' },
        update: {},
        create: {
            id: 'test-campaign-window-treatment',
            name: 'Window Treatment Campaign',
            description: 'Test campaign for window treatment lead generation',
            userId: admin.id,
        },
    });

    console.log('Created campaign:', campaign);

    // Create a test landing page
    const landingPage = await prisma.landingPage.upsert({
        where: { slug: 'window-treatment' },
        update: {
            content: defaultLandingPage,
            isPublished: true,
        },
        create: {
            name: 'Window Treatment Consultation',
            slug: 'window-treatment',
            content: defaultLandingPage,
            isPublished: true,
            campaignId: campaign.id,
        },
    });

    console.log('Created landing page:', landingPage);
    console.log('\nYou can now view the landing page at: http://localhost:3000/landing/window-treatment');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

