import { NextRequest, NextResponse } from "next/server";

import {
  ALLOWED_TYPES,
  MAX_FILE_SIZE_MB,
  MAX_IMAGES,
} from "@/components/common/controlled-inputs/image-uploader/constants";
import { auth0 } from "@/lib/auth0";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    let filteredFiles = files.filter(
      (file) =>
        ALLOWED_TYPES.includes(file.type) &&
        file.size <= MAX_FILE_SIZE_MB * 1024 * 1024
    );
    
    if ( filteredFiles.length > MAX_IMAGES){
      filteredFiles = filteredFiles.slice(0, Math.min(filteredFiles.length, MAX_IMAGES));
    };

    if (!filteredFiles.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadPromises = filteredFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "listings" }, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          })
          .end(buffer);
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    return NextResponse.json({ results: uploadResults });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
