import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { TRPCProvider } from './trpc-provider';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header className="p-4 border-b flex items-center justify-between">
            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <TRPCProvider>
            <main>{children}</main>
          </TRPCProvider>
          <Toaster /> 
        </ClerkProvider>
      </body>
    </html>
  );
}
