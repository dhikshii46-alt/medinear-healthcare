
import { useState } from "react";
import "./App.css";
import { districts, hospitals } from "./hospitals";
import translations from "./translations";

function App() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [district, setDistrict] = useState("Nagapattinam");
  const [search, setSearch] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [booking, setBooking] = useState(null);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    phone: "",
    issue: "",
    date: "",
  });

  const isTamil = language === "ta";

  const districtHospitals = hospitals
    .filter((hospital) => {
      const districtMatch =
        hospital.district?.toLowerCase() === district.toLowerCase();

      const searchText = search.toLowerCase().trim();

      const searchMatch =
        hospital.name?.toLowerCase().includes(searchText) ||
        hospital.specialty?.toLowerCase().includes(searchText) ||
        hospital.type?.toLowerCase().includes(searchText) ||
        hospital.location?.toLowerCase().includes(searchText);

      return districtMatch && searchMatch;
    })
    .sort((a, b) => {
      const aGovernment = a.type?.toLowerCase().includes("government");
      const bGovernment = b.type?.toLowerCase().includes("government");
      return Number(bGovernment) - Number(aGovernment);
    });

  function handlePatientChange(event) {
    const { name, value } = event.target;

    setPatient((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function openBooking(hospital) {
    setBooking(null);
    setSelectedHospital(hospital);

    setPatient({
      name: "",
      age: "",
      phone: "",
      issue: "",
      date: "",
    });

    window.setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  }

  function handleBooking(event) {
    event.preventDefault();

    if (!selectedHospital) return;

    // Demo token number; not a real hospital-issued token.
    const tokenNumber =
      "HN-" +
      new Date().getFullYear() +
      "-" +
      Date.now().toString().slice(-8);

    setBooking({
      id: tokenNumber,
      hospital: selectedHospital.name,
      district: selectedHospital.district,
      patientName: patient.name,
      age: patient.age,
      phone: patient.phone,
      date: patient.date,
      issue: patient.issue,
    });

    setSelectedHospital(null);

    setPatient({
      name: "",
      age: "",
      phone: "",
      issue: "",
      date: "",
    });

    window.setTimeout(() => {
      document.getElementById("booking-success")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  }

  function closeBooking() {
    setSelectedHospital(null);
  }

  function backToHospitals() {
    setBooking(null);

    window.setTimeout(() => {
      document.getElementById("hospitals")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">+</span>
          HealthNexa
        </a>

        <nav>
          <a href="#home">{t.home}</a>
          <a href="#hospitals">{t.hospitals}</a>
          <a href="#about">{t.about}</a>
        </nav>

        <div className="language-switch">
          <button
            type="button"
            className={
              language === "en"
                ? "language-button active"
                : "language-button"
            }
            onClick={() => setLanguage("en")}
          >
            English
          </button>

          <button
            type="button"
            className={
              language === "ta"
                ? "language-button active"
                : "language-button"
            }
            onClick={() => setLanguage("ta")}
          >
            தமிழ்
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">{t.tagline}</p>

            <h1>
              {t.headline1}
              <br />
              <span>{t.headline2}</span>
            </h1>

            <p className="hero-description">{t.description}</p>

            <a className="primary-button hero-button" href="#hospitals">
              {t.explore} →
            </a>

            <div className="hero-features">
              <span>
                ✓{" "}
                {isTamil
                  ? "மாவட்ட வாரியான தேடல்"
                  : "District-wise search"}
              </span>

              <span>
                ✓{" "}
                {isTamil
                  ? "முன்பதிவுக் கோரிக்கைகள்"
                  : "Appointment requests"}
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="medical-circle">
              <div className="medical-cross">+</div>

              <div className="medical-text">
                <strong>
                  {isTamil
                    ? "எளிய மருத்துவச் சேவை"
                    : "Care made simpler"}
                </strong>

                <span>
                  {isTamil
                    ? "உங்கள் ஆரோக்கியம் முக்கியம்"
                    : "Your health matters"}
                </span>
              </div>
            </div>

            <div className="floating-card">
              <span className="status-dot"></span>

              {isTamil
                ? "அனைவருக்கும் எளிய மருத்துவத் தகவல்"
                : "Healthcare, made accessible"}
            </div>
          </div>
        </section>

        <section className="search-section" id="hospitals">
          <div className="section-heading">
            <p className="eyebrow">
              {isTamil
                ? "மருத்துவச் சேவையைக் கண்டறியுங்கள்"
                : "FIND YOUR CARE"}
            </p>

            <h2>{t.searchTitle}</h2>
            <p>{t.searchDescription}</p>
          </div>

          <div className="search-panel">
            <div className="field">
              <label htmlFor="district">{t.selectDistrict}</label>

              <select
                id="district"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
              >
                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="field search-field">
              <label htmlFor="hospital-search">
                {t.hospitalSearch}
              </label>

              <input
                id="hospital-search"
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <button
              type="button"
              className="primary-button search-button"
              onClick={() =>
                document
                  .getElementById("hospital-results")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
              }
            >
              {t.search}
            </button>
          </div>

          <div className="results-heading" id="hospital-results">
            <div>
              <h3>
                {district} {t.hospitals}
              </h3>

              <p>
                {districtHospitals.length} {t.listings}
              </p>
            </div>

            <span className="district-tag">
              {district}, Tamil Nadu
            </span>
          </div>

          <div className="hospital-grid">
            {districtHospitals.map((hospital, index) => (
              <article
                className="hospital-card"
                key={`${hospital.name}-${index}`}
              >
                <div className="hospital-card-top">
                  <div className="hospital-icon">✚</div>

                  <span className="hospital-type">
                    {hospital.type ||
                      (isTamil ? "மருத்துவச் சேவை" : "Healthcare")}
                  </span>
                </div>

                <h3>{hospital.name}</h3>

                <p className="specialty">
                  {hospital.specialty ||
                    (isTamil ? "பொது மருத்துவம்" : "General Medical Care")}
                </p>

                <div className="hospital-detail">
                  <span>📍</span>
                  <p>{hospital.location || hospital.district}</p>
                </div>

                <div className="hospital-detail">
                  <span>☎</span>
                  <p>
                    {hospital.phone ||
                      (isTamil
                        ? "தொடர்பு விவரம் இல்லை"
                        : "Contact details unavailable")}
                  </p>
                </div>

                <div className="hospital-detail">
                  <span>◷</span>
                  <p>
                    {hospital.hours ||
                      (isTamil
                        ? "மருத்துவமனையைத் தொடர்புகொள்ளவும்"
                        : "Please contact the hospital")}
                  </p>
                </div>

                {hospital.isDemo && (
                  <p className="demo-note">
                    {isTamil
                      ? "மாதிரி பட்டியல் — செல்வதற்கு முன் விவரங்களை உறுதிப்படுத்தவும்."
                      : "Sample listing — verify details before visiting."}
                  </p>
                )}

                <div className="card-actions">
                  {hospital.mapUrl && (
                    <a
                      className="secondary-button"
                      href={hospital.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.viewMap}
                    </a>
                  )}

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => openBooking(hospital)}
                  >
                    {t.book}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {districtHospitals.length === 0 && (
            <div className="empty-state">
              <h3>{t.noHospitals}</h3>

              <p>
                {isTamil
                  ? "வேறு மருத்துவப் பிரிவைத் தேடவும் அல்லது வேறு மாவட்டத்தைத் தேர்ந்தெடுக்கவும்."
                  : "Try another speciality or select a different district."}
              </p>
            </div>
          )}
        </section>

        {selectedHospital && (
          <section className="booking-section" id="booking">
            <div className="booking-card">
              <div className="booking-header">
                <div>
                  <p className="eyebrow">
                    {isTamil
                      ? "முன்பதிவுக் கோரிக்கை"
                      : "APPOINTMENT REQUEST"}
                  </p>

                  <h2>{t.appointmentTitle}</h2>

                  <p className="booking-hospital">
                    {selectedHospital.name}
                  </p>
                </div>

                <button
                  type="button"
                  className="close-button"
                  onClick={closeBooking}
                  aria-label={isTamil ? "மூடு" : "Close booking form"}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleBooking}>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="patient-name">
                      {t.patientName} *
                    </label>

                    <input
                      id="patient-name"
                      name="name"
                      type="text"
                      placeholder={
                        isTamil
                          ? "உங்கள் பெயரை உள்ளிடவும்"
                          : "Enter your name"
                      }
                      value={patient.name}
                      onChange={handlePatientChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="patient-age">{t.age} *</label>

                    <input
                      id="patient-age"
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      placeholder={
                        isTamil ? "வயதை உள்ளிடவும்" : "Enter your age"
                      }
                      value={patient.age}
                      onChange={handlePatientChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="patient-phone">{t.phone} *</label>

                    <input
                      id="patient-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder={
                        isTamil
                          ? "10 இலக்க கைபேசி எண்"
                          : "10-digit mobile number"
                      }
                      value={patient.phone}
                      onChange={handlePatientChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="appointment-date">{t.date} *</label>

                    <input
                      id="appointment-date"
                      name="date"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={patient.date}
                      onChange={handlePatientChange}
                      required
                    />
                  </div>

                  <div className="field full-field">
                    <label htmlFor="patient-issue">
                      {t.healthConcern} *
                    </label>

                    <select
                      id="patient-issue"
                      name="issue"
                      value={patient.issue}
                      onChange={handlePatientChange}
                      required
                    >
                      <option value="">{t.chooseConcern}</option>
                      <option value="General check-up">{t.general}</option>
                      <option value="Fever or cold">{t.fever}</option>
                      <option value="Dental problem">{t.dental}</option>
                      <option value="Eye problem">{t.eye}</option>
                      <option value="Diabetes">{t.diabetes}</option>
                      <option value="Pregnancy care">{t.pregnancy}</option>
                      <option value="Skin problem">{t.skin}</option>
                      <option value="Other">{t.other}</option>
                    </select>
                  </div>
                </div>

                <p className="form-note">
                  {isTamil
                    ? "இது ஒரு மாதிரி முன்பதிவு மட்டுமே. உண்மையான முன்பதிவு உறுதிப்படுத்தப்படாது."
                    : "Demo booking only. This request does not confirm an actual hospital appointment."}
                </p>

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={closeBooking}
                  >
                    {t.cancel}
                  </button>

                  <button type="submit" className="primary-button">
                    {t.submit} →
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {booking && (
          <section className="success-section" id="booking-success">
            <div className="success-card">
              <div className="success-icon">✓</div>

              <p className="eyebrow">
                {isTamil ? "கோரிக்கை பெறப்பட்டது" : "REQUEST RECEIVED"}
              </p>

              <h2>{t.success}</h2>

              <p>
                {isTamil
                  ? `நன்றி, ${booking.patientName}. உங்கள் மாதிரி முன்பதிவுக் கோரிக்கை சமர்ப்பிக்கப்பட்டது.`
                  : `Thank you, ${booking.patientName}. Your demo booking request has been submitted successfully.`}
              </p>

              <div className="token-display">
                <span>
                  {isTamil ? "உங்கள் டோக்கன் எண்" : "YOUR TOKEN NUMBER"}
                </span>

                <strong>{booking.id}</strong>

                <p>
                  {isTamil
                    ? "இந்த எண்ணை உங்கள் முன்பதிவுக்காக வைத்துக்கொள்ளவும்."
                    : "Please keep this number for your appointment request."}
                </p>
              </div>

              <div className="booking-summary">
                <div>
                  <span>{isTamil ? "மருத்துவமனை" : "Hospital"}</span>
                  <strong>{booking.hospital}</strong>
                </div>

                <div>
                  <span>{t.selectDistrict}</span>
                  <strong>{booking.district}</strong>
                </div>

                <div>
                  <span>{t.preferredDate}</span>
                  <strong>{booking.date}</strong>
                </div>

                <div>
                  <span>{t.healthConcern}</span>
                  <strong>{booking.issue}</strong>
                </div>
              </div>

              <p className="form-note">
                {isTamil
                  ? "இது மாதிரி மட்டுமே; மருத்துவமனைக்கு உண்மையான முன்பதிவு அனுப்பப்படவில்லை. உறுதிப்படுத்த மருத்துவமனையைத் தொடர்புகொள்ளவும்."
                  : "Demo only: no real hospital reservation or notification has been sent. Contact the hospital to confirm availability."}
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={backToHospitals}
              >
                {t.back}
              </button>
            </div>
          </section>
        )}

        <section className="about-section" id="about">
          <p className="eyebrow">
            {isTamil ? "HEALTHNEXA பற்றி" : "ABOUT HEALTHNEXA"}
          </p>

          <h2>
            {isTamil
              ? "மருத்துவத் தகவல்கள் ஒரே இடத்தில்."
              : "Healthcare information, all in one place."}
          </h2>

          <p>
            {isTamil
              ? "HealthNexa மூலம் மாவட்ட வாரியாக மருத்துவமனைகளைப் பார்த்து மாதிரி முன்பதிவுக் கோரிக்கையைச் சமர்ப்பிக்கலாம்."
              : "HealthNexa helps users explore hospital listings by district and submit a demo appointment request."}
          </p>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">+</span>
          HealthNexa
        </a>

        <p>
          {isTamil
            ? "மருத்துவமனைத் தேடல் மாதிரி இணையதளம் · மருத்துவ விவரங்களை நேரடியாக உறுதிப்படுத்தவும்."
            : "Healthcare discovery demo · Verify hospital details directly."}
        </p>
      </footer>
    </div>
  );
}

export default App;
