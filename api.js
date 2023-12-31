console.log("api.js 실행중!");

const base_url = "http://127.0.0.1:8000";

async function getArticles() {
  const response = await fetch(`${base_url}/articles/`);
  const data = await response.json();

  return data;
}

async function postArticle(formData) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${base_url}/articles/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await response.json();

  return data;
}

async function putArticle(articleId, formData) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${base_url}/articles/${articleId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  return response;
}

async function deleteArticle(articleId) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${base_url}/articles/${articleId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

async function getComments(articleId) {
  const response = await fetch(`${base_url}/articles/${articleId}/comment/`);

  const data = await response.json();

  return data;
}

async function postComment(articleId, content) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${base_url}/articles/${articleId}/comment/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    }),
  });

  const data = await response.json();

  return data;
}

async function deleteComment(commentId) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${base_url}/articles/comment/${commentId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
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
