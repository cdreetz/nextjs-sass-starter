import '@root/global.scss';
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import '@root/animations.scss';
import Providers from '@components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-light"><StackProvider app={stackServerApp}><StackTheme>
        <Providers>{children}</Providers>
      </StackTheme></StackProvider></body>
    </html>
  );
}
