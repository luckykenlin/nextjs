import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getPosts} from "@/lib/post";
import DelButton from "@/components/DelButton";
import Providers from "@/components/Providers";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LogoutButton";

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
    const posts = await getPosts();
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <nav className="mx-auto max-w-2xl h-16 w-full flex items-center justify-end">
                    <div className={'mr-2'}>hi, {session?.user?.name}</div>
                    <LogoutButton/>
                </nav>
                <div className={'mx-auto max-w-2xl space-y-6'}>
                    <div className="flex justify-end items-center w-full mb-3">
                        <Button asChild>
                            <Link href={'create'}>New</Link>
                        </Button>
                    </div>

                    {
                        posts.map(post => {
                            return (
                                <Card key={post.id}>
                                    <CardHeader>
                                        <CardTitle>{post.id} | {post.title}</CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p>{post.body}</p>
                                    </CardContent>

                                    <CardFooter className={'space-x-4'}>
                                        <DelButton id={post.id}/>
                                        <Button asChild variant={'outline'}>
                                            <Link href={'edit/' + post.id}>Edit</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            </main>
        </Providers>
        {children}
        </body>
        </html>
    )
}
