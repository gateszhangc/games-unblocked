'use client';

import { useServerInsertedHTML } from 'next/navigation';

interface HeadInjectorProps {
  headContent: string;
}

export function HeadInjector({ headContent }: HeadInjectorProps) {
  useServerInsertedHTML(() => {
    return <div dangerouslySetInnerHTML={{ __html: headContent }} />;
  });

  return null;
}