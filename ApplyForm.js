import React, { useState } from "react";
import { createJob } from "../api";
import { Briefcase, MapPin, IndianRupee, FileText, Sparkles } from "lucide-react";

export default function EmployerForm({ onJobCreated }) {
  const [job, setJob] = useState({
    title: "",
    description: "",
    address: "",
    amount: "",
    skills: "",
  });

  async function submit(e) {
    e.preventDefault();
    const payload = {
      ...job,
      skills: job.skills.split(",").map((s) => s.trim()),
    };
    const res = await createJob(payload);
    onJobCreated(res);
    setJob({ title: "", description: "", address: "", amount: "", skills: "" });
  }

  return (
    <div className="container my-5">
      <div className="post-job-card shadow-lg p-4 rounded-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">
            <Sparkles size={26} className="me-2 text-warning" />
            Post a New Job
          </h2>
          <p className="text-muted">Fast • Free • Reach the right candidates instantly</p>
        </div>

        <form onSubmit={submit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              <Briefcase size={16} className="me-1" /> Job Title
            </label>
            <input
              className="form-control modern-input"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              <MapPin size={16} className="me-1" /> Location
            </label>
            <input
              className="form-control modern-input"
              value={job.address}
              onChange={(e) => setJob({ ...job, address: e.target.value })}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-semibold">
              <FileText size={16} className="me-1" /> Description
            </label>
            <textarea
              className="form-control modern-input"
              rows="3"
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
            ></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              <IndianRupee size={16} className="me-1" /> Salary (₹)
            </label>
            <input
              type="number"
              className="form-control modern-input"
              value={job.amount}
              onChange={(e) => setJob({ ...job, amount: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              <Sparkles size={16} className="me-1" /> Required Skills
            </label>
            <input
              className="form-control modern-input"
              placeholder="React, PHP, Communication..."
              value={job.skills}
              onChange={(e) => setJob({ ...job, skills: e.target.value })}
            />
          </div>

          <div className="text-end mt-3">
            <button className="btn btn-primary px-4 py-2 rounded-3 shadow-sm post-btn">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
