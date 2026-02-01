/* ======================================================
   STUDENT LOGIN
====================================================== */
function studentLogin() {
  window.location.href = "student/details.html";
}

/* ======================================================
   STUDENT DETAILS PAGE
====================================================== */
function submitDetails() {
  const cgpa = document.getElementById("cgpa").value;
  const branch = document.getElementById("branch").value;
  const backlog = document.getElementById("backlog").value;

  if (cgpa === "" || branch === "" || backlog === "") {
    alert("Please fill all details");
    return;
  }

  localStorage.setItem("cgpa", cgpa);
  localStorage.setItem("branch", branch);
  localStorage.setItem("hasBacklog", backlog);

  if (backlog === "yes") {
    window.location.href = "backlog.html";
  } else {
    window.location.href = "skills.html";
  }
}

/* ======================================================
   BACKLOG PAGE
====================================================== */
function submitBacklog() {
  const type = document.querySelector(
    'input[name="backlogType"]:checked'
  );

  if (!type) {
    alert("Please select backlog type");
    return;
  }

  localStorage.setItem("backlogType", type.value);
  window.location.href = "skills.html";
}

/* ======================================================
   SKILLS PAGE
====================================================== */
function toggleSkill(el) {
  el.classList.toggle("active");
}

function submitSkills() {
  const selectedSkills = [];

  document.querySelectorAll(".chip.active").forEach(chip => {
    selectedSkills.push(chip.textContent);
  });

  if (selectedSkills.length === 0) {
    alert("Please select at least one skill");
    return;
  }

  const student = {
    cgpa: Number(localStorage.getItem("cgpa")),
    branch: localStorage.getItem("branch"),
    backlog: localStorage.getItem("hasBacklog"),
    backlogType: localStorage.getItem("backlogType") || "none",
    skills: selectedSkills
  };

  localStorage.setItem("student", JSON.stringify(student));
  window.location.href = "companies.html";
}

/* ======================================================
   COMPANY DATA (SINGLE SOURCE)
====================================================== */
const COMPANY_DATA = [
  {
    name: "Google",
    cgpa: "8.5+",
    branch: "CSE / IT",
    backlogs: "Not Allowed",
    skills: ["DSA", "Problem Solving", "System Design"]
  },
  {
    name: "Infosys",
    cgpa: "7.0+",
    branch: "All Branches",
    backlogs: "Allowed",
    skills: ["Java", "Python", "Communication"]
  },
  {
    name: "StartupX",
    cgpa: "6.5+",
    branch: "IT / CSE",
    backlogs: "Allowed",
    skills: ["Web Development", "React"]
  }
];

/* ======================================================
   PAGE LOAD LOGIC (EXPLORE + ELIGIBILITY)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- EXPLORE PAGE ---------- */
  const exploreList = document.getElementById("exploreCompanyList");

  if (exploreList) {
    exploreList.innerHTML = "";

    COMPANY_DATA.forEach(company => {
      const li = document.createElement("li");
      li.textContent = company.name;
      li.style.cursor = "pointer";

      li.onclick = () => {
        localStorage.setItem(
          "selectedCompany",
          JSON.stringify(company)
        );
        window.location.href = "./eligibility.html";
      };

      exploreList.appendChild(li);
    });
  }

  /* ---------- ELIGIBILITY PAGE ---------- */
  const title = document.getElementById("companyTitle");
  const criteriaList = document.getElementById("criteriaList");

  if (title && criteriaList) {
    const company = JSON.parse(
      localStorage.getItem("selectedCompany")
    );

    if (!company) {
      title.textContent = "No company selected";
      return;
    }

    title.textContent = company.name;

    const details = [
      `Minimum CGPA: ${company.cgpa}`,
      `Eligible Branches: ${company.branch}`,
      `Backlogs: ${company.backlogs}`,
      `Required Skills: ${company.skills.join(", ")}`
    ];

    criteriaList.innerHTML = "";
    details.forEach(d => {
      const li = document.createElement("li");
      li.textContent = d;
      criteriaList.appendChild(li);
    });
  }
});

/* ======================================================
   ELIGIBLE COMPANIES PAGE CLICK
====================================================== */
function openEligibility(companyName) {
  const company = COMPANY_DATA.find(c => c.name === companyName);

  if (!company) {
    alert("Company not found");
    return;
  }

  localStorage.setItem(
    "selectedCompany",
    JSON.stringify(company)
  );

  window.location.href = "eligibility.html";
}
