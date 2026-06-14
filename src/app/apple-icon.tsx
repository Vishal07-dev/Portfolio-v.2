import { ImageResponse } from "next/og";

// Auto-generated Apple touch icon. "VR" monogram matching the site's logo.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 96,
          fontWeight: 700,
          color: "#ffffff",
          background: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%)",
        }}
      >
        VR
      </div>
    ),
    { ...size }
  );
}
