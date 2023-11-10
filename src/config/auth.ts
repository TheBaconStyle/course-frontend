import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const AuthConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identifier: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(cred) {
        const headers = {
          Accept: '*/*',
          'Content-Type': 'application/json',
        };
        const body = JSON.stringify({
          identifier: cred?.identifier,
          password: cred?.password,
        });
        const method = 'POST';
        const res = await fetch(process.env.API_URL + 'api/auth/local', {
          method,
          body,
          headers,
        });
        if (res.status !== 200) {
          return null;
        }
        const userData = await res.json();
        return {
          jwt: userData.jwt,
          email: userData.user.email,
          name: userData.user.username,
          id: String(userData.user.id),
        };
      },
    }),
  ],
  pages: { signIn: '/' },
};
