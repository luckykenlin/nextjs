import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Providers from "@/components/Providers";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className={'mx-auto max-w-2xl space-y-6'}>
                    {children}
                </div>
            </main>
        </Providers>
        </body>
        </html>
    )
}
