# SleepIQ — Web Product Manager Case Study

**PART 1: Web Quiz Funnel Setup**
Funnel Structure · Event Tracking · Data Flow

---

**Utku Karaca** — Product Manager
kitUP Web PM Case Study | March 2026

**App:** SleepIQ — AI-powered personalized sleep coaching
**Model:** Web2App quiz funnel → Stripe payment → App Store redirect
**Revenue Logic:** Stripe payments bypass App Store 30% commission
**Inspiration:** kitUP funnel teardown — 50 steps documented, 32 psychological hooks identified
**Live Prototype:** [sleepiq-deploy.vercel.app](https://sleepiq-deploy.vercel.app)
**Source Code:** [github.com/utkukaracaa/sleepiq-deploy](https://github.com/utkukaracaa/sleepiq-deploy)

---

## 0. Architecture Overview

Two separate environments share the same user identity layer via Firebase Auth. The web funnel handles acquisition, payment, and lead capture. The mobile app handles retention, daily engagement, and upsell.

|                | Web Funnel                              | Mobile App                  |
|----------------|------------------------------------------|-----------------------------|
| Platform       | Next.js 14 (browser)                     | React Native / Flutter      |
| Tracking       | GA4 (attribution) + Amplitude (behavioral) | Amplitude Mobile SDK      |
| Auth           | Firebase Auth — email OTP or Magic Link  | Firebase Auth (same user)   |
| Storage        | Firebase Firestore                       | Firebase Firestore          |
| Payment        | Stripe — 0% commission                   | App Store — 30% commission  |

> **Critical:** Every Stripe payment on the web funnel bypasses App Store fees entirely. This is the primary financial rationale for maintaining a dedicated web acquisition funnel.

### Traffic Entry Points

| Entry Type                              | Starting Point                    | Drop-off Risk                              |
|-----------------------------------------|------------------------------------|--------------------------------------------|
| Paid ad — Instagram / Meta / TikTok     | Q0 (age selection) — landing bypassed | Low at entry, concentrates in quiz      |
| Organic / website traffic               | Landing Page                       | Landing page is additional drop-off point  |

**Design rule:** First quiz question uses illustrated character cards (age group selection — same pattern as kitUP Step 2). Subsequent questions use large emoji + text card format. All screens include a static footer: Terms of Service | Privacy Policy.

---

## 1. Funnel Structure — ~34-Step Web2App Flow

Exact count varies 30–36 depending on traffic source, interstitial cards triggered, phase transitions, and whether exit intent activates.

### Quiz Architecture: 5 Phases

The quiz is organized into 5 progressive phases, each deepening the user's engagement and emotional investment:

| Phase | Emoji | Name                        | Purpose                           | Questions |
|-------|-------|-----------------------------|-----------------------------------|-----------|
| 0     | 📋    | Quick Question              | Age segmentation                  | Q0        |
| 1     | 😴    | Sleep Baseline              | Understand current sleep state    | Q1–Q5     |
| 2     | 🔍    | Problem Deepening           | Identify root causes              | Q6–Q12    |
| 3     | 🎯    | Identity & Aspirations      | Motivation and dream state        | Q13–Q17   |
| 4     | 💪    | Commitment                  | Readiness assessment              | Q18–Q21   |
| 5     | ⚠️    | Risk Assessment             | Loss aversion activation          | Q22–Q23   |

### Phase Transitions

Between phases, full-screen transition cards create narrative breaks and reinforce authority:

| Transition      | Content                                                                                   | Psych Mechanic          |
|-----------------|-------------------------------------------------------------------------------------------|-------------------------|
| Phase 1 → 2     | Van Dongen research: "6 hours sleep = cognitively equivalent to 10 days without sleep"    | Authority bias          |
| Phase 2 → 3     | Jeff Bezos testimonial + Aetna $300/year sleep bonus program (13,000+ employees)          | Social proof + identity |
| Phase 3 → 4     | Matthew Walker: learning capacity +40% with 8hr sleep                                     | Authority + aspiration  |
| Phase 4 → 5     | CDC: chronic sleep deprivation weakens immunity by 70%                                    | Fear + urgency          |

### Interstitial Info Cards (5 total)

Placed every 3–4 questions to break monotony, build trust, and deliver value mid-quiz:

| After Question | Emoji | Topic              | Content                                                                | Age-Personalized? |
|----------------|-------|---------------------|------------------------------------------------------------------------|-------------------|
| Q3 (wakeCount) | 🏨    | Sleep Science       | "First night in unfamiliar place: half your brain stays alert"         | ✅ Yes             |
| Q5 (quality)   | ⚡    | Hormonal Impact     | "Sleep deprivation makes men 10 years older hormonally"                | ✅ Yes             |
| Q9 (caffeine)  | ☕    | Caffeine Truth      | "Noon coffee: 25% still in your brain at midnight"                     | No                |
| Q12 (crash)    | 😤    | Emotional Control   | "Sleep deprivation makes amygdala 60% more reactive"                   | No                |
| Q14 (2 hours)  | 💡    | Dream Science       | "REM sleep randomly connects new info with old memories"               | No                |

> **Age personalization:** When the user selects their age in Q0, interstitial cards display a highlighted demographic insight. Example: *"📊 25–34 yaş grubunda: Bu yaş grubunda gece uyanmalarının başlıca nedeni: işlenmemiş iş stresi ve aktif zihin."* This creates a "they know me" moment that increases quiz completion.

### Full Step-by-Step Flow

| #  | Screen                        | User Action                  | Funnel Purpose                 | Psych Mechanic            |
|----|-------------------------------|------------------------------|--------------------------------|---------------------------|
| 1  | Landing Page (optional)       | Clicks "Start Free Analysis" | First conversion gate          | Pattern interrupt         |
| 2  | Q0 — Age Selection            | Selects age group            | Segmentation + personalization | Personalization illusion  |
| 3  | Q1 — Morning feeling          | Selects answer               | Diagnosis initiated            | Self-assessment bias      |
| 4  | Q2 — Sleep onset time         | Selects answer               | Chronotype detection           | Authority framing         |
| 5  | Q3 — Night waking             | Selects answer               | Fragmentation score            | Vulnerability targeting   |
| 6  | Interstitial — Sleep science  | Reads + continues            | Trust building                 | Authority bias            |
| 7  | Q4 — Read "Why We Sleep"?     | Selects answer               | Book engagement                | Authority framing         |
| 8  | Q5 — Overall sleep quality    | Selects answer               | Baseline severity              | Self-assessment bias      |
| 9  | Interstitial — Hormonal fact  | Reads + continues            | Pain deepening                 | Loss aversion             |
| 10 | **Phase Transition 1**        | Clicks Continue              | Commitment increase            | Van Dongen research       |
| 11 | Q6 — Impact frequency         | Selects answer               | Severity scoring               | Diagnosis illusion        |
| 12 | Q7 — What suffers most        | Selects answer               | Impact mapping                 | Loss framing              |
| 13 | Q8 — Read "Sleep Revolution"? | Selects answer               | Book engagement                | Authority framing         |
| 14 | Q9 — Caffeine dependency      | Selects answer               | Pattern recognition            | Pattern interrupt         |
| 15 | Interstitial — Caffeine fact  | Reads + continues            | Education + trust              | Authority bias            |
| 16 | Q10 — Running on empty        | Selects answer               | Vulnerability peak             | Barnum/Forer effect       |
| 17 | Q11 — Book interest           | Multi-select books           | Content preference             | Engagement deepening      |
| 18 | Q12 — Afternoon crash         | Selects answer               | Circadian pattern              | Diagnosis illusion        |
| 19 | Interstitial — Emotional fact | Reads + continues            | Pain amplification             | Fear activation           |
| 20 | **Phase Transition 2**        | Clicks Continue              | Elite identity framing         | Bezos + Aetna social proof|
| 21 | Q13 — Unlimited energy people | Selects answer               | Identity activation            | Aspirational identity     |
| 22 | Q14 — Extra 2 hours           | Selects answer               | Dream state anchor             | Hyperbolic discounting    |
| 23 | Interstitial — REM science    | Reads + continues            | Value delivery                 | Authority + curiosity     |
| 24 | Q15 — Sleep blocking potential| Selects answer               | Identity-belief bridge         | Commitment consistency    |
| 25 | Q16 — Whose advice            | Selects answer               | Authority preference           | Social proof              |
| 26 | Q17 — Ideal morning           | Selects answer               | Dream visualization            | Narrative bias            |
| 27 | **Phase Transition 3**        | Clicks "Almost there"        | Zeigarnik effect               | Walker learning quote     |
| 28 | Q18 — Tried before?           | Selects answer               | Competitor rejection           | Contrast principle        |
| 29 | Q19 — Why postpone            | Selects answer               | Intent profiling               | Commitment consistency    |
| 30 | Q20 — Commitment level        | Selects answer               | Intent qualification           | Micro-commitment          |
| 31 | Q21 — Would follow plan?      | Selects answer               | Pre-close                      | Commitment trap           |
| 32 | **Phase Transition 4**        | Clicks "See your results"    | Final urgency                  | CDC immunity fact         |
| 33 | Q22 — Real cost of bad sleep  | Selects answer               | Cost framing                   | Loss aversion             |
| 34 | Q23 — Biggest fear            | Selects answer               | Maximum pain activation        | Negative framing          |
| 35 | Email Capture                 | Enters name + email          | Lead acquisition               | Reciprocity               |
| 36 | AI Analysis Loading           | Waits ~3s, micro-commitments | Perceived value                | Dopamine delay            |
| 37 | Sleep Profile Result          | Reads profile, sees score    | Personalization reveal         | Barnum effect             |
| 38 | App Preview Mockup            | Scrolls through app preview  | Product understanding          | Product blindness fix     |
| 39 | Paywall (Primary)             | Selects plan, initiates pay  | Revenue event                  | Anchoring + scarcity      |
| 40 | Exit Intent Popup             | Tries to leave, popup fires  | Churn recovery                 | Loss aversion escalation  |
| 41 | Success / App Redirect        | Clicks App Store button      | Activation start               | IKEA effect               |

### Key UX Decisions (Post-Initial Design)

These decisions were made after the initial build, informed by kitUP teardown analysis, GPT-4o UX audit, and iterative testing:

| Decision | Problem | Solution | Rationale |
|----------|---------|----------|-----------|
| **Reduced info frequency** | Info card after every question broke quiz flow | Reduced from 9 to 5 interstitials (every 3–4 questions) | Matches kitUP's rhythm — content breaks should feel like rewards, not interruptions |
| **Age-based personalization** | Generic info cards felt impersonal | Interstitial cards show demographic-specific insights based on Q0 age answer | Creates "they know me" moment; increases perceived quiz accuracy |
| **Fixed CTA alignment** | "Continue" button jumped position between question/info screens | Flex column layout with `marginTop: auto` — CTA always at same vertical position | Eliminates micro-friction from eye movement; consistent motor memory |
| **App preview on paywall** | Users paid without seeing the product (kitUP's biggest weakness) | CSS-only iPhone mockup showing Day 1/21 plan, daily tasks, progress tracking | Fixes "Product Blindness" — the #1 conversion killer identified in kitUP teardown |
| **Score-based paywall copy** | Same headline regardless of severity | Dynamic headline based on sleep score: <40 = urgent, 40–65 = ready, 65+ = optimize | Higher-risk users see more aggressive messaging; lower-risk users see refinement framing |
| **Exit intent popup** | Users leaving paywall = lost forever | Modal on mouse-leave: "Your plan is about to be deleted" + extra 10% discount (EK10) | Recovers abandoning users; separate discount code enables LTV cohort comparison |
| **Honest social proof** | Fake user counts ("12,847 users") not credible for prototype | Changed to "SleepIQ Early Access — Be among the first users" + "Limited spots available" | Honest framing builds trust; "early access" creates exclusivity without fabrication |

### Sleep Scoring System

Quiz answers feed a scoring algorithm that determines the user's sleep profile:

**Scored Questions (7 total, max penalty = 30 points):**

| Question        | Score Range | Worst Answer Example              |
|-----------------|-------------|-----------------------------------|
| Morning Feel    | 0–5         | "Alarmı sürekli erteliyorum" = 5  |
| Sleep Latency   | 0–5         | "1 saatten fazla" = 5            |
| Wake Count      | 0–5         | "Çok sık" = 5                    |
| Sleep Quality   | 0–5         | "Çok kötü" = 5                   |
| Caffeine        | 0–3         | "4+" = 3                          |
| Empty Battery   | 0–4         | "Her gün" = 4                     |
| Afternoon Crash | 0–3         | "Her gün" = 3                     |

**Output:**
- **Sleep Score:** 0–100 (formula: `100 - penaltyRatio × 75`, min 20)
- **Sleep Age:** Real age + up to 18 years based on severity
- **Sleep Type:** One of 5 classifications:

| Type              | Emoji | Trigger Logic                                  |
|-------------------|-------|------------------------------------------------|
| Stress Sleeper    | ⚡    | High latency + high empty battery              |
| Fragmented        | 🌊    | High wake count (≥3)                           |
| Recovery Deprived | 🔋    | High morning penalty + high quality penalty    |
| Night Owl         | 🦉    | Moderate quality + moderate afternoon crash    |
| Balanced          | ⚖️    | Default — no severe triggers                   |

### Paywall Structure

**Pricing (Turkish Lira):**

| Plan        | Original | Discounted | Per Day   | Discount |
|-------------|----------|------------|-----------|----------|
| 1 Month     | ₺399     | ₺299       | ₺9,97/gün | 25%     |
| 3 Months ⭐ | ₺999     | ₺729       | ₺8,10/gün | 27%     |
| 6 Months    | ₺1.999   | ₺1.438     | ₺7,99/gün | 28%     |

- 3-month plan pre-selected as default ("EN POPÜLER" badge)
- Countdown timer: 14:54 → discount continues silently after expiry
- Discount code auto-applied: `UYKU_10_2026`
- Exit intent discount code: `EK10` (separate tracking for LTV cohort analysis)
- Payment trust logos: PayPal, Google Pay, Apple Pay, Visa, Mastercard (actual payment: Stripe credit card)

### Drop-Off Risk Map

| Point                 | Risk     | Description                                                                        |
|-----------------------|----------|------------------------------------------------------------------------------------|
| Landing → Q0          | High     | Organic traffic only — paid ads bypass landing                                     |
| Q6–Q12 (Phase 2)      | Medium   | Question fatigue begins; interstitial cards break this                              |
| Email Capture          | High     | Trust gap — privacy copy + "no spam" guarantee critical                             |
| Paywall → Payment      | Highest  | Price + product ambiguity + trust all collide — app preview mockup is mandatory     |
| Success → App Download | High     | "I don't know what I bought" syndrome — app screenshots + Magic Link mitigate this |

> **Critical lesson from kitUP teardown:** The user never sees the mobile app before paying. App Store screenshots, a "your plan will look like this" mockup, and a clear product promise MUST be on the paywall. **Product Blindness** is the single biggest conversion killer at this stage. *This was implemented in the prototype as a CSS-only iPhone mockup showing Day 1/21 plan, daily tasks, and progress tracking.*

---

## 2. Event Tracking Design

**Tools:** GA4 (web attribution, UTM tracking) + Amplitude (behavioral analytics, cohort analysis, shared user_id across web + mobile) + Firebase (auth + storage) + Klaviyo/Brevo (email automation triggers)

**Convention:** snake_case for all event names (e.g. `answer_selected`, `quiz_completed`). Required by Amplitude, GA4, and Mixpanel. Ensures consistent engineering dictionary and clean dashboard filters.

### Global Parameters (Every Event)

| Parameter          | Type                          | Description                                         |
|--------------------|-------------------------------|-----------------------------------------------------|
| session_id         | string                        | Unique session identifier                           |
| user_id            | string                        | Anonymous until email submit; then hashed email      |
| time_on_screen_ms  | number                        | Time spent on current screen before event fired      |
| device_type        | enum: mobile/tablet/desktop   | Device category                                     |
| utm_source         | string                        | e.g. instagram, tiktok, google                      |
| utm_medium         | string                        | e.g. reels, paid_social, cpc                        |
| utm_campaign       | string                        | e.g. sleep_awareness_q1_2026                        |
| utm_content        | string                        | e.g. tired_creative_v3 (creative variant)           |

UTM parameters captured once on `landing_viewed`, set as Amplitude User Properties — propagate automatically to all subsequent events including `payment_completed`.

### Landing Page Events

| Event              | Trigger              | Additional Parameters                                    |
|--------------------|----------------------|----------------------------------------------------------|
| landing_viewed     | Page loads           | page_type, referrer, landing_url, country                |
| cta_clicked        | CTA button clicked   | button_text, cta_variant                                 |

### Quiz Events

| Event                        | Trigger                    | Additional Parameters                                                    |
|------------------------------|----------------------------|--------------------------------------------------------------------------|
| quiz_started                 | First question shown       | entry_source: enum(landing/direct_ad/organic)                            |
| question_viewed              | Each question loads        | question_id, phase, phase_label                                          |
| answer_selected              | User selects answer        | question_id, answer_text, answer_index, is_first_selection               |
| answer_changed               | User changes prior answer  | question_id, previous_answer, new_answer, time_before_change_ms          |
| interstitial_viewed          | Info card shown            | card_id, has_age_insight, age_segment                                    |
| phase_transition_viewed      | Transition screen loads    | phase_number, quote_author                                               |
| quiz_completed               | Last question answered     | completion_time_ms, questions_answered, quiz_score, sleep_risk_level     |
| quiz_abandoned               | User leaves before finish  | last_question_id, last_phase, completion_pct                             |

**quiz_score:** Each scored answer 0–5 pts (0=good, 5=bad). Total score determines profile type and drives dynamic paywall copy. Risk buckets: 0–20 low, 21–40 medium, 41–55 high, 56+ critical.

### Email Capture → Paywall → App Redirect Events

| Event                    | Screen              | Key Parameters                                                               |
|--------------------------|----------------------|------------------------------------------------------------------------------|
| email_screen_viewed      | Email Capture        | quiz_score                                                                   |
| email_submitted          | Email Capture        | email_domain, is_valid_email                                                 |
| email_submit_failed      | Email Capture        | error_type: enum(invalid_format/empty/disposable)                            |
| analysis_loading_started | AI Loading           | —                                                                            |
| micro_commitment_answered| AI Loading           | question_text, answer                                                        |
| profile_result_viewed    | Profile Result       | profile_type, quiz_score, sleep_age, real_age                                |
| app_preview_viewed       | App Preview          | scroll_depth_pct, time_on_section_ms                                         |
| paywall_viewed           | Paywall              | profile_type, quiz_score, countdown_start_sec, score_headline_variant        |
| plan_selected            | Paywall              | plan_duration: enum(1m/3m/6m), plan_price, daily_price                       |
| checkout_initiated       | Paywall              | plan_duration, plan_price, discount_applied, discount_code                   |
| payment_completed        | Paywall              | plan_duration, revenue, currency: TRY, payment_method                        |
| payment_failed           | Paywall              | failure_reason, plan_duration                                                |
| countdown_expired        | Paywall              | user_converted_after_expiry                                                  |
| exit_intent_triggered    | Exit Intent          | trigger_type: enum(mouse_leave/back_button), time_on_paywall_ms              |
| exit_intent_accepted     | Exit Intent          | time_to_accept_ms, discount_code: EK10                                       |
| exit_intent_dismissed    | Exit Intent          | —                                                                            |
| app_store_redirect       | Success              | platform: enum(ios/android), redirect_source                                 |
| app_activated            | Mobile App           | days_since_purchase, activation_method: enum(magic_link/email_otp)           |

**Countdown rule:** When timer reaches 0, discount continues silently. Timer freezes at 0:00. `discount_applied` parameter stays `true`. Removing the discount after expiry consistently hurts conversion.

**Payment trust:** Apple Pay, Google Pay, Visa, Mastercard logos shown visually. Actual payment is credit card only via Stripe. Same pattern as kitUP — trust logos increase conversion without changing payment architecture.

### Error & Fallback Events

| Event                        | Trigger                        | Parameters                            |
|------------------------------|--------------------------------|---------------------------------------|
| api_fetch_failed             | Any API call fails             | endpoint, error_code, retry_count     |
| profile_calculation_fallback | Quiz score cannot calculate    | fallback_profile, reason              |
| payment_gateway_timeout      | Stripe does not respond        | timeout_ms                            |
| email_delivery_failed        | Activation email fails         | error_type, retry_scheduled           |

### Key Funnel Metrics

| Metric                    | Calculation                                              |
|---------------------------|----------------------------------------------------------|
| Landing → Quiz Start CTR  | quiz_started / landing_viewed                            |
| Quiz Completion Rate       | quiz_completed / quiz_started                            |
| Email Capture Rate         | email_submitted / profile_result_viewed                  |
| Paywall → Checkout CVR     | checkout_initiated / paywall_viewed                       |
| Payment Conversion Rate    | payment_completed / checkout_initiated                    |
| Exit Intent Save Rate      | exit_intent_accepted / exit_intent_triggered              |
| App Activation Rate        | app_activated / payment_completed                         |
| UTM → Revenue              | payment_completed grouped by utm_source / utm_campaign    |

---

## 3. Data Flow

Four layers: attribution (GA4), behavioral analytics (Amplitude), payment + auth (Stripe + Firebase), email automation (Klaviyo/Brevo). Web and mobile share `user_id` via Firebase Auth for a unified journey view.

### System Flow Diagram

```
TRAFFIC SOURCE (Meta / TikTok / Google / Organic)
│
├── UTM params ──────────────────────► Session Storage (web)
│
│   USER (Browser — Next.js Web Funnel)
│
├──[Page Load]───────────────────────► GA4 + Amplitude
│                                      (UTM attribution + session start)
│
├──[Quiz Answers]────────────────────► GA4 + Amplitude
│                                      (quiz_score calculated client-side,
│                                       written to session storage)
│
├──[Email Submit]────────────────────► Firebase Auth (user created)
│                                      Firebase Firestore (email, quiz_score, profile_type)
│                                      GA4 + Amplitude (anonymous_id → user_id)
│                                      Klaviyo/Brevo (lead list + quiz_completed sequence)
│
├──[Payment — Stripe]────────────────► Stripe Checkout
│   │
│   ├──[Success Webhook]─────────────► Firebase Firestore (subscription: active)
│   │                                  Amplitude: payment_completed
│   │                                  Klaviyo: purchase_success sequence
│   │                                    Email 1 (instant): Magic Link + App Store links
│   │                                    Email 2 (+1hr): "Did you download the app?"
│   │                                    Email 3 (+24hr): "How was your first night?"
│   │
│   └──[Failed Webhook]──────────────► Amplitude: payment_failed
│                                      Klaviyo: abandoned_checkout sequence
│
└──[App Store Redirect]──────────────► Deep link / Universal Link
                                       App opens → Firebase Auth token
                                       Amplitude Mobile SDK: app_activated
```

### Data Layers

| Layer                | Tool                        | What It Holds                                              |
|----------------------|-----------------------------|------------------------------------------------------------|
| Attribution          | GA4                         | UTM, source, medium, campaign, landing URL                 |
| Behavioral Analytics | Amplitude (web + mobile)    | All user events, funnel analysis, cohort segmentation      |
| Auth & Storage       | Firebase Auth + Firestore   | User record, subscription status, quiz data, profile type  |
| Email Automation     | Klaviyo / Brevo             | Lead, purchase, abandonment sequences                      |
| Payment              | Stripe                      | Subscription, billing, webhook events                      |
| Dashboard            | Google Looker Studio        | Consolidated view: GA4 + Amplitude + Stripe data unified   |

### Critical Data Connections

**1. Quiz Profile → Dynamic Paywall Copy**
Quiz answers scored client-side. `quiz_score` written to session storage. Paywall reads this value and renders score-based headline:
- Score < 40: "⚠️ Uyku sağlığın acil müdahale gerektiriyor"
- Score 40–65: "📋 Planın hazır — iyileşme başlayabilir"
- Score 65+: "✨ İyi temeldesin — şimdi mükemmelleştir"

**2. Email → App Activation Chain**
Email submit → Firebase user created → Stripe payment → webhook → subscription activated in Firestore → activation email sent (Magic Link + App Store links). If any step fails, user pays but cannot access app. This exact failure pattern was observed in kitUP funnel analysis. Dedicated monitoring + fallback manual review queue required.

**3. Exit Intent Discount Tracking**
First paywall: `UYKU_10_2026`. Exit intent: `EK10`. Both logged as separate Amplitude parameters — enables direct cohort comparison of conversion rate, LTV, and churn by offer type.

**4. UTM → Revenue Attribution**
UTM parameters set as Amplitude User Properties on `landing_viewed`. Carry through to `payment_completed` — direct visibility into which campaign and creative generates what revenue.

---

## 4. App Activation Flow (Post-Purchase)

| Path   | Flow                                                                                   |
|--------|----------------------------------------------------------------------------------------|
| Path A | User clicks Magic Link in email → Universal Link → App opens → Firebase token → auto-login. Zero friction. |
| Path B | User downloads independently → 3-page onboarding → "Already a member?" → Firebase OTP → Premium activates. |

**Rate/Review timing:** NOT on first open. Show in-app rating prompt after Day 5 check-in. User has experienced a positive outcome — negative review probability is significantly lower.

---

## 5. A/B Test Opportunities

| Location                | Test                                    | Primary Metric               |
|-------------------------|-----------------------------------------|------------------------------|
| Quiz length             | 20 vs 30 vs 40 questions               | Completion rate + payment CVR |
| Landing headline        | Pain-led vs curiosity-led copy          | CTA click-through rate        |
| Phase transition quote  | Walker vs Huberman vs anonymous         | Transition CTR                |
| Email capture           | Email only vs name + email              | Email submit rate             |
| Profile result copy     | Clinical vs empathetic tone             | Profile CTA click rate        |
| Paywall default plan    | 3-month vs 6-month pre-selected         | Revenue per user              |
| Paywall countdown       | Countdown visible vs hidden             | Checkout initiated rate       |
| Exit intent offer       | 60% discount vs 7-day free trial        | Exit intent accepted rate     |
| CTA copy                | "Start My Plan" vs "See My Plan"        | Checkout initiated rate       |
| Info card frequency     | Every 2 vs every 3–4 questions          | Quiz completion rate          |
| Age personalization     | With vs without demographic insights    | Interstitial engagement rate  |
| App onboarding login    | Login at step 3 (kitUP) vs step 1       | App activation rate           |

---

## 6. App Selection Rationale — Why SleepIQ

Four candidates were evaluated. Research conducted using Perplexity (March 2026 live data), Sensor Tower (free tier), and Product Hunt trend analysis.

| Candidate            | Web2App Quiz Fit | kitUP Audience Overlap | Decision    |
|----------------------|------------------|------------------------|-------------|
| ADHD Productivity    | Good             | Medium                 | Runner-up   |
| Financial Wellness   | Medium           | Low                    | Eliminated  |
| Gut Health           | Medium           | Low                    | Eliminated  |
| **AI Sleep Coach**   | **Excellent**    | **High**               | **Selected**|

**Why SleepIQ won:**
- Sleep quality, wake feeling, energy crash, caffeine dependency — all natural quiz questions with high completion intent
- kitUP targets self-improvement and productivity. Sleep is the foundational habit — same audience, adjacent need
- Calm and Headspace established willingness to pay for sleep/wellness subscriptions. Category is proven
- Sleep deprivation is acute pain (painkiller category) — higher purchase urgency vs ADHD/finance which skew vitamin

---

## 7. Edge Cases

| Scenario                                  | Action                                                                     |
|-------------------------------------------|----------------------------------------------------------------------------|
| User abandons after quiz, before email     | `quiz_abandoned` event → Meta/Google retargeting: "Your sleep profile is about to expire" |
| Magic Link not opened (48 hours)           | Klaviyo auto-reminder: "Your plan is waiting" + new link generated          |
| Countdown expires                          | Discount continues silently. Timer freezes at 0:00                          |
| Stripe webhook fails                       | Firebase write retry 3x → if all fail: manual review queue + "activation delayed" email |
| Profile calculation fails                  | `profile_calculation_fallback` event, default profile assigned              |

---

## Strategic Notes

**kitUP Experience Reference:** This funnel architecture is directly informed by deep analysis of kitUP's web funnel — 50 steps documented, 32 psychological hooks identified. Additionally, two kitUP-related app products (myChar, AI Video Generator) were shipped during PM engagement at App Genie, providing direct hands-on familiarity with the product family and technical patterns.

**Web Funnel = No App Store Commission:** Every Stripe payment on this funnel is 100% gross revenue. In-app purchases carry 30% Apple/Google fee. The web funnel's financial case is directly tied to subscriber volume through this channel.

---

*SleepIQ Case Study — Part 1 of 4 | Utku Karaca | Web Product Manager Application | kitUP / ouromedia | March 2026*
