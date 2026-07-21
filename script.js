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
  이직: "직업 자리를 옮기는 문제는 월지의 현실 자리와 세운의 변화 신호를 함께 보아야 합니다. 지금 고민은 불편함만 보고 움직일 일이 아니라, 내 일간이 감당할 수 있는 자리인지 따져야 합니다.",
  직업: "직업운은 일간의 쓰임과 월지의 환경을 같이 봅니다. 잘하는 일과 오래 버틸 수 있는 일이 다를 수 있으니, 반복해도 기운이 꺾이지 않는 방향을 잡는 것이 중요합니다.",
  재물: "재물운은 들어오는 돈보다 새는 흐름을 먼저 봅니다. 재성의 문제는 욕심을 키우기보다 현실의 수입, 지출, 약속을 정리할 때 안정됩니다.",
  관계: "관계운은 합과 충의 흐름을 봅니다. 마음이 앞설 때는 말이 커지기 쉬우므로, 상대를 바꾸려 하기보다 내가 감당할 거리와 기준을 먼저 세워야 합니다.",
  건강: "건강운은 오행의 치우침과 생활 리듬을 함께 봅니다. 몸이 흔들리면 판단도 흐려지므로, 무리해서 버티기보다 회복의 순서를 세우는 것이 먼저입니다.",
  학업: "학업과 진로는 일간의 성향과 인성, 식상의 쓰임을 봅니다. 비교가 커질수록 흔들리니, 오래 집중할 수 있는 공부 방향을 잡는 것이 좋습니다.",
  사업: "사업과 창업은 재성만 보지 않고 사람, 시기, 계약의 흐름을 함께 봅니다. 크게 벌리기보다 작게 검증하고 숫자로 확인하는 과정이 필요합니다.",
  기타: "고민은 겉으로 하나처럼 보여도 안에는 시기, 사람, 마음의 문제가 함께 들어 있습니다. 지금은 무엇을 먼저 정리해야 하는지 순서를 잡는 것이 중요합니다.",
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

function makeConcernAnswer(type, gender, memo, pillars) {
  const guide = concernGuides[type] || concernGuides.기타;
  const trimmedMemo = memo.trim();
  const shortMemo = trimmedMemo.length > 120 ? `${trimmedMemo.slice(0, 120)}...` : trimmedMemo;
  const dayStem = pillars.dayPillar.stem;
  const dayElement = stemElements[heavenlyStems.indexOf(dayStem)];
  const monthElement = branchElements[earthlyBranches.indexOf(pillars.monthPillar.branch)];
  const stemCombos = getStemCombos(pillars);
  const comboText = stemCombos.length
    ? `천간합은 ${stemCombos.join(", ")}에서 보입니다. 현명역학원식으로는 이 합을 단순한 좋고 나쁨이 아니라, 마음이 묶이는 자리와 현실에서 움직이는 변곡점으로 봅니다.`
    : "천간합이 뚜렷하게 드러나지는 않으므로, 합보다 월령과 일간의 힘을 먼저 보아야 합니다.";
  const lateHourNote = pillars.hour === 23 ? "\n※ 23시 이후 출생은 상담 시 야자시 적용 여부를 함께 확인하는 것이 좋습니다." : "";

  return [
    "[현명역학원 고민 상담]",
    "",
    "간편 만세력",
    `생년월일시: ${pillars.year}년 ${pillars.month}월 ${pillars.day}일 ${String(pillars.hour).padStart(2, "0")}:${String(pillars.minute).padStart(2, "0")} 양력`,
    `성별: ${gender}`,
    `년주: ${pillars.yearPillar.label}`,
    `월주: ${pillars.monthPillar.label} (${pillars.monthPillar.monthName})`,
    `일주: ${pillars.dayPillar.label}`,
    `시주: ${pillars.hourPillar.label}`,
    lateHourNote,
    "",
    `고민 분야: ${type}`,
    "",
    "현명역학원식 풀이",
    `이 사주는 일간이 ${dayStem}${dayElement}입니다. ${dayMasterTraits[dayStem]}`,
    getSeasonFlow(pillars.monthPillar.branch),
    `월지의 중심 기운은 ${monthElement}로 보며, 고민은 이 월령의 환경 안에서 일간이 어떻게 쓰이는지를 먼저 봅니다.`,
    comboText,
    "",
    `말씀하신 내용: ${shortMemo}`,
    "",
    guide,
    "",
    "상담 결과",
    "1. 지금의 고민은 감정만의 문제가 아니라, 내 사주의 중심 기운이 현재 환경과 맞는지 확인하라는 신호입니다.",
    "2. 월주가 보여주는 현실 자리와 일주가 보여주는 나의 중심을 나누어 보면, 답은 서두름보다 준비의 순서에서 나옵니다.",
    "3. 큰 선택은 한 번에 결론 내리지 말고 조건, 사람, 돈, 건강의 네 가지를 나누어 확인하십시오.",
    "",
    "최종 조언",
    "운은 억지로 끌고 가는 것이 아니라 때를 읽고 쓰는 것입니다. 지금은 내 마음이 흔들리는 이유와 현실에서 움직일 수 있는 조건을 분리해 보아야 합니다. 준비가 된 선택은 길이 되고, 준비 없는 선택은 같은 고민을 반복하게 만듭니다.",
    "",
    "정확한 대운·세운·월운 풀이는 원장님 상담에서 생년월일시와 실제 상황을 함께 놓고 보시는 것이 좋습니다.",
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

    concernAnswer.value = makeConcernAnswer(type, gender, memo, makeFourPillars(birthDate, birthTime));
    if (concernStatus) concernStatus.textContent = "만세력과 상담 풀이가 정리되었습니다.";
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
