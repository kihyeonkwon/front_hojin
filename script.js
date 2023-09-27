console.log("스크립트 실행중!");

async function handleClick() {
  alert("버튼이 클릭되었습니다.");
}

async function loadArticles() {
  const response = await fetch("http://127.0.0.1:8000/articles/");
  const data = await response.json();
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

loadArticles();
