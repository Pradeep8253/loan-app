"use client";
/**
 * EmiTool — the interactive calculator: three sliders, live EMI, totals, a donut
 * split and the first-year amortisation preview, plus a sticky mobile result bar.
 */
import { useMemo, useState } from "react";
import { TrendingDown } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Slider from "@/components/ui/Slider/Slider";
import DonutChart from "@/components/ui/DonutChart/DonutChart";
import BarChart from "@/components/ui/BarChart/BarChart";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { calculateEMI, totalInterest, totalPayment, amortisation } from "@/lib/emi";
import { formatINR } from "@/lib/format";
import { useEnquiry } from "@/context/EnquiryContext";
import "./EmiTool.css";

const INTEREST_COLOR = "#F5A800";
const PRINCIPAL_COLOR = "#1F7A8C";

export default function EmiTool() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(13);
  const [months, setMonths] = useState(36);
  const { openEnquiry } = useEnquiry();

  const { emi, interest, total, schedule } = useMemo(() => {
    const e = calculateEMI(amount, rate, months);
    return {
      emi: e,
      interest: totalInterest(e, months, amount),
      total: totalPayment(e, months),
      schedule: amortisation(amount, rate, months, 8),
    };
  }, [amount, rate, months]);

  const bars = schedule.map((row) => ({
    label: `M${row.month}`,
    value: row.principal + row.interest,
    display: formatINR(Math.round(row.interest)),
  }));

  return (
    <section className="emi-tool section section--sky" aria-labelledby="emi-tool-title">
      <div className="container">
        <h2 className="sr-only" id="emi-tool-title">EMI calculator</h2>
        <div className="emi-tool__grid">
          <Reveal variant="up" className="emi-tool__inputs">
            <div className="emi-tool__presets">
              {[
                { label: "Personal loan", amount: 500000, rate: 13, months: 36 },
                { label: "Home loan", amount: 4000000, rate: 8.5, months: 240 },
                { label: "Business loan", amount: 1500000, rate: 16, months: 48 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="emi-tool__preset"
                  onClick={() => {
                    setAmount(p.amount);
                    setRate(p.rate);
                    setMonths(p.months);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <Slider id="emi-amount" label="Loan amount" value={amount} min={50000} max={10000000} step={25000} onChange={(e) => setAmount(Number(e.target.value))} />
            <Slider id="emi-rate" label="Interest rate (p.a.)" value={rate} min={6} max={26} step={0.25} format="number" suffix="%" onChange={(e) => setRate(Number(e.target.value))} />
            <Slider id="emi-months" label="Tenure" value={months} min={6} max={360} step={6} format="number" suffix=" mo" onChange={(e) => setMonths(Number(e.target.value))} />
            <div className="emi-tool__summary">
              <div className="emi-tool__emi">
                <span>Monthly EMI</span>
                <strong>{formatINR(emi)}</strong>
              </div>
              <dl className="emi-tool__totals">
                <div><dt>Total interest</dt><dd>{formatINR(interest)}</dd></div>
                <div><dt>Total payable</dt><dd>{formatINR(total)}</dd></div>
              </dl>
            </div>
            <div className="emi-tool__actions">
              <Button variant="whatsapp" size="lg" block icon={<WhatsAppIcon size={20} />} rightIcon={false} onClick={() => openEnquiry({ service: "personal-loan", source: "emi.tool", loan_amount: amount, summary: `EMI calc: ${formatINR(amount)} @ ${rate}% for ${months} months → EMI ${formatINR(emi)}`, whatsappTemplate: "emi" })}>
                Ask about this EMI on WhatsApp
              </Button>
              <Button href="/eligibility" variant="outline" size="lg" block rightIcon={false}>Check if I qualify</Button>
            </div>
            <p className="emi-tool__note">EMI is computed with the reducing-balance formula. Actual EMI may differ slightly based on the lender&apos;s day-count convention.</p>
          </Reveal>

          <Reveal variant="right" delay={100} className="emi-tool__visual">
            <div className="emi-tool__donut-card">
              <p className="emi-tool__visual-title">Where your money goes</p>
              <DonutChart
                size={190}
                thickness={28}
                label="Principal versus interest split"
                centerTop={formatINR(total)}
                centerBottom="Total payable"
                segments={[
                  { label: `Principal ${formatINR(amount)}`, value: amount, color: PRINCIPAL_COLOR },
                  { label: `Interest ${formatINR(interest)}`, value: interest, color: INTEREST_COLOR },
                ]}
              />
              <p className="emi-tool__visual-note"><TrendingDown aria-hidden="true" size={15} /> Interest is {Math.round((interest / total) * 100)}% of your total outgo at these settings.</p>
            </div>
            <div className="emi-tool__bars-card">
              <p className="emi-tool__visual-title">First 8 months — interest included per EMI</p>
              <BarChart data={bars} label="Interest component of the first eight EMIs" />
            </div>
          </Reveal>
        </div>

        <div className="emi-tool__sticky" role="status" aria-live="polite">
          <div>
            <span>EMI</span>
            <strong>{formatINR(emi)}</strong>
          </div>
          <Button variant="primary" size="sm" onClick={() => openEnquiry({ service: "personal-loan", source: "emi.sticky", loan_amount: amount })} rightIcon={false}>
            Get options
          </Button>
        </div>
      </div>
    </section>
  );
}
