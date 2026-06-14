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
          fontWeight: 700,
          color: "#ffffff",
          borderRadius: 8,
          background: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%)",
        }}
      >
        VR
      </div>
    ),
    { ...size }
  );
}
