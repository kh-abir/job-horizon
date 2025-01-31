import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { TRPCProvider } from './trpc-provider';
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-muted'>
      <Toaster />
        <ClerkProvider>
          <Navbar />
          <TRPCProvider>
            <main>{children}</main>
          </TRPCProvider>
          <Toaster /> 
        </ClerkProvider>
      </body>
    </html>
  );
}
