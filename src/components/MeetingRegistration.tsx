import { useState } from "react";
import type { FormEvent } from "react";
import inditechLogo from "@/assets/inditech-logo.png";
import boilerIndiaExpo from "@/assets/india-expo.png";
import valvesBlueprint from "@/assets/valves-blueprint.jpg";
import {
  submitMeetingRequest,
  type MeetingRequest,
} from "@/lib/meeting-request";

const TOPICS = [
  "Control Valve",
  "PRDS/Station",
  "Desuperheater",
  "Globevalve",
  "Ball check valve",
  "QCNRV",
  "Auto Blowdown System(ABC)",
  "Dump tube",
  "Blowdown Valve",
  "Combine PRDS",
  "Others",
];

const DATES = ["8 October", "9 October", "10 October"];

const TIMES = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const INDUSTRIES = [
  "Blast furnance",
  "Boiler OEM",
  "Cement",
  "Chemical&Fertilizers",
  "Fabrication",
  "Food&Beverage",
  "Oil&Gas",
  "Power",
  "Pulp&paper",
  "Steel",
  "Steam AccessoriesOEM",
  "Sugar&Distellery",
  "Textiles",
  "Thermal plant o&M",
  "Turbine OEM",
  "Other",
];

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55";

const fieldClass =
  "mt-1 w-full bg-paper/60 border border-line rounded-sm px-3 py-2 text-sm text-ink outline-none focus:border-blueprint focus:bg-card";

const errorClass =
  "mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-brand-accent";

type Errors = Partial<Record<keyof MeetingRequest, string>>;

export function MeetingRegistration() {
  const [values, setValues] = useState({
    name: "",
    company: "",
    designation: "",
    email: "",
    mobile: "",
    industry: "",
  });

  const [topics, setTopics] = useState<string[]>([]);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<MeetingRequest | null>(null);

  const [topicsOpen, setTopicsOpen] = useState(false);

  const setField = (key: keyof typeof values) => {
    return (value: string) => {
      setValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  };

  const toggleTopic = (topic: string) => {
    setTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      }

      return [...prev, topic];
    });
  };

  const validate = (): Errors => {
    const next: Errors = {};

    if (!values.name.trim()) {
      next.name = "Name is required";
    }

    if (!values.company.trim()) {
      next.company = "Company is required";
    }

    if (!values.designation.trim()) {
      next.designation = "Designation is required";
    }

    if (!values.email.trim()) {
      next.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    ) {
      next.email = "Enter a valid email address";
    }

    if (!values.mobile.trim()) {
      next.mobile = "Mobile number is required";
    } else if (values.mobile.replace(/\D/g, "").length < 8) {
      next.mobile = "Enter a valid mobile number";
    }

    if (!values.industry) {
      next.industry = "Industry is required";
    }

    if (topics.length === 0) {
      next.discussionTopics = "Select at least one product";
    }       

    if (!preferredDate) {
      next.preferredDate = "Select a preferred date";
    }

    if (!preferredTime) {
      next.preferredTime = "Select a preferred time";
    }

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: MeetingRequest = {
      name: values.name.trim(),
      company: values.company.trim(),
      designation: values.designation.trim(),
      email: values.email.trim(),
      mobile: values.mobile.trim(),
      industry: values.industry,
      discussionTopics: topics,
      preferredDate,
      preferredTime,
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);

    try {
      await submitMeetingRequest(payload);
      setSubmitted(payload);
      setTopicsOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues({
      name: "",
      company: "",
      designation: "",
      email: "",
      mobile: "",
      industry: "",
    });

    setTopics([]);
    setPreferredDate("");
    setPreferredTime("");
    setErrors({});
    setSubmitted(null);
    setTopicsOpen(false);
  };

  const getTopicText = () => {
    if (topics.length === 0) {
      return "Select products";
    }

    if (topics.length === 1) {
      return topics[0];
    }

    return `${topics.length} products selected`;
  };

  return (
    <div
      className="min-h-screen bg-paper text-ink font-sans antialiased"
      style={{
        backgroundImage:
          "linear-gradient(to right,#dfe6ed 1px,transparent 1px),linear-gradient(to bottom,#dfe6ed 1px,transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    >
      <header className="border-b border-line bg-card/70">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-2">
          
          {/* INDITECH SECTION */}
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <div className="h-12 w-auto flex items-center shrink-0">
              <img
                src={inditechLogo}
                alt="IndiTech Valves Pvt. Ltd."
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Company name kept on ONE LINE */}
            <div className="leading-tight whitespace-nowrap shrink-0">
              <p className="text-[13px] sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                IndiTech Valves Pvt. Ltd.
              </p>

              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-blueprint whitespace-nowrap">
                Stall A-83
              </p>
            </div>
          </div>

          {/* BOILER INDIA SECTION */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <img
              src={boilerIndiaExpo}
              alt="Boiler India 2026 Expo"
              className="h-10 sm:h-14 md:h-16 w-auto object-contain shrink-0"
            />

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60 hidden lg:block whitespace-nowrap">
              Boiler India · Expo
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-blueprint mb-4">
          01 / Meeting request
        </p>

        <h1 className="font-light text-5xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
          We'd Like to Meet You at{" "}
          <span className="text-blueprint">Stall A-83</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-ink/65 leading-relaxed">
          Planning to visit Boiler India? Schedule a meeting with the IndiTech
          Valves team and discuss your valve and steam system requirements.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm text-ink/70">
          <span className="uppercase tracking-[0.2em]">
            8 October · 9 October · 10 October
          </span>

          <span className="text-line">|</span>

          <span>Boiler India</span>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-16 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-card rounded-md border border-line shadow-[0_1px_0_0_rgba(15,42,67,0.06)]">
          
          <div className="px-7 py-6 border-b border-line flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Schedule Your Meeting
              </h2>

              <p className="text-sm text-ink/55 mt-0.5">
                Pick a slot for meeting.
              </p>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blueprint">
              {submitted ? "Done" : "Form"}
            </span>
          </div>

          {submitted ? (
            <div className="px-7 py-10">
              <div className="size-11 rounded-full bg-blueprint/10 grid place-items-center">
                <span className="text-blueprint text-lg">✓</span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                Meeting Request Received!
              </h3>

              <p className="mt-2 text-sm text-ink/60 max-w-md leading-relaxed">
                Thank you for your interest in meeting IndiTech Valves at
                Boiler India.
              </p>

              <dl className="mt-6 border border-line rounded-sm divide-y divide-line">
                <div className="flex items-center justify-between px-4 py-3">
                  <dt className={labelClass}>Preferred Date</dt>

                  <dd className="text-sm font-medium">
                    {submitted.preferredDate}
                  </dd>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <dt className={labelClass}>Preferred Time</dt>

                  <dd className="text-sm font-medium">
                    {submitted.preferredTime}
                  </dd>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <dt className={labelClass}>Stall</dt>

                  <dd className="text-sm font-medium">
                    Stall A-83
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-6 px-4 py-3">
                  <dt className={labelClass}>Products</dt>

                  <dd className="text-sm text-right">
                    {submitted.discussionTopics.join(", ")}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-sm text-ink/60">
                Our team will contact you to confirm your meeting.
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="mt-6 border border-line rounded-sm px-4 py-2.5 text-sm font-medium bg-paper/50 hover:border-blueprint hover:text-blueprint"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="px-7 py-7 grid sm:grid-cols-2 gap-5"
            >
              
              {/* NAME */}
              <label className="block">
                <span className={labelClass}>Name *</span>

                <input
                  type="text"
                  value={values.name}
                  onChange={(e) => setField("name")(e.target.value)}
                  placeholder="Enter your full name"
                  className={fieldClass}
                />

                {errors.name && (
                  <span className={errorClass}>{errors.name}</span>
                )}
              </label>

              {/* COMPANY */}
              <label className="block">
                <span className={labelClass}>Company *</span>

                <input
                  type="text"
                  value={values.company}
                  onChange={(e) => setField("company")(e.target.value)}
                  placeholder="Enter company name"
                  className={fieldClass}
                />

                {errors.company && (
                  <span className={errorClass}>{errors.company}</span>
                )}
              </label>

              {/* DESIGNATION */}
              <label className="block">
                <span className={labelClass}>Designation *</span>

                <input
                  type="text"
                  value={values.designation}
                  onChange={(e) => setField("designation")(e.target.value)}
                  placeholder="Enter your designation"
                  className={fieldClass}
                />

                {errors.designation && (
                  <span className={errorClass}>{errors.designation}</span>
                )}
              </label>

              {/* EMAIL */}
              <label className="block">
                <span className={labelClass}>Email *</span>

                <input
                  type="email"
                  value={values.email}
                  onChange={(e) => setField("email")(e.target.value)}
                  placeholder="Enter your email address"
                  className={fieldClass}
                />

                {errors.email && (
                  <span className={errorClass}>{errors.email}</span>
                )}
              </label>

              {/* MOBILE */}
              <label className="block">
                <span className={labelClass}>Mobile *</span>

                <input
                  type="tel"
                  value={values.mobile}
                  onChange={(e) => setField("mobile")(e.target.value)}
                  placeholder="Enter mobile number"
                  className={fieldClass}
                />

                {errors.mobile && (
                  <span className={errorClass}>{errors.mobile}</span>
                )}
              </label>

              {/* INDUSTRY */}
              <label className="block">
                <span className={labelClass}>Industry *</span>

                <select
                  value={values.industry}
                  onChange={(e) => setField("industry")(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select your industry</option>

                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>

                {errors.industry && (
                  <span className={errorClass}>{errors.industry}</span>
                )}
              </label>

              {/* PRODUCT MULTI-SELECT DROPDOWN */}
              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>
                  What would you like to discuss? *
                </legend>

                <div className="relative mt-1">
                  <button
                    type="button"
                    onClick={() => setTopicsOpen((prev) => !prev)}
                    aria-expanded={topicsOpen}
                    className={
                      "w-full bg-paper/60 border rounded-sm px-3 py-2.5 text-sm text-left outline-none flex items-center justify-between gap-3 transition-colors " +
                      (errors.discussionTopics
                        ? "border-brand-accent"
                        : topicsOpen
                          ? "border-blueprint bg-card"
                          : "border-line hover:border-blueprint")
                    }
                  >
                    <span
                      className={
                        topics.length === 0
                          ? "text-ink/45"
                          : "text-ink"
                      }
                    >
                      {getTopicText()}
                    </span>

                    <span
                      className={
                        "text-blueprint text-xs transition-transform duration-200 " +
                        (topicsOpen ? "rotate-180" : "")
                      }
                    >
                      ▼
                    </span>
                  </button>

                  {topicsOpen && (
                    <div className="absolute z-30 left-0 right-0 mt-1 bg-card border border-line rounded-sm shadow-lg overflow-hidden">
                      <div className="max-h-64 overflow-y-auto p-2">
                        {TOPICS.map((topic) => {
                          const active = topics.includes(topic);

                          return (
                            <label
                              key={topic}
                              className={
                                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm cursor-pointer transition-colors " +
                                (active
                                  ? "bg-blueprint/10 text-blueprint"
                                  : "text-ink hover:bg-paper/70")
                              }
                            >
                              <input
                                type="checkbox"
                                checked={active}
                                onChange={() => toggleTopic(topic)}
                                className="size-4 accent-blueprint shrink-0"
                              />

                              <span>{topic}</span>
                            </label>
                          );
                        })}
                      </div>

                      <div className="border-t border-line px-3 py-2 flex items-center justify-between bg-paper/40">
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/50">
                          {topics.length === 0
                            ? "No products selected"
                            : `${topics.length} selected`}
                        </span>

                        <button
                          type="button"
                          onClick={() => setTopicsOpen(false)}
                          className="text-xs font-medium text-blueprint hover:underline"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {topics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1 rounded-sm bg-blueprint/10 border border-blueprint/20 px-2 py-1 text-[10px] text-blueprint"
                      >
                        {topic}

                        <button
                          type="button"
                          onClick={() => toggleTopic(topic)}
                          className="ml-1 text-blueprint/70 hover:text-blueprint font-bold"
                          aria-label={`Remove ${topic}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {errors.discussionTopics && (
                  <span className={errorClass}>
                    {errors.discussionTopics}
                  </span>
                )}
              </fieldset>

              {/* PREFERRED DATE */}
              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>
                  Preferred Date *
                </legend>

                <div className="mt-2 grid grid-cols-3 gap-2">
                  {DATES.map((date) => {
                    const active = preferredDate === date;

                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setPreferredDate(date)}
                        aria-pressed={active}
                        className={
                          active
                            ? "rounded-sm py-3 text-sm border border-blueprint bg-blueprint text-card"
                            : "rounded-sm py-3 text-sm border border-line bg-paper/50 hover:border-blueprint"
                        }
                      >
                        {date}
                      </button>
                    );
                  })}
                </div>

                {errors.preferredDate && (
                  <span className={errorClass}>
                    {errors.preferredDate}
                  </span>
                )}
              </fieldset>

              {/* PREFERRED TIME */}
              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>
                  Preferred Time *
                </legend>

                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMES.map((time) => {
                    const active = preferredTime === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setPreferredTime(time)}
                        aria-pressed={active}
                        className={
                          active
                            ? "rounded-sm py-3 text-sm border border-blueprint bg-blueprint text-card"
                            : "rounded-sm py-3 text-sm border border-line bg-paper/50 hover:border-blueprint"
                        }
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                {errors.preferredTime && (
                  <span className={errorClass}>
                    {errors.preferredTime}
                  </span>
                )}
              </fieldset>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={submitting}
                className="sm:col-span-2 bg-brand-accent text-card font-medium rounded-sm py-3 text-sm tracking-tight hover:brightness-95 disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Schedule My Meeting"}
              </button>
            </form>
          )}
        </div>

        <aside className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-md border border-line p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blueprint mb-3">
              Meeting information
            </p>

            <h3 className="text-lg font-semibold tracking-tight">
              Boiler India · Stall A-83
            </h3>

            <p className="text-sm text-ink/55 mt-1">
              8, 9 and 10 October. Meet our engineering team for control
              valves, PRDS / desuperheaters, blowdown valves and customized
              valve solutions.
            </p>
          </div>

          <div className="rounded-md border border-line overflow-hidden">
            <img
              src={valvesBlueprint}
              alt="Stainless steel control valves laid out on an engineering blueprint"
              width={944}
              height={704}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover"
            />

            <div className="p-5 bg-card">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blueprint mb-2">
                On the floor
              </p>

              <p className="text-sm text-ink/70 leading-relaxed">
                Bring your valve spec sheet — our engineers will walk through
                sizing and selection with you at the stall.
              </p>
            </div>
          </div>
        </aside>
      </main>

      <footer className="border-t border-line bg-card/60">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
          <span>IndiTech Valves Pvt. Ltd. · Stall A-83</span>
          <span>Boiler India · 8–10 October</span>
        </div>
      </footer>
    </div>
  );
}