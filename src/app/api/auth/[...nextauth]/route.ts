import { AuthConfig } from '@/config'
import NextAuth from 'next-auth/next'

const handler = NextAuth(AuthConfig)

export { handler as GET, handler as POST }
