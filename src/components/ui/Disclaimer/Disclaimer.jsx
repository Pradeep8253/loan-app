/**
 * Disclaimer — compliance-safe footnote used at the end of content pages.
 */
import { Info } from "lucide-react";
import "./Disclaimer.css";

export default function Disclaimer({ children, compact = false }) {
  return (
    <div className={`disclaimer ${compact ? "disclaimer--compact" : ""}`}>
      <Info aria-hidden="true" size={18} className="disclaimer__icon" />
      <p>
        {children ||
          "Mirvex Loan Assist is a loan assistance platform, not a lender. Rates, fees and tenures are indicative and subject to the partner bank or NBFC's credit policy. Approval is not guaranteed."}
      </p>
    </div>
  );
}
