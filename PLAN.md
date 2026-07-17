# The Mobile Library — Booking System Implementation Plan

## Overview

Transform the current static enquiry form into a booking system with:
- A "Book Now" page with a live availability calendar for customers
- A **request-only** flow — customer submits a booking request, no payment is taken (Stripe payments are **V2**, see the bottom of this document — not built now)
- An `/admin-login` page (not linked anywhere on the site) where the owner logs in, manually blocks/unblocks dates on a calendar, and confirms/rejects booking requests

There is **no Airbnb integration**. Availability is driven entirely by the owner manually blocking dates (personal use, maintenance, bookings taken elsewhere) plus dates auto-blocked when a request is confirmed.

### Design principle: owner self-sufficiency

After initial setup, the owner should need no developer involvement for day-to-day operation. Pricing (shown as guidance, not charged in V1), minimum stay, date blocks, and booking approvals are all managed through `/admin-login`. No code changes, no Vercel redeployments, no asking for help.

### Design principle: no server until one is actually needed

The current codebase has no backend at all — just EmailJS calls from the browser. V1 keeps it that way: Supabase (with Row Level Security) handles the database and the owner's login directly from the browser, and EmailJS keeps handling notification emails, exactly as it does today. **No Vercel Functions are needed for V1.** A real server only becomes necessary in V2, when Stripe's secret key has to be used somewhere that isn't the browser.

---

## V1 — Request-Only Booking

### Initial Setup Steps

Complete these before any code is written. This section ends with the values you'll need to paste into your `.env` file.

#### 1. Supabase — Set up your database and admin login

1. Go to [supabase.com](https://supabase.com) and sign up / log in (free, no card needed)
2. Click **New project**
   - Name it `themobilelibrary` (or anything you like)
   - Set a strong database password — save this somewhere, you won't need it in the app but keep it safe
   - Choose region: **West EU (Ireland)** is closest for a UK site
3. Wait ~2 minutes for the project to provision
4. Go to **Project Settings** (cog icon, bottom left) → **Data API**
5. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **anon / public** key → `SUPABASE_ANON_KEY`
6. Go to **SQL Editor** and run:

```sql
-- Bookings table (request-only in V1: no payment columns yet — see V2 section)
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  from_date date not null,
  to_date date not null,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Blocked dates table (manual owner blocks + confirmed bookings)
create table blocked_dates (
  id uuid primary key default gen_random_uuid(),
  from_date date not null,
  to_date date not null,
  source text not null
    check (source in ('manual', 'booking')),
  booking_id uuid references bookings(id),
  label text,
  created_at timestamptz default now()
);

-- Settings table (owner-editable, no code changes needed)
create table settings (
  key text primary key,
  value text not null,
  label text,          -- human-readable label shown in the admin UI
  updated_at timestamptz default now()
);

insert into settings (key, value, label) values
  ('nightly_rate_pence', '15000',  'Nightly rate (pence) — e.g. 15000 = £150, shown as a guide price'),
  ('min_stay_nights',    '2',      'Minimum stay (nights)'),
  ('owner_email',        '',       'Owner email address for booking notifications');

-- Row Level Security
alter table blocked_dates enable row level security;
create policy "public can read blocked dates" on blocked_dates
  for select using (true);
create policy "authenticated can manage blocked dates" on blocked_dates
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table settings enable row level security;
create policy "public can read settings" on settings
  for select using (true);
create policy "authenticated can update settings" on settings
  for update using (auth.role() = 'authenticated');

alter table bookings enable row level security;
create policy "public can submit a booking request" on bookings
  for insert with check (status = 'pending');
create policy "authenticated can read bookings" on bookings
  for select using (auth.role() = 'authenticated');
create policy "authenticated can update bookings" on bookings
  for update using (auth.role() = 'authenticated');
```

Note the `bookings` policies: anyone can *insert* a new request (forced to `status = 'pending'`), but only the logged-in owner can *read* or *update* the list — a customer can't see other people's bookings or self-approve their own.

7. Click **Run** — you should see "Success. No rows returned"
8. Create the owner's login: go to **Authentication** → **Users** → **Add user**
   - Enter the owner's email and a password — this **is** the `/admin-login` credential, no separate secret to generate
   - Tick **Auto Confirm User** so no confirmation email is required

> **Update the seed values** before going live: set `nightly_rate_pence` and `owner_email` to real values, either in the admin page once it's built, or directly in the Supabase table editor.

#### 2. Create your `.env` file

In the root of the project, create a file called `.env` (it's already gitignored):

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=
```

Both are safe to expose in the frontend bundle — the anon key only grants what the RLS policies above allow.

---

### Cost Summary

| Service | Cost |
|---|---|
| Supabase | Free tier (500MB DB — more than enough) |
| Vercel | Free Hobby tier (static hosting only in V1 — no functions needed) |
| EmailJS | Existing free tier, as used today |

**Fixed monthly cost: £0.**

---

### Architecture

```
Vue 3 frontend (Vite + Tailwind)
       │
       ├── Supabase client (browser, anon key) — direct reads/writes under RLS
       │      ├── read blocked_dates + settings        (public — Book Now calendar & guide price)
       │      ├── insert into bookings                 (public, insert-only — new requests)
       │      ├── owner login (Supabase Auth)           (/admin-login)
       │      └── owner: block/unblock dates, edit      (authenticated only, via RLS)
       │           settings, confirm/reject bookings
       │
       └── EmailJS (browser) — owner notified of new requests;
                                customer notified when confirmed/rejected
```

No custom backend. No Vercel Functions in V1.

### Database Schema (Supabase)

Already shown in full in the setup SQL above. Summary:

| Table | Public can | Owner (authenticated) can |
|---|---|---|
| `bookings` | insert a request (`status` forced to `pending`) | read all, update (confirm/reject) |
| `blocked_dates` | read | insert/update/delete (manual blocks) |
| `settings` | read | update |

### Frontend Changes

#### `/book` ("Book Now" page) — updated `Book.vue`

The current version is a plain enquiry form (text inputs for dates, submitted via EmailJS, no availability check). It becomes:

1. **Availability calendar** — replace the `fromDate`/`toDate` text inputs with a date range picker (`v-calendar` library). On mount, read `blocked_dates` directly from Supabase (public read) and disable/grey out those ranges.
2. **Guide price display** — read `nightly_rate_pence` and `min_stay_nights` from the `settings` table and show an indicative total as the customer selects dates, labelled clearly as a guide price, not a charge (no payment is taken in V1).
3. **Submit request** — on submit, insert a row into `bookings` directly via the Supabase client (allowed by the public insert policy), then keep the existing EmailJS calls to notify the owner — same two-email pattern as today (`template_tnwnamu` request email, `template_ymhq20q` summary email), just triggered after a successful Supabase insert instead of being the only thing that happens. Add `to_email: settings.owner_email` to the EmailJS template params and update the EmailJS template to send to `{{to_email}}`, so the owner can change the notification address from `/admin-login` without touching the EmailJS dashboard.
4. **Success state** — "booking request received — we'll confirm within 24 hours." Reset the form as it does today.

> Client-side double-booking check only: the calendar disables dates it knows are blocked at load time, but two people could in theory both submit overlapping requests before either is confirmed. This is an accepted risk in V1 — nothing is auto-approved, so the owner just rejects whichever request loses out when reviewing in `/admin-login`. Revisit if booking volume ever makes this a real problem.

#### `/admin-login` — new `AdminLogin.vue`

- Route: `/admin-login`, added to the router but **not** included in the nav links array in `Header.vue`.
- **Login form**: email + password, calls `supabase.auth.signInWithPassword`. The credential is the Supabase user created in setup step 1.
- Once logged in, the same page shows the admin dashboard (Supabase's client-side session persists across refreshes):
  - **Calendar tab** — click a date or drag a range to block it (writes directly to `blocked_dates`) and remove existing manual blocks. This is the *only* way dates get blocked outside of confirmed bookings.
  - **Bookings tab** — requests grouped by status: Pending / Confirmed / Rejected, read directly from Supabase. Each pending request has Confirm/Reject buttons:
    - **Confirm** → update `bookings.status = 'confirmed'`, insert a `blocked_dates` row (`source: 'booking'`), then trigger an EmailJS "booking confirmed" email to the customer (new template, created in the EmailJS dashboard).
    - **Reject** → update `bookings.status = 'rejected'`, then trigger an EmailJS "booking declined" email to the customer (new template).
  - **Settings tab** — update nightly rate, minimum stay, and owner notification email; writes directly to the `settings` table.

### New Dependencies

```bash
npm install @supabase/supabase-js v-calendar
```

`@emailjs/browser` is already a dependency and needs no change.

### Implementation Phases

#### Phase 1 — Foundations, Admin Login, Manual Block Calendar
- Set up Supabase project, tables, RLS policies, and the owner's Auth user
- Build `AdminLogin.vue` at `/admin-login`: login form + Calendar tab
- Add the route to the router, with no nav link
- At the end of this phase the owner can already start blocking dates by hand

#### Phase 2 — Customer Book Now Calendar
- Replace the text date inputs in `Book.vue` with a `v-calendar` date range picker
- Read `blocked_dates` + `settings` directly from Supabase to disable unavailable dates and show a guide price
- No submission changes yet — just a correct, live availability view

#### Phase 3 — Booking Request
- On submit, insert into `bookings` via Supabase (status defaults to `pending`)
- Keep the existing EmailJS owner-notification calls, adding `to_email` from `settings.owner_email`
- Success/error states in the UI

#### Phase 4 — Admin Bookings Review
- Add the Bookings and Settings tabs to `AdminLogin.vue`
- Confirm/Reject buttons write directly to Supabase (status update + `blocked_dates` insert on confirm)
- Create the two new EmailJS templates (confirmed / declined) and wire them up to fire after each action

### Credentials Needed Before Starting

1. **Supabase** — create free project at [supabase.com](https://supabase.com), grab: Project URL, anon key; create one Auth user for the owner's `/admin-login` credential
2. **EmailJS** — already set up; just need two new templates added (booking confirmed, booking declined) alongside the two that exist today

---

## V2 — Stripe Payments (not built yet)

Once request-only booking is live and working, V2 adds upfront payment via Stripe. This is the point where a real server becomes necessary — everything above stays as-is, this is additive.

### What changes

- **Schema migration**:
  ```sql
  alter table bookings
    add column stripe_payment_intent_id text,
    add column stripe_payment_status text,
    add column total_amount_pence integer;
  ```
- **New env vars**: `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, plus `SUPABASE_SERVICE_KEY` (needed server-side once Vercel Functions exist, to bypass RLS for writes made on the customer's/owner's behalf)
- **New dependencies**: `@stripe/stripe-js` (frontend), `stripe` (API)
- **New Vercel Functions** (the only backend code this project will have):
  - `POST /api/bookings` — replaces the direct client insert from V1. Validates dates against `blocked_dates`, creates a Stripe PaymentIntent (`capture_method: 'manual'`), inserts the booking (service key) with status `pending`, returns `clientSecret`
  - `POST /api/admin/confirm/:id` — verifies the owner's Supabase session token, captures the PaymentIntent, updates status to `confirmed`, inserts `blocked_dates`, emails the customer
  - `POST /api/admin/reject/:id` — verifies the owner's session, cancels the PaymentIntent (auto refund), updates status to `rejected`, emails the customer
  - `POST /api/stripe/webhook` — handles `payment_intent.payment_failed` and `charge.refunded`
- **Frontend**: `Book.vue` gains a Stripe Payment Element step after the request form, shown before submission completes. `AdminLogin.vue`'s Confirm/Reject buttons call the new Vercel Functions instead of writing to Supabase directly (so the owner's session token needs to be sent with the request).
- **Payment flow**:
  ```
  Customer selects dates → enters details → Stripe Payment Element shown
         │
         ▼
  POST /api/bookings → PaymentIntent created (capture_method: manual)
         │
         ▼
  Customer completes payment (Apple Pay / Google Pay / card)
         │
         ▼
  Payment AUTHORISED (money held, not charged) — booking status: pending
         │
         ▼
  Owner reviews in /admin-login
         │
         ├── Confirm → payment CAPTURED → dates blocked → customer confirmation email
         └── Reject  → payment CANCELLED → customer refund email (Stripe keeps its fee)
  ```
  Stripe's manual capture window is **7 days** — bookings must be confirmed or rejected within that window or the authorisation expires.
- **Stripe account setup**: sign up at [stripe.com](https://stripe.com), grab publishable + secret keys from **Developers → API keys**, enable Apple Pay under **Settings → Payment methods** (needs domain verification after a Vercel deploy), and add a webhook endpoint at **Developers → Webhooks** pointing to `/api/stripe/webhook` for `payment_intent.payment_failed` and `charge.refunded`.

Don't build any of this until V1 is live and the request-only flow is working end to end.
