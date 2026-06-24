const courses = {
  basic: {
    title: "사주명리 첫걸음",
    desc: "사주 팔자의 구성과 명리학을 공부할 때 반드시 잡아야 할 기본 관점을 정리합니다.",
    items: ["음양오행의 기본 원리", "천간과 지지의 구조", "사주 원국을 읽는 첫 기준"],
  },
  flow: {
    title: "오행과 운의 흐름",
    desc: "원국의 균형과 대운, 세운의 흐름을 함께 보며 시기별 변화의 맥락을 익힙니다.",
    items: ["오행의 생극제화", "대운과 세운의 적용", "흐름 중심의 해석 훈련"],
  },
  practice: {
    title: "상담 통변 훈련",
    desc: "현장에서 자주 만나는 질문을 기준으로 상담 언어를 구성하는 실전 해석법을 다룹니다.",
    items: ["직업과 재물 상담", "관계와 가족 상담", "건강과 시기 판단"],
  },
};

const title = document.querySelector("#courseTitle");
const desc = document.querySelector("#courseDesc");
const list = document.querySelector("#courseList");
const cards = document.querySelectorAll(".lecture-card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const course = courses[card.dataset.course];

    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");

    title.textContent = course.title;
    desc.textContent = course.desc;
    list.innerHTML = course.items.map((item) => `<li>${item}</li>`).join("");
  });
});
