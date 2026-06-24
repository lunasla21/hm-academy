const courses = {
  heavenly: {
    title: "천간론",
    desc: "십천간의 성정과 작용을 이해하고 원국 해석의 기본 언어를 정리합니다.",
    items: ["갑을병정무기경신임계의 기본 성정", "천간의 생극과 조합", "실제 원국에서 천간을 읽는 기준"],
    vimeoId: "",
  },
  earthly: {
    title: "지지론",
    desc: "십이지지와 지장간, 합충형파해를 통해 땅의 흐름과 사건의 작용을 배웁니다.",
    items: ["십이지지의 기본 성질", "지장간과 계절의 흐름", "합충형파해의 실제 적용"],
    vimeoId: "",
  },
  chart: {
    title: "원국분석",
    desc: "사주 원국의 구조를 읽고 격, 조후, 균형을 판단하는 분석 과정을 다룹니다.",
    items: ["일간 중심의 원국 파악", "격국과 조후 판단", "신강신약과 균형 분석"],
    vimeoId: "",
  },
  yearly: {
    title: "세운분석",
    desc: "해마다 들어오는 운의 작용을 읽고 시기별 변화와 상담 포인트를 정리합니다.",
    items: ["세운의 기본 작용", "대운과 세운의 관계", "연도별 변화 해석"],
    vimeoId: "",
  },
  naming: {
    title: "작명강의",
    desc: "명리 원리를 바탕으로 이름의 기운을 분석하고 작명의 기준을 세웁니다.",
    items: ["사주와 이름의 관계", "오행 균형을 고려한 작명", "이름 분석 실전 기준"],
    vimeoId: "",
  },
  business: {
    title: "창업반 강의",
    desc: "사업과 직업의 방향, 창업 시기, 재물 흐름을 상담 관점에서 해석합니다.",
    items: ["창업 적성과 방향", "사업운과 재물 흐름", "창업 시기 판단"],
    vimeoId: "",
  },
  "practice-yearly": {
    title: "실전 세운 풀이 강의",
    desc: "실제 사례를 중심으로 세운을 어떻게 읽고 상담 언어로 풀어낼지 훈련합니다.",
    items: ["실제 사례별 세운 풀이", "상담 질문별 해석 구조", "연도별 핵심 포인트 정리"],
    vimeoId: "",
  },
};

const title = document.querySelector("#courseTitle");
const desc = document.querySelector("#courseDesc");
const list = document.querySelector("#courseList");
const placeholder = document.querySelector("#vimeoPlaceholder");
const embed = document.querySelector("#vimeoEmbed");
const cards = document.querySelectorAll(".lecture-card");

function renderCourse(courseKey) {
  const course = courses[courseKey];

  title.textContent = course.title;
  desc.textContent = course.desc;
  list.innerHTML = course.items.map((item) => `<li>${item}</li>`).join("");

  if (course.vimeoId) {
    embed.hidden = false;
    placeholder.hidden = true;
    embed.innerHTML = `
      <iframe
        src="https://player.vimeo.com/video/${course.vimeoId}"
        title="${course.title}"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
  } else {
    embed.hidden = true;
    placeholder.hidden = false;
    embed.innerHTML = "";
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    renderCourse(card.dataset.course);
  });
});

const namingForm = document.querySelector("#namingForm");
const namingButton = document.querySelector("#makeNamingMessage");
const namingMessage = document.querySelector("#namingMessage");
const copyStatus = document.querySelector("#copyStatus");

if (namingForm && namingButton && namingMessage) {
  namingButton.addEventListener("click", async () => {
    const data = new FormData(namingForm);
    const get = (name) => data.get(name)?.trim() || "미입력";
    const message = [
      "[현명 원장님 유료 작명 신청]",
      `신청자 이름: ${get("applicant")}`,
      `연락처: ${get("phone")}`,
      `작명 대상: ${get("target")}`,
      `성별: ${get("gender")}`,
      `생년월일: ${get("birthDate")}`,
      `태어난 시간: ${get("birthTime")}`,
      `요청사항: ${get("memo")}`,
      "",
      "확인 후 작명 상담 안내 부탁드립니다.",
    ].join("\n");

    namingMessage.value = message;

    try {
      await navigator.clipboard.writeText(message);
      if (copyStatus) copyStatus.textContent = "신청 내용이 복사되었습니다. 문자 문의에 붙여넣어 보내주세요.";
    } catch {
      if (copyStatus) copyStatus.textContent = "신청 내용이 정리되었습니다. 내용을 선택해 복사한 뒤 문자로 보내주세요.";
    }
  });
}
