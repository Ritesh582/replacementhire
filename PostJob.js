import React, { useState } from "react";
import { createJob } from "../api";

export default function PostJob({ onJobPosted }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [skills, setSkills] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    const job = {
      title,
      description,
      address,
      amount: Number(amount),
      skills: skills.split(",").map((s) => s.trim()),
    };

    const res = await createJob(job);

    if (res && res.id) {
      setMsg("✅ Job Posted Successfully!");
      onJobPosted(res);
    } else {
      setMsg("❌ Error posting job");
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <div
        className="card shadow-lg border-0"
        style={{ borderRadius: "18px", overflow: "hidden" }}
      >
        <div
          className="p-4 text-white"
          style={{
            background: "linear-gradient(135deg, #1f3a93, #4b7bec)",
          }}
        >
          <h2 className="fw-bold mb-1">Post a Job</h2>
          <p className="mb-0" style={{ opacity: 0.8 }}>
            Fast • Free • Find perfect candidates instantly
          </p>
        </div>

        <div className="card-body p-4">
          <form onSubmit={submit}>
            {/* Job Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Job Title</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="e.g. Delivery Boy, Receptionist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ borderRadius: "12px" }}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Job Description</label>
              <textarea
                className="form-control p-3"
                rows="3"
                placeholder="Clearly describe responsibilities, timings, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ borderRadius: "12px" }}
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Location</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="City or full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ borderRadius: "12px" }}
              />
            </div>

            {/* Salary */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Salary (₹)</label>
              <input
                type="number"
                className="form-control p-3"
                placeholder="e.g. 15000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ borderRadius: "12px" }}
              />
            </div>

            {/* Skills */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Skills Required</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="e.g. communication, sales"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                style={{ borderRadius: "12px" }}
              />
              <small className="text-muted">Separate skills with commas.</small>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 text-white fw-bold py-3"
              style={{
                background: "linear-gradient(135deg, #1f3a93, #4b7bec)",
                borderRadius: "12px",
                fontSize: "18px",
              }}
            >
              Post Job
            </button>
          </form>

          {msg && (
            <div className="alert alert-info mt-4 text-center fw-semibold">
              {msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
