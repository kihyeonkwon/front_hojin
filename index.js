console.log("스크립트 실행중!");

const logoutButton = document.querySelector("#logout-btn");
logoutButton.addEventListener("click", handleLogout);

async function handleClick() {
  alert("버튼이 클릭되었습니다.");
}

async function loadUser() {
  const usernameSpan = document.querySelector("#username");
  console.log(usernameSpan);

  const data = await getMyInfo();

  if (data.code == "token_not_valid") {
    usernameSpan.innerText = "로그인을 해주세요";
  } else {
    usernameSpan.innerText = `${data.email}님 환영합니다.`;
  }
}

async function loadArticles() {
  const data = await getArticles();

  console.log(data);

  const articlelist = document.querySelector("#article-list");

  data.forEach((element) => {
    const newdiv = document.createElement("div");

    const newh3 = document.createElement("h3");
    newh3.innerText = element.title;
    articlelist.appendChild(newh3);

    const newp = document.createElement("p");
    newp.innerText = element.content;
    newdiv.appendChild(newp);

    articlelist.appendChild(newdiv);
  });
}

function handleLogout() {
  localStorage.removeItem("accessToken");
  alert("로그아웃 되었습니다.");
  window.location.href = "/";
}

loadArticles();
loadUser();
