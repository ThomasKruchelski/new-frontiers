import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image'

import logo from "src/public/logo.png"
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src={logo} alt="New Frontiers" width={350} />
      </>
    ),
  },
  links: [
    {
      text: 'Documentação',
      url: '/docs',
      active: 'nested-url',
    },
  ],
};
