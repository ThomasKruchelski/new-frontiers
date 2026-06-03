import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

import logo from "src/public/logo.png";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

const isDevelopment = process.env.NODE_ENV === "development" ? "" : "hidden";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <div className="flex flex-col items-center leading-3">
          <Image src={logo} alt="New Frontiers" width={350} />
          <i className={isDevelopment}>Versão de Desenvolvimento</i>
        </div>
      </>
    ),
  },
  links: [
    {
      text: "Documentação",
      url: "/docs",
      active: "nested-url",
    },
    {
      text: "Ficha",
      url: "/ficha",
      active: "nested-url",
    },
  ],
};
