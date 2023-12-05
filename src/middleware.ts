import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "./utils";
export async function middleware(req: NextRequest) {
    const previousPage = req.nextUrl.pathname
 
  if (previousPage.startsWith("/checkout")) {
    const token = req.cookies.get("token")?.value
    if (!token || !(await isValidToken(token))) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      )
    }
 
    try {
      await isValidToken(token)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      )
    }
  }
}

export const config = {
    matcher: ["/checkout/:path*"],
  }
 
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const previousPage = request.nextUrl.pathname;

//   if (previousPage.startsWith("/checkout")) {
//     const token = request.cookies.get("token")?.value;
//     console.log(token);
    
//     if (!token) {
//       return NextResponse.redirect(
//         new URL(`/auth/login?p=${previousPage}`, request.url)
//       );
//     }

//     try {
//       await isValidToken(token);
//       return NextResponse.next();
//     } catch (error) {
//         console.log(error, previousPage);
//       return NextResponse.redirect(new URL(`/auth/login?p=${previousPage}`, request.url));
//     }
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/checkout/:path*",
// };
// // import { NextResponse, type NextRequest } from "next/server"

// // import { isValidToken } from "@/utils/jwt"

// // export async function middleware(request: NextRequest) {
// //   const previousPage = req.nextUrl.pathname

// //   if (previousPage.startsWith("/checkout")) {
// //     const token = req.cookies.get("token")?.value
// //     if (!token || !(await isValidToken(token))) {
// //       return NextResponse.redirect(
// //         new URL(`/auth/login?p=${previousPage}`, req.url)
// //       )
// //     }

// //     try {
// //       await isValidToken(token)
// //       return NextResponse.next()
// //     } catch (error) {
// //       return NextResponse.redirect(`/auth/login?p=${previousPage}`
// //       )
// //     }
// //   }
// // }

// // export const config = {
// //   matcher: ["/checkout/:path*"],
// // }
