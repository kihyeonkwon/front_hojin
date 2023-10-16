console.log("스크립트 실행중!");

const logoutButton = document.querySelector("#logout-btn");
logoutButton.addEventListener("click", handleLogout);

async function handleClick(z, x) {
  alert(`전달된 파라미터는 ${z}와 ${x} 입니다.`);
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
  const articles = await getArticles();

  console.log(articles);

  const articlelist = document.querySelector("#article-list");

  articles.forEach((article) => {
    const newdiv = document.createElement("div");

    const a = document.createElement("a");
    a.href = `/detail.html?id=${article.id}`;

    const newh3 = document.createElement("h3");
    newh3.innerText = article.title;

    a.appendChild(newh3);
    articlelist.appendChild(a);

    const newp = document.createElement("p");
    newp.innerText = article.content;
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
