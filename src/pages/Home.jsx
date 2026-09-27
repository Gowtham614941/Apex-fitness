import { Link } from "react-router-dom";

function Home() {
  const stats = [
    { label: "Elite Trainers", value: "25+" },
    { label: "Classes Per Week", value: "120+" },
    { label: "Square Footage", value: "35,000" },
    { label: "Active Members", value: "2,400+" }
  ];

  return (
    <main className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <span className="hero-kicker">NEXT-GENERATION TRAINING</span>
        <h1 className="hero-title">DISCIPLINE OVER EXCUSES.</h1>
        <p className="hero-subtitle">
          Precision strength training, metabolic conditioning, and complete recovery services designed for uncompromising results.
        </p>
        <div className="hero-buttons">
          <Link to="/join" className="btn btn-primary">Start Membership</Link>
          <Link to="/plans" className="btn btn-secondary">Explore Tiers</Link>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">THE APEX ADVANTAGE</span>
          <h2>Everything You Need for an Elite Routine</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏋️</div>
            <h3>Precision Equipment</h3>
            <p>Custom racks, Olympic lifting platforms, and biometrically engineered resistance equipment.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧘</div>
            <h3>Therapy & Recovery</h3>
            <p>Finnish dry saunas, cryotherapy tubs, and dedicated contrast-therapy recovery bays.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Biometric Tracking</h3>
            <p>Body composition analysis, performance benchmarking, and real-time app integration.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;