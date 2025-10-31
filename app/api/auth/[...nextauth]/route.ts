// Import NextAuth and GoogleProvider
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { routesPaths } from '@/app/routes/routes';

// Define authentication handler
const handler = NextAuth({
  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // Define callbacks for handling sessions
  callbacks: {
    session({ session, token }) {
      // Add the 'id' property to the user object in the session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  // Configure custom pages for authentication
  pages: {
    signIn: routesPaths?.signin, // Specify the custom sign-in page
  },
});
// Export the authentication handler for both GET and POST requests
export { handler as GET, handler as POST };
