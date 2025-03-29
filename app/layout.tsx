import type { Metadata } from 'next'
import './globals.css'
import ParticleBackground from '@/components/ParticleBackground'

export const metadata: Metadata = {
  title: 'Sneha Sawant | Software Developer',
  description: 'Sneha Sawant is a Software Developer with 6 years of experience in graphics programming, game development, and software engineering. Explore her projects and professional journey.',
  keywords: ['Sneha Sawant', 'Software Developer', 'Graphics Programming', 'Game Development', 'C++', 'OpenGL', 'CUDA', 'DirectX', 'WebGL', 'Portfolio'],
  authors: [{ name: 'Sneha Sawant' }],
  creator: 'Sneha Sawant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sneha-sawant.com',
    title: 'Sneha Sawant | Software Developer',
    description: 'Software Developer with expertise in graphics programming, game development, and software engineering.',
    siteName: 'Sneha Sawant Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sneha Sawant | Software Developer',
    description: 'Software Developer with expertise in graphics programming, game development, and software engineering.',
    creator: '@sawantsneha'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ParticleBackground />
        {children}
      </body>
    </html>
  )
}
