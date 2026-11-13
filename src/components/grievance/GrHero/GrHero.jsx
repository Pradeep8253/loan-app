/**
 * GrHero — grievance masthead with the escalation ladder as a compact stepper.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import "./GrHero.css";

export default function GrHero() {
  return (
    <PageHero
      eyebrow="Grievance redressal"
      title="If something went wrong, this is the route."
      lede="Every complaint gets a ticket number within one working day and a named person responsible. The ladder below is the full path, including the regulator if we fail to resolve it."
      tone="sky"
      facts={[
        { label: "Acknowledge", value: "1 working day" },
        { label: "Resolve", value: "7 working days" },
        { label: "Escalate", value: "Level 2 at day 8" },
        { label: "Regulator", value: "RBI Ombudsman" },
      ]}
    />
  );
}
