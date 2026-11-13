"use client";
/**
 * ElTool — income/obligation estimator producing an eligible amount, a FOIR gauge
 * and a shortlist prompt. Sticky mobile result bar included.
 */
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Slider from "@/components/ui/Slider/Slider";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { estimateEligibility } from "@/lib/emi";
import { formatINR } from "@/lib/format";
import { useEnquiry } from "@/context/EnquiryContext";
import "./ElTool.css";

export default function ElTool() {
  const [income, setIncome] = useState(65000);
  const [emi, setEmi] = useState(8000);
  const [service, setService] = useState("personal-loan");
  const [profile, setProfile] = useState("salaried");
  const { openEnquiry } = useEnquiry();

  const params = useMemo(
    () =>
      service === "home-loan"
        ? { foir: 0.55, rate: 8.6, years: 20 }
        : service === "business-loan"
          ? { foir: 0.45, rate: 16, years: 4 }
          : { foir: 0.5, rate: 13.5, years: 5 },
    [service]
  );
  const result = useMemo(() => estimateEligibility({ monthlyIncome: income, existingEmi: emi, ...params }), [income, emi, params]);
  const foir = Math.min(100, Math.round(((emi + Math.min(result.capacity, income * params.foir)) / income) * 100));
  const overLeveraged = emi > income * 0.45;

  return (
    <section className="el-tool section section--white" aria-labelledby="el-tool-title">
      <div className="container">
        <h2 className="sr-only" id="el-tool-title">Eligibility estimator</h2>
        <div className="el-tool__grid">
          <Reveal variant="up" className="el-tool__form">
            <div className="el-tool__segment" role="group" aria-label="Product">
              {[
                { key: "personal-loan", label: "Personal" },
                { key: "home-loan", label: "Home" },
                { key: "business-loan", label: "Business" },
              ].map((s) => (
                <button key={s.key} type="button" className={`el-tool__seg ${service === s.key ? "is-active" : ""}`} onClick={() => setService(s.key)} aria-pressed={service === s.key}>
                  {s.label}
                </button>
              ))}
            </div>
            <div className="el-tool__segment" role="group" aria-label="Profile">
              {[
                { key: "salaried", label: "Salaried" },
                { key: "self-employed", label: "Self-employed" },
              ].map((s) => (
                <button key={s.key} type="button" className={`el-tool__seg ${profile === s.key ? "is-active" : ""}`} onClick={() => setProfile(s.key)} aria-pressed={profile === s.key}>
                  {s.label}
                </button>
              ))}
            </div>
            <Slider id="el-income" label="Net monthly income" value={income} min={15000} max={500000} step={5000} onChange={(e) => setIncome(Number(e.target.value))} />
            <Slider id="el-emi" label="Existing monthly EMIs" value={emi} min={0} max={150000} step={1000} onChange={(e) => setEmi(Number(e.target.value))} />
            {profile === "self-employed" ? (
              <p className="el-tool__hint"><AlertTriangle aria-hidden="true" size={16} /> Self-employed partners often apply a 10–15% haircut to declared income.</p>
            ) : null}
            <Button variant="whatsapp" size="lg" block icon={<WhatsAppIcon size={20} />} rightIcon={false} onClick={() => openEnquiry({ service, source: "eligibility.tool", summary: `Eligibility estimate ${formatINR(result.principal)} · income ${formatINR(income)} · existing EMI ${formatINR(emi)}`, whatsappTemplate: "eligibility" })}>
              Confirm this with an advisor
            </Button>
            <p className="el-tool__note">This estimator applies a typical FOIR ceiling and repayment formula. Partner policy, bureau score and employer category change the final number.</p>
          </Reveal>

          <Reveal variant="right" delay={80} className="el-tool__result">
            <div className="el-tool__amount">
              <span>Estimated eligible amount</span>
              <strong>{formatINR(result.principal)}</strong>
              <p>{service === "home-loan" ? "20-year tenure · 8.6% assumed" : service === "business-loan" ? "4-year tenure · 16% assumed" : "5-year tenure · 13.5% assumed"}</p>
            </div>
            <div className="el-tool__gauge">
              <div className="el-tool__gauge-head">
                <span>FOIR after this loan</span>
                <strong>{foir}%</strong>
              </div>
              <div className="el-tool__gauge-track" aria-hidden="true">
                <span className={`el-tool__gauge-fill ${foir > 55 ? "is-danger" : foir > 48 ? "is-amber" : "is-success"}`} style={{ "--foir-w": `${Math.min(100, foir)}%` }} />
              </div>
              <p className="el-tool__gauge-note">
                {foir > 55 ? "Over-leveraged — most partners will decline. Reduce existing EMIs or add a co-applicant." : foir > 48 ? "Borderline — a strong bureau can still carry this." : "Comfortable — most partner policies accept this ratio."}
              </p>
            </div>
            <div className="el-tool__next">
              <p className="el-tool__next-title">What would sharpen this estimate?</p>
              <ul>
                <li>Bureau score (CIBIL/Experian) — the single biggest lever.</li>
                <li>Employer category and salary-credit pattern.</li>
                <li>A co-applicant with independent income.</li>
              </ul>
              <button type="button" className="el-tool__next-cta" onClick={() => openEnquiry({ service, source: "eligibility.next" })}>
                Add these details with an advisor <ArrowUpRight aria-hidden="true" size={16} />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="el-tool__sticky" role="status" aria-live="polite">
          <div>
            <span>Eligible up to</span>
            <strong>{formatINR(result.principal)}</strong>
          </div>
          <Button variant="primary" size="sm" onClick={() => openEnquiry({ service, source: "eligibility.sticky" })} rightIcon={false}>Confirm</Button>
        </div>
      </div>
    </section>
  );
}
