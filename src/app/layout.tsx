import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import Waves from '@/components/Waves'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen relative">
        <Analytics/>
        <div className='w-full h-full z-10 fixed'>
          <Waves
            lineColor="#130240"
            backgroundColor="#060010"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={15}
            xGap={12}
            yGap={36}
          />
        </div>
        <div className='w-full h-full z-20'>
          <RootProvider>{children}</RootProvider>
        </div>
      </body>
    </html>
  );
}
