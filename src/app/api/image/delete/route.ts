import { NextRequest, NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { publicIds } = await req.json();

    if (!Array.isArray(publicIds) || publicIds.length === 0) {
      return NextResponse.json(
        { error: "No valid publicIds provided" },
        { status: 400 }
      );
    }

    await cloudinary.api.delete_resources(
      publicIds.map((id) => `listings/${id}`)
    );

    return NextResponse.json({ result: "ok" });
  } catch (error) {
    console.error("Delete error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
