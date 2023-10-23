console.log("profile.js");

function getUserId() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("userid");

  return myParam;
}

function loadUser() {
  let userId = getUserId();
  console.log("userId: ", userId);
}

loadUser();
