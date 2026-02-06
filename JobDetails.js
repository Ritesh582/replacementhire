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

    setJob({
      title: "",
      description: "",
      address: "",
      amount: "",
      skills: "",
    });
  }

  return (
    <div className="container my-5">
      <div className="glass-form p-4 shadow-lg rounded-4">

        <div className="text-center mb-4">
          <h2 className="fw-bold text-light">
            <Sparkles className="text-warning me-2" size={24} />
            Post a Job
          </h2>
          <p className="text-light opacity-75">
            Fast • Free • Find the right talent instantly
          </p>
        </div>

        <form onSubmit={submit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label text-light">
              <Briefcase size={16} className="me-1" /> Job Title
            </label>
            <input
              className="form-control glass-input"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              <MapPin size={16} className="me-1" /> Location
            </label>
            <input
              className="form-control glass-input"
              value={job.address}
              onChange={(e) => setJob({ ...job, address: e.target.value })}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label text-light">
              <FileText size={16} className="me-1" /> Description
            </label>
            <textarea
              className="form-control glass-input"
              rows="3"
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
            ></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              <IndianRupee size={16} className="me-1" /> Salary (₹)
            </label>
            <input
              type="number"
              className="form-control glass-input"
              value={job.amount}
              onChange={(e) => setJob({ ...job, amount: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              <Sparkles size={16} className="me-1" /> Required Skills
            </label>
            <input
              className="form-control glass-input"
              placeholder="React, PHP, Communication..."
              value={job.skills}
              onChange={(e) => setJob({ ...job, skills: e.target.value })}
            />
          </div>

          <div className="text-end mt-3">
            <button className="btn glass-btn px-4 py-2">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
}
