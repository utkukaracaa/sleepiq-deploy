# SleepIQ — Web Product Manager Case Study

**PART 4: 90-Day Growth Roadmap**
Experiments · Key Metrics · Short-Term vs Long-Term Balance

---

**Utku Karaca** — Product Manager
kitUP Web PM Case Study | March 2026

---

## General Approach

This roadmap is divided into three phases. Each phase has its own north star metric, experiment set, and gate criteria for advancing to the next phase. Sequence matters — what you test at the top of the funnel directly impacts how healthy the bottom of the funnel looks.

| Phase | Timeline   | Focus                          | North Star Metric            |
|-------|------------|--------------------------------|------------------------------|
| 1     | Day 0–30   | Prove unit economics           | Revenue per Quiz Start       |
| 2     | Day 30–60  | Scale the proven funnel         | Activation Rate / ROAS       |
| 3     | Day 60–90  | Protect and deepen earned revenue | Net Revenue per Cohort     |

---

## Phase 1 — Day 0–30: Prove Unit Economics

**North Star:** Revenue per Quiz Start
*How much revenue does an average user generate when they start the quiz?*

### Success Criteria

| Target                   | Threshold                          |
|--------------------------|------------------------------------|
| Quiz completion rate     | ≥ 65%                              |
| Email capture rate       | ≥ 70% (of quiz completers)         |
| Paywall conversion rate  | ≥ 12%                              |
| Revenue per quiz start   | Establish baseline, weekly trend positive |

### Week 1–2: Top of Funnel Tests

Goal: Collect maximum signal at the highest-traffic points.

**Test 1 — Landing Headline**

| Variant   | Copy                                          |
|-----------|-----------------------------------------------|
| Control   | Pain-led → "Uyku probleminizi 30 günde çözün" |
| Variant   | Curiosity-led → "Beyniniz gece neden kapanmıyor?" |

- **Metric:** CTA click-through rate
- **Decision rule:** p < 0.05, min 500 users/variant

**Test 2 — Quiz Length**

| Variant | Questions |
|---------|-----------|
| A       | 20        |
| B       | 30 (control) |
| C       | 40        |

- **Primary:** Completion rate
- **Secondary:** Conversion rate (completion → paywall)
- **Note:** Shorter quiz may complete better but lower profile quality could hurt conversion — measure both

**Test 3 — Phase Transition Quote**

| Variant   | Content                          |
|-----------|----------------------------------|
| Control   | Anonymous / generic motivation   |
| Variant A | Dr. Andrew Huberman quote        |
| Variant B | Matthew Walker quote             |

- **Metric:** Phase transition CTR (advance to next section)
- **Hypothesis:** Authority social proof reduces quiz abandon rate

### Week 2–3: Conversion Layer Tests

Goal: Optimize the path from quiz completion to payment.

**Test 4 — Email Capture**

| Variant   | Fields          |
|-----------|-----------------|
| Control   | Email only       |
| Variant   | Name + email     |

- **Metric:** Email submit rate
- **Trade-off:** Variant may get fewer submits but enables higher personalization — test downstream impact

**Test 5 — Profile Result Copy**

| Variant   | Tone                                                    |
|-----------|---------------------------------------------------------|
| Control   | Clinical → "Kronik uyku latansı tespit edildi"          |
| Variant   | Empathetic → "Beynin kapanmak istiyor ama bir şey engel oluyor" |

- **Metric:** Profile CTA click rate
- **Note:** Users who feel personally identified at this screen have higher payment motivation

**Test 6 — CTA Copy**

| Variant   | Text            |
|-----------|-----------------|
| Control   | "Start My Plan" |
| Variant   | "See My Plan"   |

- **Metric:** Checkout initiated rate
- **Hypothesis:** "See" creates less commitment friction, lowers click barrier

### Week 3–4: Paywall Tests

Goal: Lock in the final variables that influence the payment decision.

**Test 7 — Paywall Default Plan**

| Variant   | Pre-selected plan |
|-----------|-------------------|
| Control   | 3-month           |
| Variant   | 6-month           |

- **Primary:** Plan selection distribution + revenue per checkout
- **Guardrail:** Conversion rate must not drop (more expensive = more abandonment risk)

**Test 8 — Paywall Countdown**

| Variant   | Display                                    |
|-----------|--------------------------------------------|
| Control   | No countdown                               |
| Variant   | "Bu teklif 15 dakika geçerli" countdown visible |

- **Metric:** Checkout initiated rate
- **Risk:** Fake urgency erodes user trust — measure NPS alongside CVR

**Test 9 — Exit Intent Offer**

| Variant   | Offer                    |
|-----------|--------------------------|
| Control   | 60% discount             |
| Variant   | 7-day free trial         |

- **Metric:** Exit intent accepted rate
- **Note:** Track trial → paid conversion separately. Accepting trial but churning is worse than no trial.

### Phase 1 Gate Criteria

- ✅ Revenue per quiz start → positive weekly trend
- ✅ At least 5 of 9 A/B tests have statistically significant winner
- ✅ Paywall CVR ≥ 12%
- ✅ CAC calculable (if paid tests ran)

---

## Phase 2 — Day 30–60: Controlled Scale

**North Star:** ROAS (if paid traffic) or Activation Rate (if organic-focused)
*Deploy winning funnel variants to more users.*

### Success Criteria

| Target                | Threshold                                  |
|-----------------------|--------------------------------------------|
| App activation rate   | ≥ 55% (registration → first task completed) |
| D7 retention          | ≥ 40%                                       |
| D30 retention         | ≥ 25%                                       |
| CAC vs LTV ratio      | LTV ≥ 3x CAC                                |

### Week 5–6: Activation Test

**Test 10 — App Onboarding Login**

| Variant                       | Pattern     | Description                              |
|-------------------------------|-------------|------------------------------------------|
| Control (kitUP pattern)       | Login Step 3 | User sees content first, then registers  |
| Variant (myChar pattern)      | Login Step 1 | Immediate registration                   |

- **Primary:** App activation rate
- **Hypothesis:** Requiring registration before showing value creates friction, but Step 3 login means higher-intent users

### Week 6–8: Winning Combinations

Combine Phase 1 winners and run multivariate test.

```
Combined test example:
  Landing:  Winning headline
  Quiz:     Winning length
  Profile:  Winning copy tone
  Paywall:  Winning default plan + CTA

Metric:   End-to-end conversion rate (landing → payment)
Purpose:  Validate that individual winners work together
          (sometimes variants neutralize each other)
```

### Scale Operations

Phase 2's real work is operational — feed the winning funnel with more traffic and verify the system scales without breaking.

**Checklist:**
- [ ] Server latency stable under increased traffic?
- [ ] Email sequences routing to correct segments?
- [ ] Technical drop-off in app activation funnel?
- [ ] Support ticket volume proportional? (disproportionate = product signal)

### Phase 2 Gate Criteria

- ✅ D30 retention ≥ 25%
- ✅ App activation rate ≥ 55%
- ✅ LTV/CAC ≥ 3x (or sustainable organic growth rate)
- ✅ Support ticket rate < 5% (per user)

---

## Phase 3 — Day 60–90: LTV Expansion & Refund Reduction

**North Star:** Net Revenue per Cohort
*Gross revenue of a user cohort minus refund losses.*

### Why This Phase?

Acquisition is optimized, activation is measured. Now the "leaky bucket" problem emerges — gaining new users while losing old ones kills growth. This phase is about protecting earned revenue.

### Initiative 1: Refund Early Warning System

Detect at-risk users before they request a refund.

**Risk Signals (first 7 days):**

| Signal                  | Threshold        | Meaning                |
|-------------------------|------------------|------------------------|
| app_open count          | < 3              | Low engagement         |
| task_completed count    | = 0              | Activation failed      |
| session_duration        | < 2 min          | Content not consumed   |

**Intervention Sequence:**
- Day 5 → Push: "Programın neden çalışmıyor?" (1-question survey)
- Day 7 → Based on answer: suggest new starting point
- Day 10 → Still inactive → trigger re-onboarding flow

### Initiative 2: Refund-Intent Save Flow

Intervene before direct cancellation when refund is requested.

**Step 1 — Single question:**
"Programdan neden ayrılmak istiyorsun?"

| Answer                    | Response                                              |
|---------------------------|-------------------------------------------------------|
| "Çok zor"                 | Reduce program intensity + offer lighter version for 1 week |
| "Çok pahalı"              | Downgrade or pause option ("1 ay beklet, ücret alınmasın") |
| "İşe yaramıyor"           | Show progress reminder + offer different protocol     |
| "Yeterince kullanamadım"  | 5-Day Restart re-onboarding flow                      |

**Step 2** — If user still wants to cancel → normal cancellation flow. No dark patterns.

### Initiative 3: 5-Day Restart (Re-onboarding)

Re-activate inactive or refund-intent users with a fresh start.

| Day | Content                                                                |
|-----|------------------------------------------------------------------------|
| 1   | "Sıfırdan başlıyoruz" → Short profile re-quiz, assign new start point |
| 2   | First task (simplified version of previously uncompleted task)          |
| 3   | "2 gündür aktifsin" → progress visualization + social proof            |
| 4   | Set weekly goal (user chooses, keep it small)                          |
| 5   | "Bir haftanı planla" → calendar integration or reminder setup          |

### Phase 3 A/B Tests

**Test 11 — Refund Flow**

| Variant   | Experience                          |
|-----------|-------------------------------------|
| Control   | Standard cancellation (direct)      |
| Variant   | Structured save flow (decision tree) |

- **Primary:** Refund save rate
- **Secondary:** D90 retention (do saved users actually stay?)
- **Guardrail:** NPS must not drop (forcing retention = frustration)

**Test 12 — Re-onboarding Trigger**

| Variant   | Experience                              |
|-----------|-----------------------------------------|
| Control   | Standard push notification to inactive  |
| Variant   | 5-Day Restart flow invitation           |

- **Primary:** Re-activation rate (active after D7?)
- **Secondary:** D30 retention (did they truly return?)

**Test 13 — Churn Prevention Offer**

| Variant   | Offer                          |
|-----------|--------------------------------|
| Control   | No pause option                |
| Variant A | 1-month free pause             |
| Variant B | 1-month at 50% discount        |

- **Primary:** Churn rate
- **Secondary:** Revenue impact (pause = revenue deferral, discount = revenue loss)

### Phase 3 Success Criteria

- ✅ Refund save rate ≥ 25% (of users entering save flow)
- ✅ Net Revenue per Cohort → positive delta vs Phase 2
- ✅ D90 retention ≥ 20%
- ✅ NPS ≥ baseline (save operations don't create bad experiences)

---

## Full Roadmap: At a Glance

```
PHASE 1 — Day 0–30            PHASE 2 — Day 30–60           PHASE 3 — Day 60–90
North Star:                    North Star:                    North Star:
Revenue per Quiz Start         Activation Rate / ROAS         Net Revenue per Cohort
───────────────────────        ───────────────────────        ───────────────────────
Wk 1–2: Top of funnel         Wk 5–6: App onboarding         Wk 9–10: Early warning
  • Landing headline             login test                     system setup
  • Quiz length                Wk 6–8: Winning combo          Wk 10–11: Save flow
  • Phase transition             multivariate test              A/B test launch
    quote                      Scale operations:              Wk 11–12: Re-onboarding
Wk 2–3: Conversion              □ Server health                flow test
  • Email capture                □ Email segments             Wk 12: Cohort analysis,
  • Profile copy                 □ Activation funnel            report phase results
  • CTA copy                     □ Support tickets
Wk 3–4: Paywall
  • Default plan
  • Countdown
  • Exit intent offer
───────────────────────        ───────────────────────        ───────────────────────
Gate criteria:                 Gate criteria:                 Exit criteria:
CVR ≥ 12%                      D30 retention ≥ 25%            Refund save ≥ 25%
5/9 tests have winner          LTV/CAC ≥ 3x                   Net rev delta positive
```

---

## Key Constraints

**Concurrent test limit:** Maximum 1 active test per funnel layer. Landing + paywall can run in parallel (different layers), but paywall countdown + exit intent conflict — run sequentially.

**Minimum sample size:** Target minimum 500 users per variant before drawing conclusions. Low traffic = high false positive risk.

**Guardrail metrics:** Every test has a guardrail. If CVR increase causes NPS decrease, that is not a winner.

**Learning > Winning:** A losing test is still valuable. Every test that doesn't produce a winner still produces data for product decisions.

---

## Short-Term Conversion vs Long-Term Revenue/Retention Balance

| Tension                          | Short-Term Win                        | Long-Term Risk                         | How We Balance                                                    |
|----------------------------------|---------------------------------------|----------------------------------------|-------------------------------------------------------------------|
| Aggressive discount on paywall   | Higher initial CVR                    | Anchors users to low price; churn on renewal | Track LTV by discount cohort (UYKU_10 vs EK10). If exit-intent cohort churns 2x faster, reduce discount aggressiveness |
| Countdown timer urgency          | More checkout initiations             | Erodes trust if perceived as fake      | Measure NPS alongside CVR. If NPS drops > 5 points, remove countdown |
| Longer quiz = more data          | Better personalization + profile accuracy | Higher drop-off, fewer users reach paywall | A/B test 20 vs 30 vs 40 questions — optimize for completion × CVR product, not completion alone |
| Refund save flow                 | Fewer refunds = more revenue retained | Frustrated users leave bad reviews     | NPS guardrail. If save flow NPS < direct cancel NPS, simplify or remove |
| Free trial exit intent           | More users enter funnel               | Trial-to-paid conversion may be low    | Track trial → paid rate. If < 30%, switch back to discount offer |

**The key metric that owns this balance:** Net Revenue per Cohort at D90. This single number captures both conversion efficiency and retention health. A funnel that converts at 20% but retains at 10% is worse than one that converts at 12% but retains at 30%.

---

*SleepIQ Case Study — Part 4 of 4 | Utku Karaca | Web Product Manager Application | kitUP / ouromedia | March 2026*
