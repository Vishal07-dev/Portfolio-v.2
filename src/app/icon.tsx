import { ImageResponse } from "next/og";

// Auto-generated favicon. "VR" monogram matching the site's logo.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 600,
          color: "#f2a33a",
          borderRadius: 8,
          background: "#11141c",
        }}
      >
        VR
      </div>
    ),
    { ...size }
  );
}
