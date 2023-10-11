console.log("api.js 실행중!");

const base_url = "http://127.0.0.1:8000";

async function getArticles() {
  const response = await fetch(`${base_url}/articles/`);
  const data = await response.json();

  return data;
}

async function postArticle(title_value, content_value) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${base_url}/articles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: title_value,
      content: content_value,
    }),
  });

  const data = await response.json();

  return data;
}

async function postSignup(data) {
  const res = await fetch(`${base_url}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return res;
}

async function postLogin(data) {
  const res = await fetch(`${base_url}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return res;
}

async function getMyInfo() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return { code: "token_not_valid" };
  }

  const res = await fetch(`${base_url}/users/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  return data;
}
