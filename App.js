import React, { useEffect, useState } from "react";
import { getJobs as fetchJobs } from "./api";
import JobList from "./components/JobList";
import PostJob from "./components/PostJob";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

/* ---------------- COOKIE HELPERS ---------------- */
function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  /* ===================== SESSION START ===================== */
  useEffect(() => {
    let sessionId = sessionStorage.getItem("session_id");

    if (!sessionId) {
      sessionId = "sess_" + crypto.randomUUID();
      sessionStorage.setItem("session_id", sessionId);
    }

    fetch("http://localhost:5000/api/session/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {});

    if (!getCookie("cookie_consent")) setShowCookieBanner(true);

    fetchJobs().then((data) => setJobs(data || []));
  }, []);

  /* ===================== SESSION END ===================== */
  useEffect(() => {
    const sessionId = sessionStorage.getItem("session_id");

    const endSession = () => {
      if (!sessionId) return;
      navigator.sendBeacon(
        "http://localhost:5000/api/session/end",
        JSON.stringify({ sessionId })
      );
    };

    window.addEventListener("beforeunload", endSession);
    return () => window.removeEventListener("beforeunload", endSession);
  }, []);

  return (
    <div className="app-root">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary">
            ReplacementHire
          </span>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                document
                  .getElementById("jobs-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Find Jobs
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                document
                  .getElementById("post-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Post a Job
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header className="hero-pro">
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="hero-title">
                Find jobs faster.
                <br />
                Hire without hassle.
              </h1>

              <p className="hero-subtitle">
                ReplacementHire connects real job seekers with verified
                employers. No signup. No fees. Just real opportunities.
              </p>

              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document
                      .getElementById("jobs-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Browse Jobs
                </button>

                <button
                  className="btn btn-outline-light"
                  onClick={() =>
                    document
                      .getElementById("post-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Post a Job
                </button>
              </div>

              <div className="hero-stats">
                <div>
                  <i className="bi bi-lightning-fill"></i> Instant Posting
                </div>
                <div>
                  <i className="bi bi-shield-check"></i> Trusted Platform
                </div>
                <div>
                  <i className="bi bi-cash-stack"></i> 100% Free
                </div>
              </div>
            </div>

            <div className="col-md-5 d-none d-md-block">
              <div className="hero-info-card">
                <h6 className="fw-bold mb-3">
                  Why people choose ReplacementHire
                </h6>
                <ul>
                  <li>✔ Verified job listings</li>
                  <li>✔ No fake recruiters</li>
                  <li>✔ No account required</li>
                  <li>✔ Faster hiring decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-7">
            <h4 className="fw-bold mb-3">Available Jobs</h4>

            <div
              id="jobs-section"
              className="bg-white p-3 rounded-4 shadow border"
              style={{ maxHeight: "550px", overflowY: "auto" }}
            >
              <JobList jobs={jobs} />
            </div>
          </div>

          <div className="col-md-5">
            <h4 className="fw-bold mb-3">Post a Job</h4>

            <div
              id="post-section"
              className="bg-light p-4 rounded-4 shadow border"
              style={{ maxHeight: "550px", overflowY: "auto" }}
            >
              <PostJob onJobPosted={(job) => setJobs((p) => [job, ...p])} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer text-center py-4 bg-dark text-white">
        <div className="fw-bold">ReplacementHire</div>
        <div className="small">
          Goregaon West, Mumbai • support@replacementhire.com
        </div>
      </footer>

      {/* ================= COOKIE CONSENT ================= */}
      {showCookieBanner && (
        <div className="position-fixed bottom-0 start-0 w-100 bg-dark text-white p-3">
          <div className="container d-flex justify-content-between align-items-center">
            <span className="small">
              We use cookies to improve experience.
            </span>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                setCookie("cookie_consent", "accepted", 30);
                setShowCookieBanner(false);
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
