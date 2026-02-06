import QRCodeStyling from 'qr-code-styling';

export interface QRCodeOptions {
  url: string;
  size?: number;
  logoUrl?: string;
  color?: string;
  backgroundColor?: string;
}

export async function generateStyledQRCode(options: QRCodeOptions): Promise<string> {
  const {
    url,
    size = 300,
    logoUrl,
    color = '#000000',
    backgroundColor = '#ffffff',
  } = options;

  const qrCode = new QRCodeStyling({
    width: size,
    height: size,
    type: 'canvas',
    data: url,
    dotsOptions: {
      color: color,
      type: 'rounded',
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10,
    },
    ...(logoUrl && {
      image: logoUrl,
    }),
  });

  // Generate blob and convert to data URL
  const blob = await qrCode.getRawData('png');
  if (!blob) throw new Error('Failed to generate QR code');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Simple QR code generation (server-side compatible)
export async function generateSimpleQRCode(text: string): Promise<string> {
  const QRCode = require('qrcode');
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
    return dataUrl;
  } catch (err) {
    throw new Error('Error generating QR code');
  }
}
