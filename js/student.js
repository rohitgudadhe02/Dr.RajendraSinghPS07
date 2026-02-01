function studentLogin() {
  window.location.href = "student/details.html";
}

function submitDetails() {
  const backlog = document.getElementById("backlog").value;
  localStorage.setItem("hasBacklog", backlog);

  if (backlog === "yes") {
    window.location.href = "backlog.html";
  } else {
    window.location.href = "skills.html";
  }
}

function submitBacklogType() {
  window.location.href = "skills.html";
}

function submitSkills() {
  const skills = [];
  document.querySelectorAll("input[type=checkbox]:checked")
    .forEach(cb => skills.push(cb.value));

  localStorage.setItem("skills", JSON.stringify(skills));
  window.location.href = "companies.html";
}

window.onload = function () {
  const companyList = document.getElementById("companyList");
  if (!companyList) return;

  const skills = JSON.parse(localStorage.getItem("skills")) || [];

  const companies = [
    { name: "Google", skill: "DSA" },
    { name: "TCS", skill: "Java" },
    { name: "Infosys", skill: "Python" },
    { name: "StartupX", skill: "Web" },
    {name:"Netflix",skill :"DSA"}
  ];

  companies.forEach(c => {
    if (skills.includes(c.skill)) {
      const li = document.createElement("li");
      li.textContent = c.name;
      companyList.appendChild(li);
    }function toggleSkill(el) {
  el.classList.toggle("active");
}

  });
};
function submitSkills() {
  const skills = [];
  document.querySelectorAll(".chip.active").forEach(chip =>
    skills.push(chip.textContent)
  );

  const student = {
    name: "Student",
    cgpa: Number(localStorage.getItem("cgpa")),
    branch: localStorage.getItem("branch").toLowerCase(),
    backlog: localStorage.getItem("hasBacklog") === "yes",
    skills
  };

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  window.location.href = "companies.html";
}
localStorage.setItem("cgpa", cgpa);
localStorage.setItem("branch", branch);

