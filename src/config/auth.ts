import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const AuthConfig: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.jwt = token.jwt;
        session.user.id = token.id;
        session.user.type = token.type;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.type = user.type;
      }

      return token;
    },
  },
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

        const authRes = await fetch(process.env.API_URL + 'api/auth/local', {
          method: 'POST',
          body,
          headers,
        });

        if (authRes.status !== 200) {
          return null;
        }

        const authData = await authRes.json();

        const accountRes = await fetch(
          process.env.API_URL + 'api/users/me?populate=*',
          {
            method: 'GET',
            headers: {
              ...headers,
              Authorization: `bearer ${authData.jwt}`,
            },
          },
        );

        if (accountRes.status !== 200) {
          return null;
        }

        const accountData = await accountRes.json();

        const roleType = accountData.role.type;

        const personalRes = await fetch(
          process.env.API_URL +
            `api/${roleType}s?filters[account][id][$eq]=${authData.user.id}`,
          {
            method: 'GET',
            headers: {
              ...headers,
              Authorization: `bearer ${process.env.API_KEY}`,
            },
          },
        );

        if (personalRes.status !== 200) {
          return null;
        }

        const personalData = (await personalRes.json()).data[0];

        return {
          jwt: authData.jwt,
          email: authData.user.email,
          name: `${personalData.surname} ${personalData.firstName} ${personalData.lastName}`,
          id: String(accountData.id),
          type: roleType,
        };
      },
    }),
  ],
  pages: { signIn: '/' },
};
