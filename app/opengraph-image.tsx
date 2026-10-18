import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const barlowRegular = await readFile(
  join(process.cwd(), "assets/Barlow-Regular.ttf"),
);
const barlowBold = await readFile(join(process.cwd(), "assets/Barlow-Bold.ttf"));

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "96px",
          background: "#020d1c",
          fontFamily: "Barlow",
        }}
      >
        <span style={{ fontSize: "84px", fontWeight: 700, color: "#f5f5f5" }}>
          {profile.name}
        </span>
        <span
          style={{
            fontSize: "38px",
            fontWeight: 400,
            color: "#9ca3af",
            marginTop: "28px",
          }}
        >
          {profile.tagline}
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow", data: barlowRegular, weight: 400, style: "normal" },
        { name: "Barlow", data: barlowBold, weight: 700, style: "normal" },
      ],
    },
  );
}
