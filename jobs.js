
const data = [
  {
    id: 1,
    image: "tokopedia.png",
    title: "Web Developer",
    time: "Now",
    location: "Jakarta",
    shortDesc: "Develop modern web applications.",
    desc: "Willing to visit clients if needed based on RFBO (Remote First Before Onsite) escalation. Analyze and configure network security on the client side. Analyze and configure servers, routers, manageable switches, wireless access points, network printers, and other computer network equipment. Monitor, troubleshoot, and repair the company's internal network. Create user guides for clients related to network usage. Submit detailed work reports to supervisors. Strictly follow company standard procedures.",
    company: "Tokopedia",
    type: "Full-time"
  },
  {
    id: 2,
    image: "bukalapak.jpg",
    title: "UI/UX Designer",
    time: "Now",
    location: "Surabaya",
    shortDesc: "Design engaging user interfaces.",
    desc: "Create user flows and wireframes based on user needs. Design interactive prototypes using tools like Figma or Adobe XD. Conduct usability testing and analyze the results. Collaborate closely with frontend and backend developers. Ensure design consistency with the company's visual identity.",
    company: "Bukalapak",
    type: "Remote"
  },
  {
    id: 3,
    image: "gojek.png",
    title: "Data Scientist",
    time: "Now",
    location: "Bandung",
    shortDesc: "Analyze data for business decisions.",
    desc: "Process and analyze large datasets to generate business insights. Develop predictive and classification models using machine learning. Create informative data visualizations. Collaborate with product teams to understand analytical needs. Document analysis results and provide recommendations.",
    company: "Gojek",
    type: "Contract"
  },
  {
    id: 4,
    image: "traveloka.png",
    title: "Data Analyst",
    time: "Now",
    location: "Yogyakarta",
    shortDesc: "Analyze and interpret data.",
    desc: "Collect and clean data from various sources. Prepare routine and ad-hoc reports using Excel, SQL, and BI tools. Provide data-driven insights to support management decisions. Build performance dashboards and monitor KPIs. Coordinate with other divisions to fulfill data needs.",
    company: "Traveloka",
    type: "Full-time"
  },
  {
    id: 5,
    image: "shopee.png",
    title: "Software Engineer",
    time: "Now",
    location: "Surabaya",
    shortDesc: "Build and maintain software systems.",
    desc: "Design, develop, and test web and mobile applications. Perform regular code reviews and bug fixes. Work in agile teams and follow sprints. Write technical documentation. Implement best practices in security and performance.",
    company: "Shopee",
    type: "Remote"
  },
  {
    id: 6,
    image: "lazada.png",
    title: "Marketing Manager",
    time: "Now",
    location: "Jakarta",
    shortDesc: "Manage marketing strategy.",
    desc: "Design and execute digital and offline marketing strategies. Manage budget and ad performance. Analyze campaign data and optimize conversions. Build relationships with media and external partners. Lead the marketing team and develop promotional content.",
    company: "Lazada",
    type: "Part-time"
  },
  {
    id: 7,
    image: "zalora.png",
    title: "Quality Assurance",
    time: "Now",
    location: "Bali",
    shortDesc: "Ensure software quality.",
    desc: "Write and run manual and automated test cases. Report bugs and collaborate with developers. Conduct regression and smoke testing before release. Ensure product quality meets company standards. Get involved in early development stages to validate requirements.",
    company: "Zalora",
    type: "Contract"
  },
  {
    id: 8,
    image: "blibli.png",
    title: "Product Manager",
    time: "Now",
    location: "Medan",
    shortDesc: "Lead digital product development.",
    desc: "Manage the product lifecycle from planning to launch. Conduct market research and idea validation. Create roadmaps and product specifications. Coordinate with design and engineering teams. Measure product success through data and user feedback.",
    company: "Blibli",
    type: "Full-time"
  }
];



const jobList = document.getElementById("jobList");
const isSavedPage = window.location.pathname.includes("saved.html");
const searchForm = document.querySelector("form");
const inputs = document.querySelectorAll("form input");
const typeSelect = document.querySelector("select#relevance");
const clearButtons = document.querySelectorAll(".bx-x-circle");
let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

function renderJobs(jobs) {
  if (!jobList) return;
  jobList.innerHTML = "";
  jobs.forEach((job) => {
    const isSaved = savedJobs.includes(job.id);
    const jobDiv = document.createElement("div");
    jobDiv.className = "group group/item border w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-sky-500 shadow-md shadow-grey-400/700 hover:shadow-lg";

    jobDiv.innerHTML = `
      <a href="detail.html?id=${job.id}" class="block no-underline text-inherit">
        <span class="flex justify-between items-center gap-4">
          <h1 class="text-[16px] font-semibold text-slate-500 group-hover:text-white">${job.title}</h1>
          <span class="flex items-center text-[#ccc] gap-1">
            <i class='bx bx-time-five'></i>
            ${job.time}
          </span>
        </span>
        <h6 class="text-[#ccc]">${job.location}</h6>
        <p class="text-[13px] text-[#95959] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
          ${job.shortDesc}
        </p>
        <div class="Company flex items-center gap-2">
          <img src="img/${job.image}" alt="" class="w-[15%]">
          <span class="text-[14px] py-[1rem] block group-hover:text-white">${job.company}</span>
        </div>
        <div class="text-sm mb-2 px-2 py-1 rounded bg-sky-100 text-sky-600 w-fit">${job.type}</div>
      </a>

      ${isSavedPage 
        ? `<button class="unsaveBtn mt-2 bg-red-500 text-white rounded p-2 w-full">Unsave Job</button>` 
        : `<button class="saveBtn mt-2 bg-${isSaved ? 'green' : 'sky'}-400 text-white rounded p-2 w-full">${isSaved ? 'Saved' : 'Save Job'}</button>`}
    `;

    if (isSavedPage) {
      const unsaveBtn = jobDiv.querySelector(".unsaveBtn");
      unsaveBtn.addEventListener("click", () => {
        savedJobs = savedJobs.filter(id => id !== job.id);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        const savedList = data.filter(j => savedJobs.includes(j.id));
        renderJobs(savedList);
      });
    } else {
      const saveBtn = jobDiv.querySelector(".saveBtn");
      saveBtn.addEventListener("click", () => {
        if (!isSaved) {
          savedJobs.push(job.id);
          localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
          alert("Pekerjaan telah disimpan! Lihat di halaman Saved Jobs.");
          renderJobs(jobs);
        }
      });
    }

    jobList.appendChild(jobDiv);
  });
}


function filterJobs() {
  const [titleInput, companyInput, locationInput] = inputs;
  const selectedType = typeSelect.value;
  const keyword = titleInput.value.trim().toLowerCase();
  const company = companyInput.value.trim().toLowerCase();
  const location = locationInput.value.trim().toLowerCase();

  const filtered = data.filter((job) => {
    return (
      (!keyword || job.title.toLowerCase().includes(keyword)) &&
      (!company || job.company.toLowerCase().includes(company)) &&
      (!location || job.location.toLowerCase().includes(location)) &&
      (!selectedType || job.type === selectedType)
    );
  });

  renderJobs(filtered);
}

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filterJobs();
  });

  typeSelect.addEventListener("change", filterJobs);

  document.querySelector(".text-slate-500.font-semibold.cursor-pointer")?.addEventListener("click", () => {
    inputs.forEach((input) => (input.value = ""));
    typeSelect.selectedIndex = 0;
    filterJobs();
  });

  clearButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      inputs[idx].value = "";
      filterJobs();
    });
  });
}

// Menentukan tampilan awal
if (isSavedPage) {
  const savedList = data.filter((job) => savedJobs.includes(job.id));
  renderJobs(savedList);
} else {
  renderJobs(data);
}


let tipIndex = 0;
const tipsCarousel = document.getElementById("tipsCarousel");
const totalCards = tipsCarousel.children.length;
const cardsPerView = 1

function autoSlideTips() {
  tipIndex = (tipIndex + 1) % Math.ceil(totalCards / cardsPerView);
  const offset = tipIndex * 200 * cardsPerView; 
  tipsCarousel.style.transform = `translateX(-${offset}px)`;
}

setInterval(autoSlideTips, 2000);
if (window.location.pathname.includes("saved.html")) {
  const savedList = data.filter((job) => savedJobs.includes(job.id));
  renderJobs(savedList);
}

