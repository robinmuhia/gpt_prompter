import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "utils/database";
import User from "models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user!.email });
      //creating id in user object
      // @ts-ignore
      session.user!.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile!.email });
        if (!userExists) {
          await User.create({
            email: profile!.email,
            username: profile!.name?.replace(" ", "").toLowerCase(),
            //for some reason picture doesn't exist
            //@ts-ignore
            image: profile!.picture,
          });
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
