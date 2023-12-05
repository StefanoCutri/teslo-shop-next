import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "./utils";
export async function middleware(req: NextRequest) {
  //   const previousPage = req.nextUrl.pathname
 
  // if (previousPage.startsWith("/checkout")) {
  //   const token = req.cookies.get("token")?.value
  //   if (!token || !(await isValidToken(token))) {
  //     return NextResponse.redirect(
  //       new URL(`/auth/login?p=${previousPage}`, req.url)
  //     )
  //   }
 
  //   try {
  //     await isValidToken(token)
  //     return NextResponse.next()
  //   } catch (error) {
  //     return NextResponse.redirect(
  //       new URL(`/auth/login?p=${previousPage}`, req.url)
  //     )
  //   }
  // }
}

export const config = {
    matcher: ["/checkout/:path*"],
  }
 