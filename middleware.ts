import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/authentication/login", // Redirect unauthenticated users to login
  },
});

export const config = {
  matcher: ["/admin","/admin/:path*", "/dashboard/:path*"], // Protects these routes
};
