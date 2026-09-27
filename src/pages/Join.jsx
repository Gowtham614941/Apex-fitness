import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const TIER_RATES = {
  "Core Access": 39,
  "Pro Athlete": 79,
  "Apex Elite": 139,
};

function Join() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTier = searchParams.get("tier") || "Pro Athlete";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState(initialTier);
  const [duration, setDuration] = useState(6);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const { monthlyBase, discountPercent, total, savings } = useMemo(() => {
    const base = TIER_RATES[plan] || 79;
    let disc = 0;
    if (duration === 6) disc = 0.10;
    if (duration === 12) disc = 0.20;

    const rawTotal = base * duration;
    const finalTotal = Math.round(rawTotal * (1 - disc));
    return {
      monthlyBase: base,
      discountPercent: disc * 100,
      total: finalTotal,
      savings: rawTotal - finalTotal
    };
  }, [plan, duration]);

  async function handleRegister(e) {
    e.preventDefault();
    setSubmitting(true);
    setNotification(null);

    const { error } = await supabase.from("memberships").insert([
      {
        full_name: fullName,
        email: email,
        phone: phone,
        plan: plan,
        duration_months: Number(duration),
        total_paid: total,
      },
    ]);

    setSubmitting(false);

    if (error) {
      setNotification({ type: "error", message: error.message });
    } else {
      setNotification({
        type: "success",
        message: "Membership activated! Redirecting...",
      });
      setTimeout(() => navigate("/members"), 1500);
    }
  }

  return (
    <main className="page-wide-container">
      <div className="section-title-wrap">
        <span className="section-kicker">MEMBERSHIP REGISTRATION</span>
        <h2>JOIN APEX FITNESS</h2>
        <p>Complete your registration to secure locked-in pricing.</p>
      </div>

      <div className="checkout-two-col">
        {/* Left Col: Form */}
        <div className="checkout-card form-side">
          {notification && (
            <div className={`status-msg ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                required
                placeholder="e.g. Marcus Aurelius"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="planSelect">Tier Package</label>
                <select
                  id="planSelect"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <option value="Core Access">Core Access ($39/mo)</option>
                  <option value="Pro Athlete">Pro Athlete ($79/mo)</option>
                  <option value="Apex Elite">Apex Elite ($139/mo)</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="durationSelect">Membership Term</label>
                <select
                  id="durationSelect"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                >
                  <option value={1}>1 Month (Standard)</option>
                  <option value={6}>6 Months (Save 10%)</option>
                  <option value={12}>12 Months (Save 20%)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-action-btn" disabled={submitting}>
              {submitting ? "Processing..." : `Pay $${total} & Activate`}
            </button>
          </form>
        </div>

        {/* Right Col: Order Breakdown */}
        <aside className="checkout-card summary-side">
          <h3>Order Breakdown</h3>
          
          <div className="summary-line">
            <span>Base Tier</span>
            <strong>{plan}</strong>
          </div>
          <div className="summary-line">
            <span>Rate</span>
            <span>${monthlyBase}/mo</span>
          </div>
          <div className="summary-line">
            <span>Commitment</span>
            <span>{duration} Month(s)</span>
          </div>

          {discountPercent > 0 && (
            <div className="summary-line discount-tag">
              <span>Term Savings ({discountPercent}%)</span>
              <span>-${savings}</span>
            </div>
          )}

          <div className="summary-separator" />

          <div className="summary-total-line">
            <span>Due Today</span>
            <span className="big-price">${total}</span>
          </div>

          <div className="guarantee-badge">
            <span className="shield">🛡️</span>
            <div>
              <strong>Apex Guarantee</strong>
              <p>14-day hassle-free full refund policy on all membership tiers.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Join;