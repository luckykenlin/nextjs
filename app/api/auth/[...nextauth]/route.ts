import NextAuth from 'next-auth';
import {authOptions} from './_auth-options';

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}