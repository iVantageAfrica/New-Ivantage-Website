import { Link } from "react-router-dom";
import logo from "@/assets/brand/ivantage-logo.png";

export function BrandLogo({ width = 124 }: { width?: number }) {
  return (
    <span className="brand-logo">
      <img
        src={logo}
        alt=""
        width={width}
        height={Math.round((width * 48) / 200)}
        decoding="async"
      />
    </span>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="iVantage home">
      <BrandLogo />
      {!compact && <span className="brand-tag">Digital product engineering</span>}
    </Link>
  );
}
