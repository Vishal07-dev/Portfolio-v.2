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
          justifyContent: "space-between",
          padding: "80px",
          background: "#0b0d14",
          color: "#eef0f5",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#7a8296", fontFamily: "monospace" }}>
          <span style={{ color: "#f2a33a" }}>GET</span>
          <span style={{ marginLeft: 14 }}>/vishalrohera.tech</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#a3a9b8" }}>
            {`${siteConfig.name}, MEAN stack developer in Ahmedabad`}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 500,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              marginTop: 24,
              maxWidth: 960,
            }}
          >
            I build enterprise web apps with Angular and Node.js
          </div>
        </div>

        <div style={{ display: "flex", height: 2, background: "rgba(238,240,245,0.08)" }}>
          <div style={{ width: 280, height: 2, background: "#f2a33a" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
