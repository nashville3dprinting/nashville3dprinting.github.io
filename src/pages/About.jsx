import "../css/Home.css"; // uses your general text styles
import ProfileCard from "../components/ProfileCard";
import PeopleGrid from "../components/PeopleGrid";
import SEO from "../components/SEO";
import seoConfig from "../config/Seo";
import config from "../config";

export default function About() {
  const { about } = config;

  return (
    <div className="home">
      <SEO
        title="About — MySite"
        description="About — Description"
        keywords={seoConfig.keywords} // or change for each page
      />
      {about.showFounder && about.founder && (
        <>
          <h2 style={{ marginTop: 24, marginBottom: 12 }}>Founder</h2>
          <ProfileCard person={about.founder} className="founder" />
          {/* Static page text lives here */}
          <p style={{ marginTop: 16, color: "var(--muted)" }}>
            Our story began with a simple idea: create something meaningful and
            lasting. The founder set the vision and continues to guide the
            direction of {config.site.name}.
          </p>
        </>
      )}

      {about.showTeam && Array.isArray(about.team) && about.team.length > 0 && (
        <>
          <h2 style={{ marginTop: 28, marginBottom: 12 }}>Our Team</h2>
          {/* Static intro for the team section */}
          <p style={{ marginBottom: 20, color: "var(--muted)" }}>
            Behind every project is a dedicated team. These are the people who
            keep things running smoothly and bring ideas to life.
          </p>
          <PeopleGrid>
            {about.team.map((m, i) => (
              <ProfileCard key={i} person={m} className="employee" />
            ))}
          </PeopleGrid>
        </>
      )}
    </div>
  );
}
