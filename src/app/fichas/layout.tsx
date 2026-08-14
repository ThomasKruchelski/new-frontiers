import { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import { ToastContainer } from 'react-toastify';
import { FichaProvider } from '@/contexts/FichaContext';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}><FichaProvider>{children}<ToastContainer /></FichaProvider></HomeLayout>;
}
