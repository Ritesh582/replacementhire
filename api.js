// ---------------- DUMMY JOB DATA ----------------

let jobs = [
  /* ================= BNP PARIBAS JOBS ================= */

  {
    id: 1,
    title: "Vice President - Senior Technology Architect",
    address: "Mumbai, Maharashtra, India",
    company: "BNP Paribas India Solutions",
    jobType: "Permanent",
    schedule: "Full time",
    amount: "As per company standards",
    skills: ["Enterprise Architecture", "System Design", "Cloud Computing"],
  },
  {
    id: 2,
    title: "Senior Associate - LC TAX EMEA",
    address: "Chennai, Tamil Nadu, India",
    company: "BNP Paribas India Solutions",
    jobType: "Permanent",
    schedule: "Full time",
    amount: "As per company standards",
    skills: ["Tax Processing", "Compliance"],
  },
  {
    id: 3,
    title: "Senior Associate - Global Settlements",
    address: "Chennai, Tamil Nadu, India",
    company: "BNP Paribas India Solutions",
    jobType: "Permanent",
    schedule: "Full time",
    amount: "As per company standards",
    skills: ["Banking Operations"],
  },
  {
    id: 4,
    title: "Associate Financial Accounting SMS BP EMEA",
    address: "Mumbai, Maharashtra, India",
    company: "BNP Paribas India Solutions",
    jobType: "Permanent",
    schedule: "Full time",
    amount: "As per company standards",
    skills: ["Financial Accounting"],
  },
  {
    id: 5,
    title: "Transaction Processing Officer",
    address: "Bengaluru, India",
    company: "BNP Paribas",
    jobType: "Permanent",
    schedule: "Full time",
    amount: "₹4 – 6 LPA",
    skills: ["Transaction Processing"],
  },

  /* ================= INVESTEC JOBS (FROM IMAGE) ================= */

  {
    id: 6,
    title: "HR Operations Specialist (12883)",
    address: "Mumbai, Maharashtra, India",
    company: "Investec",
    jobType: "Full-time",
    schedule: "Full time",
    source: "EFinancialCareers",
    posted: "7 days ago",
  },
  {
    id: 7,
    title: "HR Operations Specialist",
    address: "Mumbai, Maharashtra, India",
    company: "Investec",
    jobType: "Full-time",
    schedule: "Full time",
    source: "SimplyHired",
    posted: "9 days ago",
  },
  {
    id: 8,
    title: "Credit Analyst (12887)",
    address: "Mumbai, Maharashtra, India",
    company: "Investec",
    jobType: "Full-time",
    schedule: "Full time",
    source: "EFinancialCareers",
    posted: "12 days ago",
  },
  {
    id: 9,
    title: "Private Client Lending Specialist (12666)",
    address: "Mumbai, Maharashtra, India",
    company: "Investec",
    jobType: "Full-time",
    schedule: "Full time",
    source: "EFinancialCareers",
    posted: "12 days ago",
  },
  {
    id: 10,
    title: "Payments Specialist – Transaction Banking Operations (12732)",
    address: "Mumbai, Maharashtra, India",
    company: "Investec",
    jobType: "Full-time",
    schedule: "Full time",
    source: "EFinancialCareers",
    posted: "10 days ago",
  },
];

// ---------------- API SIMULATION ----------------

export async function getJobs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobs);
    }, 400);
  });
}

export async function getJob(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobs.find((j) => j.id === id));
    }, 300);
  });
}

export async function createJob(job) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newJob = { ...job, id: jobs.length + 1 };
      jobs.unshift(newJob);
      resolve(newJob);
    }, 500);
  });
}

export async function applyToJob(jobId, applicant) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        matchScore: Math.floor(Math.random() * 30) + 70,
      });
    }, 400);
  });
}
