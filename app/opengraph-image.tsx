import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#020d1c",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "104px",
              height: "104px",
              borderRadius: "22px",
              background: "#000000",
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: 700,
            }}
          >
            JD
          </div>
          <span style={{ fontSize: "56px", fontWeight: 600 }}>
            {profile.name}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "56px", fontWeight: 600, maxWidth: "980px" }}>
            {profile.tagline}
          </span>
          <span style={{ fontSize: "30px", color: "#e09a19", marginTop: "28px" }}>
            {profile.location}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
