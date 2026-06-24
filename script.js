const lectures = {
  "76979871": {
    title: "사주명리 첫걸음",
    desc: "사주 팔자의 기본 구성과 명리학을 공부할 때 반드시 잡아야 할 관점을 정리합니다.",
    paid: false,
  },
  "148751763": {
    title: "오행의 흐름 읽기",
    desc: "목화토금수의 상생과 상극을 실제 원국 분석에 적용하는 방법을 익힙니다.",
    paid: true,
  },
  "22439234": {
    title: "상담 해석 프레임",
    desc: "질문을 분류하고 상담 흐름을 만드는 실전형 해석 프레임을 다룹니다.",
    paid: true,
  },
};

const state = {
  member: JSON.parse(localStorage.getItem("hmMember") || "null"),
  hasPass: localStorage.getItem("hmCoursePass") === "true",
};

const player = document.querySelector("#vimeoPlayer");
const title = document.querySelector("#lectureTitle");
const desc = document.querySelector("#lectureDesc");
const cards = document.querySelectorAll(".lecture-card");
const videoLock = document.querySelector("#videoLock");
const memberStatus = document.querySelector("#memberStatus");
const authModal = document.querySelector("#authModal");
const payModal = document.querySelector("#payModal");
const memberName = document.querySelector("#memberName");
const memberEmail = document.querySelector("#memberEmail");

function updateMemberStatus() {
  const name = state.member?.name || "비회원";
  const pass = state.hasPass ? "한달 무한 구독 이용 중" : "무료 미리보기만 가능";
  memberStatus.textContent = `현재 상태: ${name} / ${pass}`;

  cards.forEach((card) => {
    if (card.dataset.paid === "true") {
      card.classList.toggle("locked", !state.hasPass);
    }
  });
}

function selectLecture(videoId) {
  const lecture = lectures[videoId];
  const isLocked = lecture.paid && !state.hasPass;

  cards.forEach((item) => item.classList.remove("is-active"));
  document.querySelector(`[data-video="${videoId}"]`)?.classList.add("is-active");

  title.textContent = lecture.title;
  desc.textContent = lecture.desc;
  videoLock.hidden = !isLocked;

  if (!isLocked) {
    player.src = `https://player.vimeo.com/video/${videoId}`;
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => selectLecture(card.dataset.video));
});

document.querySelectorAll("[data-open-auth]").forEach((button) => {
  button.addEventListener("click", () => {
    memberName.value = state.member?.name || "";
    memberEmail.value = state.member?.email || "";
    authModal.showModal();
  });
});

document.querySelector("#saveMember").addEventListener("click", () => {
  const name = memberName.value.trim() || "현명 회원";
  const email = memberEmail.value.trim() || "member@example.com";
  state.member = { name, email };
  localStorage.setItem("hmMember", JSON.stringify(state.member));
  updateMemberStatus();
  authModal.close();
});

document.querySelectorAll("[data-demo-pay]").forEach((button) => {
  button.addEventListener("click", () => payModal.showModal());
});

document.querySelector("#completeDemoPay").addEventListener("click", () => {
  if (!state.member) {
    state.member = { name: "현명 회원", email: "member@example.com" };
    localStorage.setItem("hmMember", JSON.stringify(state.member));
  }

  state.hasPass = true;
  localStorage.setItem("hmCoursePass", "true");
  updateMemberStatus();
  payModal.close();
  selectLecture("148751763");
});

updateMemberStatus();
