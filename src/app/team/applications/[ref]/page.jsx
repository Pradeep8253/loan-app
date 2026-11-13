import TeamShell from "@/components/team/TeamShell/TeamShell";

export const metadata = {
  title: "Application",
  description: "Single application view inside the Mirvex demo dashboard.",
};

export default function TeamApplicationPage({ params }) {
  const ref = decodeURIComponent(params.ref || "").toUpperCase();
  return <TeamShell initialRef={ref} />;
}
