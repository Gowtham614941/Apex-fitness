import { useNavigate } from "react-router-dom";

const PLANS = [
  {
    id: "core",
    name: "Core Access",
    price: 39,
    tagline: "Essential strength and cardio conditioning",
    popular: false,
    perks: [
      "Access to complete gym floor & free weights",
      "Apex mobile app with workout tracking",
      "Locker room & private shower access",
      "Complimentary baseline fitness scan"
    ]
  },
  {
    id: "pro",
    name: "Pro Athlete",
    price: 79,
    tagline: "For serious lifters and group workout enthusiasts",
    popular: true,
    perks: [
      "All Core Access perks included",
      "Unlimited HIIT, Yoga, and Strength classes",
      "Full sauna, cold plunge & recovery bay access",
      "2 monthly complimentary guest passes",
      "10% discount at the fuel & smoothie bar"
    ]
  },
  {
    id: "elite",
    name: "Apex Elite",
    price: 139,
    tagline: "The complete white-glove athletic experience",
    popular: false,
    perks: [
      "All Pro Athlete perks included",
      "2 monthly 1-on-1 personal training sessions",
      "Quarterly 3D body composition & scan analysis",
      "Custom monthly nutrition & macro programming",
      "24/7 keyless VIP gym entry"
    ]
  }
];

function Plans() {
  const navigate = useNavigate();

  return (
    <main className="page-wide-container">
      <div className="section-title-wrap">
        <span className="section-kicker">MEMBERSHIP TIERS</span>
        <h2>SELECT YOUR APEX PLAN</h2>
        <p>Transparent pricing. No contract lock-ins or cancellation surprises.</p>
      </div>

      <div className="plans-grid-layout">
        {PLANS.map((plan) => (
          <div key={plan.id} className={`plan-card-item ${plan.popular ? "featured" : ""}`}>
            {plan.popular && <span className="featured-badge">MOST POPULAR</span>}
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-tagline">{plan.tagline}</p>
            
            <div className="pricing-box">
              <span className="currency">$</span>
              <span className="amount">{plan.price}</span>
              <span className="frequency">/ month</span>
            </div>

            <button
              onClick={() => navigate(`/join?tier=${encodeURIComponent(plan.name)}`)}
              className={`plan-btn ${plan.popular ? "btn-accent" : "btn-outline"}`}
            >
              Choose {plan.name}
            </button>

            <ul className="perks-list">
              {plan.perks.map((perk, i) => (
                <li key={i}>
                  <span className="check-bullet">✓</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Plans;