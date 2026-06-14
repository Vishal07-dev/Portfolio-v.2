import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

// Auto-generated social share card (WhatsApp / LinkedIn / X previews).
export const alt = `${siteConfig.name}, ${siteConfig.role} in Ahmedabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07070f",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at 10% 90%, rgba(217,70,239,0.25), transparent 45%)",
        }}
      >
        {/* Monogram */}
        <div
          style={{
            width: 96,
            height: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
            fontSize: 44,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 48,
            background: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%)",
          }}
        >
          VR
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 500,
            marginTop: 16,
            color: "#c4b5fd",
          }}
        >
          {`${siteConfig.role} · Next.js · Web Developer`}
        </div>

        {/* Location + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 40,
            fontSize: 30,
            color: "#9ca3af",
          }}
        >
          <span>📍 Ahmedabad, India</span>
          <span style={{ color: "#4b5563" }}>•</span>
          <span>vishalrohera.tech</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
