"use client"
import {SignedIn, SignedOut, SignInButton, UserButton, useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import Link from "next/link";
import {JSX, SVGProps} from "react";
import {Bell, Mail} from "lucide-react";

const Navbar = () => {
    const {user} = useUser()
    const pathname = "/option1"
    return (
        <section className={" "}>
            <header
                className="flex h-20 bg-white w-full mx-auto shrink-0 items-center justify-between px-4 md:px-6 ">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle className={"sr-only"}>Menu</SheetTitle>
                        <Link href="/" className="mr-6 lg:flex" prefetch={false}>
                            <MountainIcon className="h-6 w-6"/>
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <div className="grid gap-2 py-6">
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold"
                                prefetch={false}
                            >
                                Option 1
                            </Link>
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold"
                                prefetch={false}
                            >
                                Option 2
                            </Link>
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold"
                                prefetch={false}
                            >
                                Option 3
                            </Link>
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold"
                                prefetch={false}
                            >
                                Option 4
                            </Link>
                        </div>

                    </SheetContent>
                </Sheet>
                <Link href="/" className="mr-6 hidden lg:flex items-center gap-4" prefetch={false}>
                    <MountainIcon className="h-6 w-6"/>
                    <span className="sr-only">Acme Inc</span>
                    <h3>Job Horizon</h3>
                </Link>
                <nav className="hidden lg:flex gap-6">
                    <Link
                        href="#" // Set the correct href
                        className={`group inline-flex text-gray-600 font-semibold h-20 w-max items-center border-b-2 justify-center bg-white px-4 py-2 text-sm transition-colors
                ${pathname === "/option1"
                            ? "border-black text-gray-900 font-semibold outline-none" // Active state
                            : "border-transparent hover:border-black hover:text-gray-900"} 
                focus:border-black focus:text-gray-900 focus:font-semibold focus:outline-none
                disabled:pointer-events-none disabled:opacity-50
                dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50
                dark:focus:bg-gray-800 dark:focus:text-gray-50`}
                    >
                        Option 1
                    </Link>
                    <Link
                        href="#"
                        className="group inline-flex text-gray-400 font-semibold h-20 w-max items-center border-b-2 border-transparent justify-center bg-white px-4 py-2 text-sm transition-colors
             hover:border-b-2 hover:border-black hover:text-gray-900
             focus:border-b-2 focus:border-black focus:text-gray-900 focus:font-semibold focus:outline-none
             acive:border-b-2 acive:border-black acive:text-gray-900 acive:font-semibold acive:outline-none
             disabled:pointer-events-none disabled:opacity-50
             data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50
             dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50
             dark:focus:bg-gray-800 dark:focus:text-gray-50
             dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

                    >
                        Option 2
                    </Link>
                    <Link
                        href="#"
                        className="group inline-flex text-gray-400 font-semibold h-20 w-max items-center border-b-2 border-transparent justify-center bg-white px-4 py-2 text-sm transition-colors
             hover:border-b-2 hover:border-black hover:text-gray-900
             focus:border-b-2 focus:border-black focus:text-gray-900 focus:font-semibold focus:outline-none
             acive:border-b-2 acive:border-black acive:text-gray-900 acive:font-semibold acive:outline-none
             disabled:pointer-events-none disabled:opacity-50
             data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50
             dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50
             dark:focus:bg-gray-800 dark:focus:text-gray-50
             dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

                    >
                        Option 3
                    </Link>
                    <Link
                        href="#"
                        className="group inline-flex text-gray-400 font-semibold h-20 w-max items-center border-b-2 border-transparent justify-center bg-white px-4 py-2 text-sm transition-colors
             hover:border-b-2 hover:border-black hover:text-gray-900
             focus:border-b-2 focus:border-black focus:text-gray-900 focus:font-semibold focus:outline-none
             acive:border-b-2 acive:border-black acive:text-gray-900 acive:font-semibold acive:outline-none
             disabled:pointer-events-none disabled:opacity-50
             data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50
             dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50
             dark:focus:bg-gray-800 dark:focus:text-gray-50
             dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

                    >
                        Option 4
                    </Link>
                </nav>
                <div className="flex items-center gap-6">
                    {
                        user && (
                            <div className="flex items-center gap-6">
                                <Mail className={"text-gray-400 hover:text-black cursor-pointer"}/>
                                <Bell className={"text-gray-400 hover:text-black cursor-pointer"}/>
                            </div>

                        )
                    }

                    <div>
                        <SignedOut>
                            <SignInButton>
                                <Button className={"bg-black text-white hover:bg-gray-900 hover:text-white"}>Sign
                                    In</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton/>
                        </SignedIn>
                    </div>
                </div>
            </header>
        </section>
    );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    );
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
        </svg>
    );
}

export default Navbar;
