function companyLogin() {
  window.location.href = "dashboard.html";
}

function goToCriteria() {
  window.location.href = "criteria.html";
}

function saveCriteria() {
  const criteria = {
    minCgpa: Number(document.getElementById("minCgpa").value),
    branch: document.getElementById("branch").value.toLowerCase(),
    allowBacklog: document.getElementById("allowBacklog").checked
  };

  localStorage.setItem("companyCriteria", JSON.stringify(criteria));
  window.location.href = "eligible.html";
}

window.onload = function () {
  const list = document.getElementById("studentList");
  if (!list) return;

  const criteria = JSON.parse(localStorage.getItem("companyCriteria"));

  // 👇 STUDENT DATA COMING FROM OLD FLOW
  const students = JSON.parse(localStorage.getItem("students")) || [
    { name: "Rohit", cgpa: 8.5, branch: "it", backlog: false },
    { name: "Aman", cgpa: 7.2, branch: "cse", backlog: true },
    { name: "Sneha", cgpa: 9.1, branch: "it", backlog: false }
  ];

  students.forEach(s => {
    if (
      s.cgpa >= criteria.minCgpa &&
      s.branch === criteria.branch &&
      (criteria.allowBacklog || !s.backlog)
    ) {
      const li = document.createElement("li");
      li.textContent = `${s.name} | CGPA: ${s.cgpa} | ${s.branch.toUpperCase()}`;
      list.appendChild(li);
    }
  });
};
