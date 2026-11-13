"use client";
/**
 * AbTeam — the three advisory leads as portrait cards with specialities.
 */
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import { useEnquiry } from "@/context/EnquiryContext";
import "./AbTeam.css";

const TEAM = [
  { name: "Aarav Mehta", role: "Senior Loan Advisor", slot: "team.advisor", focus: "Personal loans, balance transfers", years: "11 yrs", line: "“If the maths does not work, the sales pitch does not matter.”" },
  { name: "Neha Joshi", role: "Business Loan Specialist", slot: "team.support", focus: "MSME, working capital, overdrafts", years: "8 yrs", line: "“Most business files fail on banking discipline, not on ambition.”" },
  { name: "Ishaan Verma", role: "Home Loan Advisor", slot: "team.advisor", focus: "Home purchase, construction", years: "9 yrs", line: "“Check the project approval before you pay the token.”" },
];

export default function AbTeam() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="ab-team section section--sky" aria-labelledby="ab-team-title">
      <div className="container">
        <SectionHeading id="ab-team-title" eyebrow="The desk" title="People, not a queue." mark={["People"]} lede="Each advisor owns a product category. You talk to the specialist for your case, before and after the loan." />
        <div className="ab-team__grid">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} variant="up" delay={i * 70} className="ab-team__card">
              <SmartImage slot={t.slot} ratio="4 / 3" sizes="(max-width: 767px) 92vw, 380px" />
              <div className="ab-team__body">
                <h3 className="ab-team__name">{t.name}</h3>
                <p className="ab-team__role">{t.role} · {t.years}</p>
                <p className="ab-team__focus">{t.focus}</p>
                <p className="ab-team__line">{t.line}</p>
                <button type="button" className="ab-team__cta" onClick={() => openEnquiry({ source: `about.team.${i}` })}>
                  <WhatsAppIcon size={16} /> Ask for {t.name.split(" ")[0]}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
