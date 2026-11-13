"use client";
/**
 * HomeCompare — the desktop-friendly product comparison table that becomes stacked
 * cards on mobile, with an enquiry CTA row per product.
 */
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { services } from "@/lib/data/services";
import { useEnquiry } from "@/context/EnquiryContext";
import "./HomeCompare.css";

export default function HomeCompare() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="home-compare section section--white" aria-labelledby="home-compare-title">
      <div className="container">
        <SectionHeading
          id="home-compare-title"
          eyebrow="Compare at a glance"
          title="Indicative terms, side by side."
          mark={["side by side"]}
          lede="Figures below are indicative ranges seen across our partner panel. Your actual terms are set by the lender after verification."
        />
        <Reveal variant="up" className="home-compare__wrap">
          <table className="home-compare__table">
            <caption className="sr-only">Loan products, indicative amounts, tenure, rates and turnaround</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Indicative amount</th>
                <th scope="col">Tenure</th>
                <th scope="col">Rate from</th>
                <th scope="col">First response</th>
                <th scope="col"><span className="sr-only">Enquire</span></th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.key}>
                  <th scope="row" data-label="Product">
                    <span className="home-compare__name">{s.name}</span>
                    <span className="home-compare__tag">{s.tag}</span>
                  </th>
                  <td data-label="Amount">{s.amount}</td>
                  <td data-label="Tenure">{s.tenure}</td>
                  <td data-label="Rate from"><strong>{s.rate}</strong></td>
                  <td data-label="First response">{s.turnaround}</td>
                  <td data-label="Enquire">
                    <button
                      type="button"
                      className="home-compare__cta"
                      onClick={() => openEnquiry({ service: s.key, source: "home.compare" })}
                    >
                      Enquire <ArrowRight aria-hidden="true" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="home-compare__note">
          Rates are annualised percentages and vary with profile, employer category, city and lender policy. Processing fees typically range 0.5–3% of the sanctioned amount. Nothing here is an offer of credit.
        </p>
      </div>
    </section>
  );
}
