"use client";
/**
 * SmartImage — next/image wrapper with a fixed aspect ratio, correct sizes,
 * a solid offset frame option and a solid-sky fallback on error.
 */
import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { getImage } from "@/lib/images";
import "./SmartImage.css";

export default function SmartImage({
  slot,
  src,
  alt,
  ratio = "16 / 10",
  sizes = "(max-width: 767px) 92vw, (max-width: 1200px) 50vw, 600px",
  priority = false,
  frame = false,
  frameTone = "amber",
  className = "",
  imgClassName = "",
  focal,
}) {
  const manifest = getImage(slot);
  const resolved = {
    src: src || manifest.src,
    alt: alt || manifest.alt,
    focal: focal || manifest.focal,
  };
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`smart-img ${frame ? `smart-img--frame smart-img--frame-${frameTone}` : ""} ${className}`.trim()}
      style={{ "--img-ratio": ratio }}
    >
      {!resolved.src || failed ? (
        <div className="smart-img__fallback" role="img" aria-label={resolved.alt}>
          <ImageOff aria-hidden="true" size={28} />
          <span>{alt ? alt.split(".")[0] : "Mirvex"}</span>
        </div>
      ) : (
        <Image
          src={resolved.src}
          alt={resolved.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`smart-img__img ${loaded ? "is-loaded" : ""} ${imgClassName}`.trim()}
          style={{ "--img-focal": resolved.focal }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
