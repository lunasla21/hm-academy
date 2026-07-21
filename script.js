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

const concernGuides = {
  이직: {
    opening: "이직은 단순히 자리를 옮기는 문제가 아니라, 내 기운이 머물 곳을 바꾸는 일입니다.",
    flow: "지금은 마음이 앞서기 쉬운 때이므로 현재 직장의 불편함과 새 직장의 가능성을 분리해서 보아야 합니다.",
    result: "결과적으로는 바로 끊고 나가기보다 조건, 사람, 성장 가능성을 확인한 뒤 움직이는 편이 안정적입니다.",
    action: "이력서와 면접 준비는 시작하되, 확정 전까지는 현재 자리에서 평판과 마무리를 단정하게 가져가십시오.",
  },
  직업: {
    opening: "직업의 문제는 재능보다 방향의 문제이고, 방향은 오래 버틸 수 있는 기운에서 나옵니다.",
    flow: "지금은 잘하는 일과 오래 할 수 있는 일을 다시 구분해야 하는 흐름입니다.",
    result: "당장의 만족만 보지 말고 배움, 수입, 사람 관계가 함께 쌓이는 일을 선택하는 것이 좋습니다.",
    action: "현재 하는 일에서 반복되는 스트레스와 성취감을 적어보면 다음 방향이 더 분명해집니다.",
  },
  재물: {
    opening: "재물운은 한 번에 크게 얻는 것보다 새는 곳을 막고 흐름을 안정시키는 데서 먼저 열립니다.",
    flow: "지금은 욕심을 키우기보다 지출, 투자, 약속의 균형을 점검해야 하는 시기입니다.",
    result: "무리한 확장이나 충동적인 선택은 피하고, 현금 흐름이 확인되는 일부터 잡는 편이 낫습니다.",
    action: "큰 결정을 하기 전에는 최소 한 달 단위의 수입과 지출을 숫자로 확인하십시오.",
  },
  관계: {
    opening: "관계의 문제는 옳고 그름보다 서로의 기운이 부딪히는 지점을 읽어야 풀립니다.",
    flow: "지금은 감정으로 밀어붙이면 말이 커지고, 거리를 두면 마음의 윤곽이 보이는 흐름입니다.",
    result: "바로 결론을 내리기보다 상대에게 기대한 것과 실제 가능한 것을 나누어 보는 것이 좋습니다.",
    action: "중요한 대화는 밤늦게 하지 말고, 핵심 한 가지를 정해 짧고 분명하게 전달하십시오.",
  },
  건강: {
    opening: "건강은 운의 바탕입니다. 몸이 흔들리면 판단도 함께 흐려집니다.",
    flow: "지금은 버티는 힘보다 회복의 리듬을 먼저 세워야 하는 흐름입니다.",
    result: "큰 걱정으로 몰고 가기보다 생활 리듬, 수면, 검진을 차례로 확인하는 편이 좋습니다.",
    action: "불편한 증상이 계속되면 자가 판단으로 넘기지 말고 의료기관에서 확인하십시오.",
  },
  학업: {
    opening: "학업과 진로는 속도보다 맞는 방향을 찾는 일이 먼저입니다.",
    flow: "지금은 비교가 많아지면 마음이 흔들리고, 내 성향을 보면 선택이 정리되는 시기입니다.",
    result: "결과적으로 잘 보이는 길보다 꾸준히 실력이 쌓이는 길을 잡는 것이 좋습니다.",
    action: "좋아하는 과목, 오래 해도 덜 지치는 활동, 주변에서 인정받는 장점을 함께 적어보십시오.",
  },
  사업: {
    opening: "사업과 창업은 아이디어보다 시기, 사람, 돈의 흐름이 맞아야 안정됩니다.",
    flow: "지금은 크게 벌리는 운보다 구조를 점검하고 작은 검증을 먼저 해야 하는 흐름입니다.",
    result: "준비 없이 시작하기보다는 고객, 비용, 동업 관계를 숫자와 계약으로 확인한 뒤 움직이는 편이 낫습니다.",
    action: "작게 팔아보고 반응을 확인한 뒤 확장하십시오. 약속은 말보다 문서로 남기는 것이 좋습니다.",
  },
  기타: {
    opening: "고민은 겉으로 하나처럼 보여도 안에는 시기, 사람, 마음의 문제가 함께 들어 있습니다.",
    flow: "지금은 서둘러 답을 내기보다 무엇이 가장 두려운지 먼저 확인해야 하는 흐름입니다.",
    result: "결과적으로 한 번에 모든 문제를 풀기보다 가장 현실적인 한 가지부터 정리하는 편이 좋습니다.",
    action: "오늘 할 수 있는 작은 선택과 미뤄도 되는 선택을 나누어 적어보십시오.",
  },
};

const concernForm = document.querySelector("#concernForm");
const concernButton = document.querySelector("#makeConcernAnswer");
const concernAnswer = document.querySelector("#concernAnswer");
const concernCopyButton = document.querySelector("#copyConcernAnswer");
const concernStatus = document.querySelector("#concernStatus");

function makeConcernAnswer(type, mood, memo) {
  const guide = concernGuides[type] || concernGuides.기타;
  const trimmedMemo = memo.trim();
  const shortMemo = trimmedMemo.length > 120 ? `${trimmedMemo.slice(0, 120)}...` : trimmedMemo;

  return [
    "[현명역학원 고민 상담]",
    "",
    `고민 분야: ${type}`,
    `현재 마음: ${mood}`,
    "",
    "현명역학원식으로 보면, 지금의 고민은 단순히 좋은가 나쁜가로 끊어 판단할 문제가 아닙니다. 운의 흐름은 사람의 마음, 환경, 시기가 함께 움직일 때 분명해집니다.",
    "",
    `말씀하신 내용: ${shortMemo}`,
    "",
    guide.opening,
    guide.flow,
    guide.result,
    "",
    "정리하면 다음과 같습니다.",
    `1. 지금의 ${mood}을 결론으로 보지 말고, 방향을 점검하라는 신호로 보십시오.`,
    "2. 큰 결정은 감정이 가장 올라온 날보다 마음이 가라앉은 뒤에 하는 것이 좋습니다.",
    `3. ${guide.action}`,
    "",
    "최종 조언",
    "지금은 무리하게 운을 꺾기보다 흐름을 읽고 준비를 갖추는 쪽이 좋습니다. 선택은 빠른 것이 중요한 것이 아니라, 내가 감당할 수 있는 방향으로 가는 것이 중요합니다.",
    "",
    "더 정확한 상담은 생년월일시와 현재 상황을 함께 보아야 하므로, 필요하시면 현명역학원 상담으로 이어가시면 됩니다.",
  ].join("\n");
}

if (concernForm && concernButton && concernAnswer) {
  concernButton.addEventListener("click", () => {
    const data = new FormData(concernForm);
    const type = data.get("concernType") || "기타";
    const mood = data.get("mood") || "정리가 필요함";
    const memo = data.get("concernMemo")?.trim() || "";

    if (!memo) {
      concernAnswer.value = "";
      if (concernStatus) concernStatus.textContent = "고민 내용을 먼저 입력해 주세요.";
      return;
    }

    concernAnswer.value = makeConcernAnswer(type, mood, memo);
    if (concernStatus) concernStatus.textContent = "상담 답변이 정리되었습니다.";
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
