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
    title: "원국과 대운 세운의 천간합의 해석",
    desc: "원국과 대운, 세운이 만날 때 천간합을 어떻게 읽고 실제 상담 해석으로 연결하는지 다룹니다.",
    items: ["원국에서 천간합을 보는 기준", "대운과 세운이 들어올 때의 작용", "상담 현장에서 활용하는 해석 포인트"],
    vimeoId: "882311651",
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

const heavenlyStems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const earthlyBranches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const stemElements = ["목", "목", "화", "화", "토", "토", "금", "금", "수", "수"];
const branchElements = ["수", "토", "목", "목", "토", "화", "화", "토", "금", "금", "토", "수"];
const hiddenStems = {
  자: ["계"],
  축: ["기", "계", "신"],
  인: ["갑", "병", "무"],
  묘: ["을"],
  진: ["무", "을", "계"],
  사: ["병", "무", "경"],
  오: ["정", "기"],
  미: ["기", "정", "을"],
  신: ["경", "임", "무"],
  유: ["신"],
  술: ["무", "신", "정"],
  해: ["임", "갑"],
};
const elementCycle = {
  목: { supports: "화", controls: "토", supportedBy: "수", controlledBy: "금" },
  화: { supports: "토", controls: "금", supportedBy: "목", controlledBy: "수" },
  토: { supports: "금", controls: "수", supportedBy: "화", controlledBy: "목" },
  금: { supports: "수", controls: "목", supportedBy: "토", controlledBy: "화" },
  수: { supports: "목", controls: "화", supportedBy: "금", controlledBy: "토" },
};
const dayMasterTraits = {
  갑: "큰 나무처럼 바로 서려는 기운이 있어, 방향이 정해지면 밀고 나가는 힘이 있습니다.",
  을: "풀과 꽃처럼 환경을 읽고 적응하는 기운이 있어, 관계와 분위기의 영향을 많이 받습니다.",
  병: "태양처럼 드러내고 밝히는 기운이 있어, 인정과 표현이 삶의 중요한 동력이 됩니다.",
  정: "등불처럼 필요한 곳을 비추는 기운이 있어, 세밀한 판단과 꾸준함이 강점입니다.",
  무: "큰 산처럼 중심을 잡는 기운이 있어, 쉽게 흔들리지 않지만 변화에는 시간이 필요합니다.",
  기: "논밭처럼 받아들이고 길러내는 기운이 있어, 현실 감각과 돌봄의 힘이 있습니다.",
  경: "큰 쇠처럼 결단하고 정리하는 기운이 있어, 기준이 분명할 때 능력이 살아납니다.",
  신: "보석처럼 정교하고 예민한 기운이 있어, 완성도와 섬세함이 강점입니다.",
  임: "큰 물처럼 넓게 흐르는 기운이 있어, 이동과 확장, 정보의 흐름에 밝습니다.",
  계: "비와 안개처럼 스며드는 기운이 있어, 직감과 관찰력이 깊게 작용합니다.",
};
const concernGuides = {
  이직: {
    reality: "이직은 현재 전장에서 후퇴하는 문제가 아니라 전장을 바꾸는 작전입니다. 감정, 조건, 성장 가능성을 분리해야 합니다.",
    strategy: "퇴사 결론보다 탐색 작전을 먼저 세우십시오. 현재 직장의 리스크를 숫자로 정리하고, 새 자리의 조건을 검증한 뒤 움직이는 편이 좋습니다.",
    quest: "오늘 채용공고 3개를 저장하고, 각 공고의 연봉·역할·위험요소를 한 줄씩 적기",
  },
  직업: {
    reality: "직업은 일간의 쓰임과 월지의 현실 환경이 맞을 때 오래 갑니다. 잘하는 일과 버틸 수 있는 일을 나누어 봐야 합니다.",
    strategy: "직무의 이름보다 반복되는 하루를 보십시오. 기운이 소모되는 업무와 성과가 나는 업무를 분리해 다음 방향을 잡으십시오.",
    quest: "오늘 현재 업무 5개를 적고, 에너지가 생기는 일과 빠지는 일을 각각 표시하기",
  },
  재물: {
    reality: "재물은 크게 얻는 운보다 새는 흐름을 막는 작전이 먼저입니다. 수입, 지출, 약속, 투자 리스크를 분리해야 합니다.",
    strategy: "공격보다 방어를 먼저 세우십시오. 현금 흐름을 확인한 뒤 남는 힘으로 확장해야 합니다.",
    quest: "오늘 이번 달 고정지출 5개와 줄일 수 있는 지출 1개를 적기",
  },
  관계: {
    reality: "관계는 합과 충의 전장입니다. 상대를 바꾸는 전략보다 내가 감당할 거리와 말의 순서를 정하는 전략이 먼저입니다.",
    strategy: "감정이 큰 날에는 결론을 내리지 마십시오. 핵심 요청 하나만 정하고 짧고 분명하게 말하는 편이 좋습니다.",
    quest: "오늘 상대에게 요구하고 싶은 것 1개와 내가 양보 가능한 것 1개를 적기",
  },
  건강: {
    reality: "건강은 전장의 보급선입니다. 몸이 흔들리면 판단도 흔들립니다. 사주는 경향을 볼 뿐 진단을 대신하지 않습니다.",
    strategy: "무리하게 버티는 전략보다 회복 루틴을 먼저 세우십시오. 증상이 지속되면 의료기관 확인이 우선입니다.",
    quest: "오늘 수면시간, 식사, 통증·피로 상태를 각각 한 줄로 기록하기",
  },
  학업: {
    reality: "학업과 진로는 속도의 싸움이 아니라 집중을 유지할 수 있는 전장 선택입니다. 비교가 커지면 지휘권을 잃습니다.",
    strategy: "남의 길보다 내 일간이 오래 견디는 과목과 환경을 찾으십시오. 작은 성취를 반복해야 합니다.",
    quest: "오늘 25분 집중 공부 1회 실행하고, 끝난 뒤 어려웠던 부분 1개 적기",
  },
  사업: {
    reality: "사업은 재성만의 문제가 아닙니다. 사람, 계약, 현금 흐름, 시기가 동시에 움직이는 전장입니다.",
    strategy: "크게 벌리기보다 작게 검증하십시오. 약속은 문서로 남기고, 숫자가 확인되기 전 확장은 늦추는 편이 좋습니다.",
    quest: "오늘 고객 1명에게 실제 구매 의사를 확인할 질문 3개 작성하기",
  },
  기타: {
    reality: "고민은 하나처럼 보여도 마음, 사람, 돈, 시기의 문제가 섞여 있습니다. 먼저 전장을 나누어야 합니다.",
    strategy: "가장 급한 문제와 가장 중요한 문제를 분리하십시오. 오늘 움직일 수 있는 작은 작전부터 세우는 것이 좋습니다.",
    quest: "오늘 고민을 마음·돈·사람·시간 네 칸으로 나누어 한 줄씩 적기",
  },
};

const concernForm = document.querySelector("#concernForm");
const concernButton = document.querySelector("#makeConcernAnswer");
const concernAnswer = document.querySelector("#concernAnswer");
const concernCopyButton = document.querySelector("#copyConcernAnswer");
const concernStatus = document.querySelector("#concernStatus");

function getJdn(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function getPillar(index) {
  const normalized = ((index % 60) + 60) % 60;
  return {
    stem: heavenlyStems[normalized % 10],
    branch: earthlyBranches[normalized % 12],
    label: `${heavenlyStems[normalized % 10]}${earthlyBranches[normalized % 12]}`,
  };
}

function getYearPillar(year, month, day) {
  const solarYear = month < 2 || (month === 2 && day < 4) ? year - 1 : year;
  return getPillar(solarYear - 4);
}

function getMonthInfo(month, day) {
  const points = [
    { month: 12, day: 7, branchIndex: 0, order: 10, name: "자월" },
    { month: 11, day: 7, branchIndex: 11, order: 9, name: "해월" },
    { month: 10, day: 8, branchIndex: 10, order: 8, name: "술월" },
    { month: 9, day: 8, branchIndex: 9, order: 7, name: "유월" },
    { month: 8, day: 8, branchIndex: 8, order: 6, name: "신월" },
    { month: 7, day: 7, branchIndex: 7, order: 5, name: "미월" },
    { month: 6, day: 6, branchIndex: 6, order: 4, name: "오월" },
    { month: 5, day: 6, branchIndex: 5, order: 3, name: "사월" },
    { month: 4, day: 5, branchIndex: 4, order: 2, name: "진월" },
    { month: 3, day: 6, branchIndex: 3, order: 1, name: "묘월" },
    { month: 2, day: 4, branchIndex: 2, order: 0, name: "인월" },
    { month: 1, day: 6, branchIndex: 1, order: 11, name: "축월" },
  ];
  return points.find((point) => month > point.month || (month === point.month && day >= point.day)) || {
    branchIndex: 0,
    order: 10,
    name: "자월",
  };
}

function getMonthPillar(yearStemIndex, month, day) {
  const monthInfo = getMonthInfo(month, day);
  const firstMonthStemByYearStem = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const stemIndex = (firstMonthStemByYearStem[yearStemIndex] + monthInfo.order) % 10;
  return {
    stem: heavenlyStems[stemIndex],
    branch: earthlyBranches[monthInfo.branchIndex],
    label: `${heavenlyStems[stemIndex]}${earthlyBranches[monthInfo.branchIndex]}`,
    monthName: monthInfo.name,
  };
}

function getDayPillar(year, month, day) {
  return getPillar(getJdn(year, month, day) + 49);
}

function getHourPillar(dayStemIndex, hour) {
  const branchIndex = hour === 23 ? 0 : Math.floor((hour + 1) / 2) % 12;
  const firstHourStemByDayStem = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const stemIndex = (firstHourStemByDayStem[dayStemIndex] + branchIndex) % 10;
  return {
    stem: heavenlyStems[stemIndex],
    branch: earthlyBranches[branchIndex],
    label: `${heavenlyStems[stemIndex]}${earthlyBranches[branchIndex]}`,
  };
}

function makeFourPillars(dateValue, timeValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour, minute] = timeValue.split(":").map(Number);
  const yearPillar = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(heavenlyStems.indexOf(yearPillar.stem), month, day);
  const dayPillar = getDayPillar(year, month, day);
  const hourPillar = getHourPillar(heavenlyStems.indexOf(dayPillar.stem), hour);

  return { year, month, day, hour, minute, yearPillar, monthPillar, dayPillar, hourPillar };
}

function getSeasonFlow(monthBranch) {
  if (["인", "묘"].includes(monthBranch)) return "월령은 목 기운이 살아나는 봄의 자리라 시작, 성장, 방향 설정이 중요합니다.";
  if (["사", "오"].includes(monthBranch)) return "월령은 화 기운이 왕한 자리라 드러남, 판단, 속도가 강해지기 쉽습니다.";
  if (["신", "유"].includes(monthBranch)) return "월령은 금 기운이 강한 자리라 정리, 기준, 결단의 힘이 중요합니다.";
  if (["해", "자"].includes(monthBranch)) return "월령은 수 기운이 깊은 자리라 생각, 이동, 정보, 준비의 흐름이 강합니다.";
  return "월령은 토 기운의 전환 자리라 현실 점검, 균형, 마무리와 다음 준비가 중요합니다.";
}

function getElementCounts(pillars) {
  const counts = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  [pillars.yearPillar, pillars.monthPillar, pillars.dayPillar, pillars.hourPillar].forEach((pillar) => {
    counts[stemElements[heavenlyStems.indexOf(pillar.stem)]] += 1;
    counts[branchElements[earthlyBranches.indexOf(pillar.branch)]] += 1;
    hiddenStems[pillar.branch].forEach((stem) => {
      counts[stemElements[heavenlyStems.indexOf(stem)]] += 0.5;
    });
  });
  return counts;
}

function formatElementCounts(counts) {
  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1])
    .map(([element, count]) => `${element} ${count}`)
    .join(" / ");
}

function getElementBalance(counts, dayElement) {
  const sorted = Object.entries(counts).sort((left, right) => right[1] - left[1]);
  const strongElements = sorted.filter(([, count]) => count >= sorted[0][1] - 0.5).map(([element]) => element);
  const weakElements = sorted.filter(([, count]) => count <= sorted[sorted.length - 1][1] + 0.5).map(([element]) => element);
  const daySupport = counts[dayElement] + counts[elementCycle[dayElement].supportedBy];
  const pressure = counts[elementCycle[dayElement].controlledBy] + counts[elementCycle[dayElement].controls];
  const strength = daySupport >= pressure ? "중심을 세울 힘이 있는 편" : "외부 요구와 현실 압박을 먼저 관리해야 하는 편";
  const useful = daySupport >= pressure
    ? [elementCycle[dayElement].controls, elementCycle[dayElement].supports]
    : [elementCycle[dayElement].supportedBy, dayElement];
  const enemy = daySupport >= pressure
    ? [dayElement, elementCycle[dayElement].supportedBy]
    : [elementCycle[dayElement].controlledBy, elementCycle[dayElement].controls];

  return { strongElements, weakElements, strength, useful, enemy };
}

function getHiddenStemText(pillars) {
  return [
    `년지 ${pillars.yearPillar.branch}: ${hiddenStems[pillars.yearPillar.branch].join(", ")}`,
    `월지 ${pillars.monthPillar.branch}: ${hiddenStems[pillars.monthPillar.branch].join(", ")}`,
    `일지 ${pillars.dayPillar.branch}: ${hiddenStems[pillars.dayPillar.branch].join(", ")}`,
    `시지 ${pillars.hourPillar.branch}: ${hiddenStems[pillars.hourPillar.branch].join(", ")}`,
  ].join(" / ");
}

function getStemCombos(pillars) {
  const comboPairs = {
    갑: "기",
    기: "갑",
    을: "경",
    경: "을",
    병: "신",
    신: "병",
    정: "임",
    임: "정",
    무: "계",
    계: "무",
  };
  const stems = [
    ["년간", pillars.yearPillar.stem],
    ["월간", pillars.monthPillar.stem],
    ["일간", pillars.dayPillar.stem],
    ["시간", pillars.hourPillar.stem],
  ];
  const combos = [];

  stems.forEach(([leftName, leftStem], leftIndex) => {
    stems.slice(leftIndex + 1).forEach(([rightName, rightStem]) => {
      if (comboPairs[leftStem] === rightStem) combos.push(`${leftName} ${leftStem}과 ${rightName} ${rightStem}`);
    });
  });

  return combos;
}

function getBranchClashes(pillars) {
  const clashPairs = {
    자: "오",
    오: "자",
    축: "미",
    미: "축",
    인: "신",
    신: "인",
    묘: "유",
    유: "묘",
    진: "술",
    술: "진",
    사: "해",
    해: "사",
  };
  const branches = [
    ["년지", pillars.yearPillar.branch],
    ["월지", pillars.monthPillar.branch],
    ["일지", pillars.dayPillar.branch],
    ["시지", pillars.hourPillar.branch],
  ];
  const clashes = [];

  branches.forEach(([leftName, leftBranch], leftIndex) => {
    branches.slice(leftIndex + 1).forEach(([rightName, rightBranch]) => {
      if (clashPairs[leftBranch] === rightBranch) clashes.push(`${leftName} ${leftBranch}와 ${rightName} ${rightBranch}`);
    });
  });

  return clashes;
}

function getAnnualLuck(year) {
  const pillar = getYearPillar(year, 7, 15);
  return { year, ...pillar };
}

function getLuckCycleNote(gender, yearPillar) {
  if (gender === "미입력") return "대운은 성별과 절입 기준을 함께 보아 순행·역행을 정해야 하므로, 간편판에서는 원국과 세운 중심으로 전략을 세웁니다.";
  const yearStemIndex = heavenlyStems.indexOf(yearPillar.stem);
  const isYangYear = yearStemIndex % 2 === 0;
  const direction = (gender === "남성" && isYangYear) || (gender === "여성" && !isYangYear) ? "순행" : "역행";
  return `대운 방향은 간편 기준으로 ${direction} 성향입니다. 정확한 대운 시작 나이는 절입 시각 계산이 필요하므로, 여기서는 현재 원국과 세운 활성만 전략에 반영합니다.`;
}

function getStoredConsultMemory() {
  try {
    return JSON.parse(localStorage.getItem("sajuwarConsultMemory") || "[]");
  } catch {
    return [];
  }
}

function saveConsultMemory(entry) {
  try {
    const memory = getStoredConsultMemory();
    memory.unshift(entry);
    localStorage.setItem("sajuwarConsultMemory", JSON.stringify(memory.slice(0, 5)));
  } catch {
    return false;
  }
  return true;
}

function getRealityQuestions(type) {
  const common = [
    "현재 직업 또는 주요 역할은 무엇입니까?",
    "이번 결정을 언제까지 해야 합니까?",
    "가장 두려운 손실은 돈, 관계, 시간, 건강 중 무엇입니까?",
  ];
  const byType = {
    이직: ["현재 연봉과 원하는 연봉 범위는 어느 정도입니까?", "이미 지원한 회사나 제안받은 자리가 있습니까?"],
    직업: ["현재 업무에서 가장 성과가 나는 일은 무엇입니까?", "반대로 가장 에너지가 빠지는 일은 무엇입니까?"],
    재물: ["월 고정수입과 고정지출은 어느 정도입니까?", "투자, 대출, 동업 같은 위험 노출이 있습니까?"],
    관계: ["상대와의 관계는 배우자, 연인, 가족, 직장 중 어디에 해당합니까?", "갈등이 반복되는 핵심 주제는 무엇입니까?"],
    건강: ["현재 불편한 증상은 언제부터 이어졌습니까?", "이미 병원 검진이나 상담을 받은 적이 있습니까?"],
    학업: ["현재 학년 또는 준비 중인 시험은 무엇입니까?", "가장 약한 과목과 가장 오래 집중 가능한 과목은 무엇입니까?"],
    사업: ["현재 매출, 비용, 고객 수는 어느 정도입니까?", "동업자나 계약 관계가 있습니까?"],
    기타: ["이 고민이 가장 크게 영향을 주는 영역은 어디입니까?", "이미 시도했지만 실패한 방법이 있습니까?"],
  };
  return [...(byType[type] || byType.기타), ...common].slice(0, 5);
}

function getRealityDepth(reality, goal) {
  const combined = `${reality} ${goal}`.trim();
  if (!combined) return 0;
  const signals = ["연봉", "수입", "지출", "기간", "개월", "년", "회사", "직무", "가족", "배우자", "자녀", "사업", "매출", "건강", "병원", "목표", "계획"];
  const signalCount = signals.filter((signal) => combined.includes(signal)).length;
  return combined.length + signalCount * 20;
}

function getSocraticNotice(type, reality, goal) {
  if (getRealityDepth(reality, goal) >= 90) return [];
  return [
    "소크라테스 모드",
    "현실 정보가 아직 부족합니다. 중요한 조언은 질문 없이 단정하지 않습니다.",
    "아래 질문에 답하면 전략 정확도가 올라갑니다.",
    ...getRealityQuestions(type).map((question, index) => `${index + 1}. ${question}`),
    "",
  ];
}

function makeConcernAnswer(type, gender, memo, reality, goal, pillars) {
  const guide = concernGuides[type] || concernGuides.기타;
  const trimmedMemo = memo.trim();
  const shortMemo = trimmedMemo.length > 120 ? `${trimmedMemo.slice(0, 120)}...` : trimmedMemo;
  const realityText = reality.trim() || "구체적인 현실 정보가 부족합니다. 전략 정확도를 높이려면 직업, 돈, 관계, 건강, 목표 상태를 더 적어야 합니다.";
  const goalText = goal.trim() || "목표가 아직 명확하지 않습니다. 오늘의 퀘스트는 목표를 작게 정의하는 것부터 시작합니다.";
  const dayStem = pillars.dayPillar.stem;
  const dayElement = stemElements[heavenlyStems.indexOf(dayStem)];
  const monthElement = branchElements[earthlyBranches.indexOf(pillars.monthPillar.branch)];
  const counts = getElementCounts(pillars);
  const balance = getElementBalance(counts, dayElement);
  const stemCombos = getStemCombos(pillars);
  const branchClashes = getBranchClashes(pillars);
  const annualLuck = getAnnualLuck(new Date().getFullYear());
  const socraticNotice = getSocraticNotice(type, reality, goal);
  const comboText = stemCombos.length
    ? `천간합: ${stemCombos.join(", ")}. 합은 의지와 현실이 묶이는 자리이며, 조건이 맞을 때 행동의 방향을 바꿉니다.`
    : "천간합이 뚜렷하게 드러나지는 않으므로, 합보다 월령과 일간의 힘을 먼저 보아야 합니다.";
  const clashText = branchClashes.length
    ? `지지충: ${branchClashes.join(", ")}. 충은 무조건 나쁜 것이 아니라 전장의 이동, 갈등, 결단 압력으로 봅니다.`
    : "지지충이 강하게 드러나지는 않으므로, 급한 충돌보다 내적 균형과 현실 조건을 먼저 봅니다.";
  const lateHourNote = pillars.hour === 23 ? "\n※ 23시 이후 출생은 상담 시 야자시 적용 여부를 함께 확인하는 것이 좋습니다." : "";
  const memorySaved = saveConsultMemory({
    birthDate: `${pillars.year}-${String(pillars.month).padStart(2, "0")}-${String(pillars.day).padStart(2, "0")}`,
    birthTime: `${String(pillars.hour).padStart(2, "0")}:${String(pillars.minute).padStart(2, "0")}`,
    gender,
    concernType: type,
    goal: goalText,
    createdAt: new Date().toISOString(),
  });

  return [
    "[쭈쌤의 사주전쟁]",
    "",
    ...socraticNotice,
    "[사주 분석]",
    "① 전장 분석",
    `생년월일시: ${pillars.year}년 ${pillars.month}월 ${pillars.day}일 ${String(pillars.hour).padStart(2, "0")}:${String(pillars.minute).padStart(2, "0")} 양력`,
    `성별: ${gender}`,
    `년주: ${pillars.yearPillar.label}`,
    `월주: ${pillars.monthPillar.label} (${pillars.monthPillar.monthName})`,
    `일주: ${pillars.dayPillar.label}`,
    `시주: ${pillars.hourPillar.label}`,
    `지장간: ${getHiddenStemText(pillars)}`,
    lateHourNote,
    "",
    "원국은 전장이고 일간은 지휘관입니다. 이 명식의 지휘관은 일간 " + dayStem + dayElement + "입니다. " + dayMasterTraits[dayStem],
    "",
    "② 계절 분석",
    getSeasonFlow(pillars.monthPillar.branch),
    `월지의 중심 기운은 ${monthElement}로 보며, 고민은 이 월령의 환경 안에서 일간이 어떻게 쓰이는지를 먼저 봅니다.`,
    "",
    "③ 오행 전쟁",
    `오행 분포: ${formatElementCounts(counts)}`,
    `강한 오행: ${balance.strongElements.join(", ")}`,
    `약한 오행: ${balance.weakElements.join(", ")}`,
    `일간 상태: ${balance.strength}`,
    `용신 후보: ${balance.useful.join(", ")} / 기신 주의: ${balance.enemy.join(", ")}`,
    comboText,
    clashText,
    "",
    "④ 현재 운의 변화",
    getLuckCycleNote(gender, pillars.yearPillar),
    `올해 세운: ${annualLuck.year}년 ${annualLuck.label}. 세운은 원국의 약한 부분을 자극하거나 강한 부분을 더 키우는 외부 전장입니다.`,
    `세운 천간은 ${annualLuck.stem}(${stemElements[heavenlyStems.indexOf(annualLuck.stem)]}), 지지는 ${annualLuck.branch}(${branchElements[earthlyBranches.indexOf(annualLuck.branch)]})입니다. 올해는 ${stemElements[heavenlyStems.indexOf(annualLuck.stem)]}·${branchElements[earthlyBranches.indexOf(annualLuck.branch)]} 기운이 현실 사건을 통해 활성화됩니다.`,
    "",
    "[현실 분석]",
    "⑤ 현실에서의 의미",
    `고민 분야: ${type}`,
    `사용자 고민: ${shortMemo}`,
    `현재 현실: ${realityText}`,
    `원하는 목표: ${goalText}`,
    "",
    guide.reality,
    "사주는 결론을 대신 내려주는 도구가 아닙니다. 현실 자료가 부족하면 전략도 흐려집니다. 출생 정보는 지도이고, 현재 조건은 실제 전장입니다.",
    "",
    "확인이 필요한 것",
    "아래 내용은 사용자가 직접 확인해야 하는 현실 정보입니다.",
    ...getRealityQuestions(type).slice(0, 3).map((question) => `- ${question}`),
    "",
    "[전략 제안]",
    "⑥ 전략",
    guide.strategy,
    "1. 감정과 사실을 분리하십시오.",
    "2. 당장 결정할 일과 검증할 일을 나누십시오.",
    `3. 용신 후보인 ${balance.useful.join(", ")}의 방식으로 움직이십시오. 즉, 나를 살리는 환경과 행동을 먼저 확보해야 합니다.`,
    "4. 기신으로 작동하기 쉬운 요소는 과잉 반응, 무리한 확장, 준비 없는 결론으로 나타날 수 있으니 속도를 조절하십시오.",
    "",
    "⑦ 오늘의 퀘스트",
    guide.quest,
    "기한: 내일 밤 9시",
    "성공 기준: 메모 또는 파일로 결과가 남아 있을 것",
    "",
    "⑧ 메모리 업데이트",
    memorySaved ? "저장됨: 생년월일시, 성별, 고민 분야, 목표가 이 브라우저에 구조화되어 저장되었습니다." : "저장 안 됨: 브라우저 저장소를 사용할 수 없어 이번 상담 내용은 화면에만 표시됩니다.",
    "다음 상담에서는 오늘의 퀘스트를 완료했는지 먼저 점검하는 것이 좋습니다.",
    "",
    "주의: 이 결과는 운명을 예언하지 않습니다. 사주는 전략 지도이고, 결정과 실행의 지휘권은 사용자에게 있습니다.",
  ].join("\n");
}

if (concernForm && concernButton && concernAnswer) {
  concernButton.addEventListener("click", () => {
    const data = new FormData(concernForm);
    const birthDate = data.get("birthDate") || "";
    const birthTime = data.get("birthTime") || "";
    const type = data.get("concernType") || "기타";
    const gender = data.get("gender") || "미입력";
    const memo = data.get("concernMemo")?.trim() || "";
    const reality = data.get("realityMemo")?.trim() || "";
    const goal = data.get("goalMemo")?.trim() || "";

    if (!birthDate || !birthTime) {
      concernAnswer.value = "";
      if (concernStatus) concernStatus.textContent = "생년월일과 태어난 시간을 먼저 입력해 주세요.";
      return;
    }

    if (!memo) {
      concernAnswer.value = "";
      if (concernStatus) concernStatus.textContent = "고민 내용을 먼저 입력해 주세요.";
      return;
    }

    concernAnswer.value = makeConcernAnswer(type, gender, memo, reality, goal, makeFourPillars(birthDate, birthTime));
    if (concernStatus) concernStatus.textContent = "사주전쟁 결과가 정리되었습니다.";
  });
}

if (concernCopyButton && concernAnswer) {
  concernCopyButton.addEventListener("click", async () => {
    if (!concernAnswer.value.trim()) {
      if (concernStatus) concernStatus.textContent = "복사할 상담 답변이 없습니다.";
      return;
    }

    try {
      await navigator.clipboard.writeText(concernAnswer.value);
      if (concernStatus) concernStatus.textContent = "상담 답변이 복사되었습니다.";
    } catch {
      if (concernStatus) concernStatus.textContent = "답변을 선택해 직접 복사해 주세요.";
    }
  });
}
