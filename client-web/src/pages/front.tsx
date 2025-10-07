import PageShell from "./page-shell";

export default function Front() {
  return (
    <PageShell title="Front Page">
      <section className="mb-8">
        <div className="bg-gradient-to-r from-gtu-primary to-gtu-lavender p-12 rounded-lg text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to GTU Ventures</h2>
          <p className="mb-4">Catalyzing student startups and innovation across Gujarat.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">Cohorts<br/><strong>24</strong></div>
            <div className="text-center">Startups<br/><strong>112</strong></div>
            <div className="text-center">Funding<br/><strong>₹ 12 Cr</strong></div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Highlights</h3>
        <p>Program highlights and rotating testimonial demo.</p>
      </section>
    </PageShell>
  );
}
