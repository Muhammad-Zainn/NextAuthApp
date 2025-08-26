import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "LogOut SUccesfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true, // required on Vercel (HTTPS)
      sameSite: "lax", // must match how it was set
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
