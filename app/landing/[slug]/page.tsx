import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import LandingPageRenderer from '@/components/landing-builder/LandingPageRenderer';

export default async function LandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const landingPage = await prisma.landingPage.findUnique({
    where: { slug: params.slug },
    include: { campaign: true },
  });

  if (!landingPage || !landingPage.isPublished) {
    notFound();
  }

  return (
    <LandingPageRenderer
      content={landingPage.content as any}
      slug={landingPage.slug}
      campaignId={landingPage.campaignId}
      landingPageId={landingPage.id}
    />
  );
}
