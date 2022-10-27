import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: { email: "asd" },
      async authorize(credentials) {
        const { email, password } = credentials;

        const params = new URLSearchParams();
        params.append("email", email);
        params.append("password", password);

        const data = await axios.post(
          "https://api.dev.gatherinvesting.com/v2/users/signin",
          params
        );

        if (!data?.data) {
          throw new Error("invalid credentials");
        }

        return data.data;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
};

export default NextAuth(authOptions);
