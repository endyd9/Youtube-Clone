const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const videoContainer = document.getElementById("videoContainer");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments  ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerHTML = ` ${text}`;
  const span2 = document.createElement("span");
  span2.id = "deleteBtn";
  span2.className = "deleteBtn";
  span2.innerHTML = `❌`;
  span2.addEventListener("click", deleteComment);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const deleteComment = async (event) => {
  const comment = event.target.parentElement;
  const videoID = videoContainer.dataset.id;
  const commentID = comment.dataset.id;
  const removeComment = await fetch(
    `/api/videos/${videoID}/${commentID}/delete`,
    {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        commentID,
      }),
    }
  );

  if (removeComment.status === 200) {
    comment.remove();
  } else if (removeComment.status === 404) {
    alert("댓글정보를 찾을 수 없습니다");
    window.location.reload();
  } else if (removeComment.status === 403) {
    alert("삭제 권한이 없습니다.\n자신이 작성한 댓글만 삭제 가능합니다.");
  }
};

const handleSubmit = async () => {
  const text = textarea.value;
  const videoID = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoID}/comment`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
    textarea.value = "";
  }
};

btn.addEventListener("click", handleSubmit);
deleteBtn.forEach((btn) => btn.addEventListener("click", deleteComment));
