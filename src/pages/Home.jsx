import Button from "../components/Button";
import Card from "../components/Card";
import CardGrid from "../components/CardGrid";
import SEO from "../components/SEO";
import seoConfig from "../config/Seo";
import config from "../config";
import materials from "../config/materials";
import MaterialStepper from "../components/MaterialStepper";
import "../css/Home.css";

export default function Home() {
  const { site } = config;

  return (
    <main className="home" id="about">
      <SEO
        title={`Home — ${site.name}`}
        description="Nashville-based 3D printing and CAD/design services for prototyping and custom parts."
        keywords={seoConfig.keywords}
      />

      <h1>Welcome</h1>

      <p>
        We are Nashville 3D Printing, previously known as Valley3DPrints in
        California. We’ve been printing since 2020 and provide 3D printing
        services and CAD/design for prototyping and custom parts.
      </p>

      <p>
        We’ve worked with 100+ companies and 1,000+ customers through local
        markets, retail partnerships, and Etsy.
      </p>

      <CardGrid>
        <Card title="3D Printing + CAD/Design">
          <p>
            We provide FDM 3D printing and CAD/design support for prototypes,
            functional parts, and custom designs—built for fit, finish, and
            real-world use.
          </p>
          <Button href="/contact">Get a Quote</Button>
        </Card>

        <Card title="Fast Defaults, Flexible Options">
          <p>
            Default filament colors: <strong>Black</strong> and{" "}
            <strong>White</strong> for the fastest turnaround. Other colors and
            finishes may be available upon request.
          </p>
        </Card>
      </CardGrid>

      <MaterialStepper materials={materials} />
    </main>
  );
}
