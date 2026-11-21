import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function MarkdownContent({ children, className = '' }) {
  if (!children) return null;

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Customiza a renderização das tags de Link
          a: ({ href, children }) => {
            const isInternal = href && ( href.startsWith('#'));

            // Links internos usam o Link do Next.js
            if (isInternal) {
              return (
                <Link 
                  href={href} 
                  className="text-blue-500 font-medium underline underline-offset-2 hover:text-blue-400 transition-colors"
                >
                  {children}
                </Link>
              );
            }

            // Links externos abrem em nova aba com <a> comum
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-medium underline underline-offset-2 hover:text-blue-400 transition-colors"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}