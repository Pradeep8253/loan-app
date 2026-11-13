"use client";
/**
 * EnquiryModal — the global enquiry surface. One Sheet primitive renders as a bottom
 * sheet on mobile and a centred modal on desktop. Shows a success state with the
 * reference number and a WhatsApp fallback link.
 */
import { useEffect, useState } from "react";
import { CheckCircle2, Copy, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Sheet from "@/components/ui/Sheet/Sheet";
import Button from "@/components/ui/Button/Button";
import EnquiryForm from "@/components/popup/EnquiryForm/EnquiryForm";
import { useShell } from "@/context/ShellContext";
import { useEnquiry } from "@/context/EnquiryContext";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/analytics";
import "./EnquiryModal.css";

export default function EnquiryModal() {
  const { sheet, closeSheet, toast } = useShell();
  const { prefill, setLastResult } = useEnquiry();
  const open = sheet?.name === "enquiry";
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (open) setResult(null);
  }, [open]);

  const meta = sheet?.meta || prefill || {};
  const serviceLabel = siteConfig.serviceLabels[meta.service] || "a loan";

  const onDone = (res) => {
    setResult(res);
    setLastResult?.(res);
    trackEvent("enquiry_success", { reference: res.reference, service: meta.service });
  };

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(result.reference);
      toast("Reference copied to clipboard.", "success");
    } catch {
      toast(`Your reference is ${result.reference}`, "info");
    }
  };

  return (
    <Sheet
      open={open}
      onClose={closeSheet}
      title={result ? "You're in the queue" : `Enquire about ${serviceLabel}`}
      description={result ? null : "Two minutes now. An advisor replies on WhatsApp within 30 minutes, business hours."}
      size="md"
    >
      {result ? (
        <div className="enq-success">
          <span className="enq-success__icon" aria-hidden="true"><CheckCircle2 size={34} /></span>
          <p className="enq-success__title">Enquiry received</p>
          <button type="button" className="enq-success__ref" onClick={copyRef}>
            {result.reference}
            <Copy aria-hidden="true" size={15} />
          </button>
          <p className="enq-success__body">
            Save this reference. WhatsApp should have opened with your details — if it didn&apos;t, use the button below.
          </p>
          <Button variant="whatsapp" size="lg" block href={result.whatsappUrl} external icon={<WhatsAppIcon size={20} />} rightIcon={false}>
            Open WhatsApp now
          </Button>
          <div className="enq-success__meta">
            <Clock aria-hidden="true" size={15} />
            {siteConfig.contact.responseTime}
          </div>
          <Button variant="outline" size="md" block href={`/track-application?ref=${result.reference}`} onClick={closeSheet}>
            Track this enquiry
          </Button>
        </div>
      ) : (
        <EnquiryForm prefill={meta} onDone={onDone} />
      )}
    </Sheet>
  );
}
