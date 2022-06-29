import { NextResponse } from "next/server";

const signedinPages = ['/', '/playlist', '/library'];

export default function middleware(req) {
    if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies[process.env.TOKEN_NAME];

        if (!token) {
            return NextResponse.redirect('/signin');
        }
    }
        
}