import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';
import { TRPCProvider } from './trpc-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-muted'>
      <Toaster />
        <ClerkProvider>
          <header className="p-4 border-b flex items-center justify-end bg-white">
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
