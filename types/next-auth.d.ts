import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    jwt: string;
    type: string;
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession['user'];
  }
}
