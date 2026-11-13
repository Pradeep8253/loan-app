"use client";
/**
 * OfflineBadge — slim banner when the connection drops; flushes the outbox on return.
 */
import { WifiOff } from "lucide-react";
import useOnline from "@/hooks/useOnline";
import "./OfflineBadge.css";

export default function OfflineBadge() {
  const online = useOnline();
  if (online) return null;
  return (
    <div className="offline-badge" role="status">
      <WifiOff aria-hidden="true" size={16} />
      You are offline — enquiries are queued and will send when you reconnect.
    </div>
  );
}
