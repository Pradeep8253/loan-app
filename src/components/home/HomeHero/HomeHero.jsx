"use client";
/**
 * HomeHero — the homepage masthead: headline choreography, quick enquiry card,
 * trust markers and a framed hero image with floating solid shapes.
 */
import { useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Clock3, Star } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import Button from "@/components/ui/Button/Button";
import FormField from "@/components/ui/FormField/FormField";
import Select from "@/components/ui/Select/Select";
import { services } from "@/lib/data/services";
import { validateMobile } from "@/lib/validators";
import { submitLead } from "@/lib/leadService";
import { useShell } from "@/context/ShellContext";
import { haptic } from "@/lib/haptics";
import "./HomeHero.css";

const WORDS = ["Loan", "assistance,", "without", "the", "guesswork."];

export default function HomeHero() {
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("personal-loan");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const formRef = useRef(null);
  const { toast } = useShell();

  const onQuick = async (e) => {
    e.preventDefault();
    const err = validateMobile(mobile);
    if (err) {
      setError(err);
      const el = formRef.current?.querySelector("#hero-mobile");
      el?.focus();
      haptic(18);
      return;
    }
    setError("");
    setBusy(true);
    const res = await submitLead(
      {
        from_name: "Quick enquiry",
        mobile,
        service,
        source: "home.hero.quickform",
        summary: "Hero quick enquiry — callback requested",
        whatsappTemplate: "callback",
      },
      { redirect: true, spamKey: "mirvex_hero_quick" }
    );
    setBusy(false);
    if (res.ok) toast(`Reference ${res.reference} — WhatsApp should be open.`, "success");
  };

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="container home-hero__grid">
        <div className="home-hero__copy">
          <p className="eyebrow eyebrow--amber home-hero__eyebrow">Personal Loan · Overdraft · Home · Business</p>
          <h1 className="home-hero__title" id="home-hero-title">
            {WORDS.map((w, i) => (
              <span className="home-hero__word" key={w} style={{ "--i": i }}>
                {i === 0 ? <span className="marker">{w}</span> : w}
              </span>
            ))}
          </h1>
          <p className="home-hero__lede lede">
            One enquiry. An advisor who explains the trade-offs. Two or three partner options in writing — before you commit to anything.
          </p>

          <form className="home-hero__quick" onSubmit={onQuick} ref={formRef} noValidate>
            <div className="home-hero__quick-fields">
              <FormField
                id="hero-mobile"
                label="Mobile number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                enterKeyHint="done"
                maxLength={10}
                prefix="+91"
                placeholder="98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                error={error}
                required
              />
              <Select
                id="hero-service"
                label="I need"
                value={service}
                onChange={(e) => setService(e.target.value)}
                options={services.map((s) => ({ value: s.key, label: s.name }))}
                required
              />
            </div>
            <Button type="submit" size="lg" block loading={busy} icon={<WhatsAppIcon size={20} />} rightIcon={false}>
              {busy ? "Connecting you…" : "Request a callback"}
            </Button>
          </form>

          <ul className="home-hero__trust">
            <li><ShieldCheck aria-hidden="true" size={17} /> No credit-score impact</li>
            <li><Clock3 aria-hidden="true" size={17} /> Reply in ~30 min</li>
            <li><Star aria-hidden="true" size={17} /> 4.7/5 advisor rating</li>
          </ul>
        </div>

        <div className="home-hero__media">
          <SmartImage slot="hero.home" ratio="4 / 3" priority frame sizes="(max-width: 899px) 92vw, 560px" />
          <div className="home-hero__float home-hero__float--rate" aria-hidden="true">
            <span>From</span>
            <strong>10.99% p.a.</strong>
          </div>
          <div className="home-hero__float home-hero__float--time" aria-hidden="true">
            <span>First reply</span>
            <strong>~30 min</strong>
          </div>
          <span className="home-hero__ring" aria-hidden="true" />
          <span className="home-hero__dot" aria-hidden="true" />
        </div>
      </div>

      <div className="container">
        <a href="#services" className="home-hero__scroll">
          Scroll for services <ArrowRight aria-hidden="true" size={16} />
        </a>
      </div>
    </section>
  );
}
