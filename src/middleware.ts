import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {

    const token = await req.nextauth.token; // Retrieve the token from the request

    // Check if the user is authenticated and has the 'admin' role
    if (token && token.role === "admin") {
      return NextResponse.next(); // Allow access
    }

    // If the user does not have the 'admin' role, redirect them to the home page or an error page
    return NextResponse.redirect(new URL("/", req.url)); // Adjust the URL as needed
  },
  {
    callbacks: {
      async authorized({ token }) {
        // This callback can be used to determine if the user is authenticated
        // Return true if the user is authenticated
        return !!token;
      },
    },
  }
);
export const config = { matcher: ["/admin/:path*"] }