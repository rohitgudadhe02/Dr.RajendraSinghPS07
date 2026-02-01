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
    name: "Student",
    cgpa: Number(localStorage.getItem("cgpa")),
    branch: localStorage.getItem("branch").toLowerCase(),
    backlog: localStorage.getItem("hasBacklog") === "yes",
    backlogType: localStorage.getItem("backlogType") || "none",
    skills: selectedSkills
  };

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  window.location.href = "companies.html";
}

/* ======================================================
   EXPLORE → ELIGIBILITY FEATURE
====================================================== */

/* ---------- PREDEFINED COMPANY DATA ---------- */
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
   PAGE AUTO-DETECTION (EXPLORE + ELIGIBILITY)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- EXPLORE PAGE ---------- */
  const companyList = document.getElementById("companyList");

  if (companyList) {
    companyList.innerHTML = "";

    COMPANY_DATA.forEach(company => {
      const li = document.createElement("li");
      li.textContent = company.name;
      li.style.cursor = "pointer";

      li.addEventListener("click", () => {
        localStorage.setItem(
          "selectedCompany",
          JSON.stringify(company)
        );
        window.location.href = "./eligibility.html";
      });

      companyList.appendChild(li);
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
    details.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      criteriaList.appendChild(li);
    });
  }

});
function viewEligibility(companyName) {
  const company = COMPANY_DATA.find(
    c => c.name === companyName
  );

  if (!company) {
    alert("Company not found");
    return;
  }

  localStorage.setItem(
    "selectedCompany",
    JSON.stringify(company)
  );

  // ✅ GO DIRECTLY TO ELIGIBILITY
  window.location.href = "eligibility.html";
}

