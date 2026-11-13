/**
 * Team layout — deliberately bare. No marketing chrome, no bottom nav, no enquiry
 * modal: the dashboard is an internal surface and must not compete with CTAs.
 */
import "./team.css";

export const metadata = {
  title: { default: "Team dashboard", template: "%s · Mirvex team" },
  description: "Internal demonstration dashboard for application pipeline, statuses and notes.",
  robots: { index: false, follow: false },
};

export default function TeamLayout({ children }) {
  return <main id="main" className="team-shell">{children}</main>;
}
