import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI+教育：工具之问',
  description: 'An interactive exploration of Chapter 5 from the "Human-Machine Co-Education" report.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      primary: '#2563eb', // Blue 600
                      secondary: '#4f46e5', // Indigo 600
                      accent: '#f59e0b', // Amber 500
                      paper: '#f8fafc', // Slate 50
                    },
                    fontFamily: {
                      sans: ['Inter', 'system-ui', 'sans-serif'],
                      serif: ['Merriweather', 'serif'],
                    }
                  }
                }
              }
            `,
          }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Merriweather:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-100 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}