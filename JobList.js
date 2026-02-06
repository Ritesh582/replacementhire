import React from "react";

export default function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return <div className="text-muted">No jobs available</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-4 shadow-sm border d-flex align-items-center"
          style={{ minHeight: "110px" }}
        >
          {/* LEFT GREEN BAR */}
          <div
            style={{
              width: "8px",
              height: "100%",
              backgroundColor: "#7ED957",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: "16px",
            }}
          />

          {/* CONTENT */}
          <div className="p-3 flex-grow-1">
            <div className="text-uppercase text-muted small fw-semibold">
              {job.jobType}
            </div>

            <h6 className="fw-bold mb-1">{job.title}</h6>

            <div className="text-muted small d-flex align-items-center gap-2">
              <i className="bi bi-geo-alt-fill text-success"></i>
              {job.address}
            </div>
          </div>

          {/* COMPANY LOGO / NAME */}
          <div className="p-3 text-end">
            <div className="fw-bold text-success">
              {job.company.includes("BNP") ? "BNP PARIBAS" : job.company}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
