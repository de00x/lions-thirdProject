import { ICommentData } from "types/types";
import "./styles/index.scss";

const date = new Date();
const todaysDate = date.toLocaleDateString("en-US");
const currentHour = date.getHours();
const currentMinutes = date.getMinutes();

const currentTime = () => {
  if (currentMinutes < 10) return `${currentHour + ":0" + currentMinutes}`;
  else return `${currentHour + ":" + currentMinutes}`;
};

const currentDay = (comment: any) => {
  if (date.getDate() - 1 === Number(comment.date[2] + comment.date[3])) {
    return `вчера, ${comment.time}`;
  } else if (date.getDate() === Number(comment.date[2] + comment.date[3])) {
    return `сегодня, ${comment.time}`;
  } else return `${comment.date}, ${comment.time}`;
};

const inputName: any = document.querySelector(".input-name");
const inputDate: any = document.querySelector(".input-date");
const textArea: any = document.querySelector(".newCommentText");

const errorName = document.createElement("div");
const errorText = document.createElement("div");
const newCommentNameDate: HTMLDivElement | null = document.querySelector(
  ".newCommentName__Date"
);
const newCommentContainer: HTMLDivElement | null = document.querySelector(
  ".newCommentContainer"
);
const newCommentTextContainer: HTMLDivElement | null = document.querySelector(
  ".newCommentTextContainer"
);

if (inputDate !== null) {
  inputDate.placeholder = `${todaysDate}`;
}

let arrayComments: ICommentData[] = [];

if (localStorage.getItem("allComments") !== null) {
  const dataLocalComments = localStorage.getItem("allComments");
  if (dataLocalComments !== null) {
    arrayComments = JSON.parse(dataLocalComments);
  }
  if (dataLocalComments !== null) {
    for (const comment of JSON.parse(dataLocalComments)) {
      createCommentWithLS(comment);
    }
  }
}

function createCommentWithLS(comment: ICommentData) {
  const commentWrapper = document.querySelector(".commentWrapper");
  const commentContainer = document.createElement("div");
  const commentHeaderContainer = document.createElement("div");
  const commentAuthor = document.createElement("div");
  const commentDate = document.createElement("div");
  const commentText = document.createElement("div");
  const footerContainer = document.createElement("div");
  const likeImg = document.createElement("img");
  const notLikeImg = document.createElement("img");
  const trashImg = document.createElement("img");

  commentWrapper?.appendChild(commentContainer);
  commentContainer.className = "commentContainer";
  commentContainer?.appendChild(commentHeaderContainer);
  commentHeaderContainer.className = "commentHeaderContainer";
  commentHeaderContainer?.appendChild(commentAuthor);
  commentAuthor.className = "commentAuthor";
  commentAuthor.innerHTML = `${comment.name}`;
  commentHeaderContainer?.appendChild(commentDate);
  commentDate.className = "commentDate";
  commentDate.innerHTML = currentDay(comment);
  commentContainer?.appendChild(commentText);
  commentText.className = "commentText";
  commentText.innerHTML = `${comment.text}`;
  commentContainer?.appendChild(footerContainer);
  footerContainer.className = "footerContainer";
  footerContainer?.appendChild(likeImg);
  likeImg.src = "https://www.svgrepo.com/show/474891/like.svg";
  likeImg.className = `${!comment.isLike ? "notLikeImg" : "likeImg"}`;
  likeImg.id = `${comment.id}`;
  likeImg.alt = "likeImg";
  likeImg.addEventListener("click", (e: any) => {
    changeLikeComment(e.target.id);
  });
  footerContainer?.appendChild(notLikeImg);
  notLikeImg.src = "https://www.svgrepo.com/show/474892/like-placeholder.svg";
  notLikeImg.className = `${!comment.isLike ? "likeImg" : "notLikeImg"}`;
  notLikeImg.id = `${comment.id}`;
  notLikeImg.alt = "notLikeImg";
  notLikeImg.addEventListener("click", (e: any) => {
    changeLikeComment(e.target.id);
  });
  footerContainer?.appendChild(trashImg);
  trashImg.src = "https://www.svgrepo.com/show/491509/trash.svg";
  trashImg.className = "deleteComment";
  trashImg.id = `${comment.id}`;
  trashImg.alt = "trashImg";
  trashImg.addEventListener("click", (e: any) => {
    commentWrapper?.removeChild(commentContainer);
    deleteCommentFromLs(e.target.id);
  });

  function deleteCommentFromLs(id: string) {
    arrayComments.forEach((comment, i) => {
      if (comment.id === Number(id)) {
        arrayComments.splice(i, 1);
        localStorage.setItem("allComments", JSON.stringify(arrayComments));
      }
    });
  }

  function changeLikeComment(id: string) {
    if (likeImg.className === "likeImg") likeImg.className = "notLikeImg";
    else if (likeImg.className === "notLikeImg") {
      likeImg.className = "likeImg";
    }

    if (notLikeImg.className === "likeImg") notLikeImg.className = "notLikeImg";
    else if (notLikeImg.className === "notLikeImg") {
      notLikeImg.className = "likeImg";
    }

    arrayComments.forEach((comment) => {
      if (comment.id === Number(id)) {
        comment.isLike = !comment.isLike;
        localStorage.setItem("allComments", JSON.stringify(arrayComments));
      }
    });
  }
}

function createNewComment() {
  const createId = Math.random();
  const commentData: ICommentData = {
    name: inputName.value,
    date: inputDate.value.length > 0 ? inputDate.value.length : todaysDate,
    time: currentTime(),
    text: textArea.value,
    id: createId,
    isLike: false,
  };

  const commentWrapper = document.querySelector(".commentWrapper");
  const commentContainer = document.createElement("div");
  const commentHeaderContainer = document.createElement("div");
  const commentAuthor = document.createElement("div");
  const commentDate = document.createElement("div");
  const commentText = document.createElement("div");
  const footerContainer = document.createElement("div");
  const likeImg = document.createElement("img");
  const notLikeImg = document.createElement("img");
  const trashImg = document.createElement("img");

  if (commentData.name.length < 4) {
    errorName.className = "errorText";
    errorName.innerHTML = "Минимальное количество символов - 3";
    if (newCommentNameDate !== null && newCommentContainer !== null) {
      newCommentNameDate.appendChild(errorName);
      newCommentContainer.className = `${
        "newCommentContainer" + " " + "newCommentContainerErr"
      }`;
      inputName.className = `${"input-name" + " " + "inputErr"}`;
    }
  } else if (commentData.text.length < 6) {
    const newCommentText: any = document.querySelector(".newCommentText");
    errorText.className = "errorText";
    errorText.innerHTML = "Минимальное количество символов - 5";
    if (newCommentTextContainer !== null && newCommentContainer !== null) {
      newCommentTextContainer.appendChild(errorText);
      newCommentContainer.className = `${
        "newCommentContainer" + " " + "newCommentContainerErr"
      }`;
      newCommentText.className = `${"newCommentText" + " " + "inputErr"}`;
    }
  } else {
    commentWrapper?.appendChild(commentContainer);
    commentContainer.className = "commentContainer";
    commentContainer?.appendChild(commentHeaderContainer);
    commentHeaderContainer.className = "commentHeaderContainer";
    commentHeaderContainer?.appendChild(commentAuthor);
    commentAuthor.className = "commentAuthor";
    commentAuthor.innerHTML = `${commentData.name}`;
    commentHeaderContainer?.appendChild(commentDate);
    commentDate.className = "commentDate";
    commentDate.innerHTML = `сегодня, ${commentData.time}`;
    commentContainer?.appendChild(commentText);
    commentText.className = "commentText";
    commentText.innerHTML = `${commentData.text}`;
    commentContainer?.appendChild(footerContainer);
    footerContainer.className = "footerContainer";
    footerContainer?.appendChild(likeImg);
    likeImg.src = "https://www.svgrepo.com/show/474891/like.svg";
    likeImg.className = `${!commentData.isLike ? "notLikeImg" : "likeImg"}`;
    likeImg.id = `${commentData.id}`;
    likeImg.alt = "likeImg";
    likeImg.addEventListener("click", (e: any) => {
      changeLikeComment(e.target.id);
    });
    footerContainer?.appendChild(notLikeImg);
    notLikeImg.src = "https://www.svgrepo.com/show/474892/like-placeholder.svg";
    notLikeImg.className = `${!commentData.isLike ? "likeImg" : "notLikeImg"}`;
    notLikeImg.id = `${commentData.id}`;
    notLikeImg.alt = "notLikeImg";
    notLikeImg.addEventListener("click", (e: any) => {
      changeLikeComment(e.target.id);
    });
    footerContainer?.appendChild(trashImg);
    trashImg.src = "https://www.svgrepo.com/show/491509/trash.svg";
    trashImg.className = "deleteComment";
    trashImg.id = `${commentData.id}`;
    trashImg.alt = "trashImg";
    trashImg.addEventListener("click", (e: any) => {
      commentWrapper?.removeChild(commentContainer);
      deleteCommentFromLs(e.target.id);
    });

    function deleteCommentFromLs(id: string) {
      arrayComments.forEach((comment, i) => {
        if (comment.id === Number(id)) {
          arrayComments.splice(i, 1);
        }
      });
    }

    function changeLikeComment(id: string) {
      if (likeImg.className === "likeImg") likeImg.className = "notLikeImg";
      else if (likeImg.className === "notLikeImg") {
        likeImg.className = "likeImg";
      }

      if (notLikeImg.className === "likeImg")
        notLikeImg.className = "notLikeImg";
      else if (notLikeImg.className === "notLikeImg") {
        notLikeImg.className = "likeImg";
      }

      arrayComments.forEach((comment) => {
        if (comment.id === Number(id)) {
          comment.isLike = !comment.isLike;
          localStorage.setItem("allComments", JSON.stringify(arrayComments));
        }
      });
    }

    arrayComments.push(commentData);
    localStorage.setItem("allComments", JSON.stringify(arrayComments));

    inputName.value = "";
    inputDate.value = "";
    textArea.value = "";
  }
}

inputName.addEventListener("keyup", () => {
  if (inputName.value.length !== 0 && newCommentContainer !== null) {
    inputName.className = "input-name";
    newCommentContainer.className = "newCommentContainer";
    if (document.querySelector(".errorText") !== null) {
      if (newCommentNameDate !== null) {
        newCommentNameDate.removeChild(errorName);
      }
    }
  }
});

textArea.addEventListener("keyup", (e: any) => {
  if (
    textArea.value.length !== 0 &&
    newCommentContainer !== null &&
    newCommentTextContainer !== null
  ) {
    textArea.className = "newCommentText";
    newCommentContainer.className = "newCommentContainer";
    if (document.querySelector(".errorText") !== null) {
      newCommentTextContainer.removeChild(errorText);
    }
  }
  if (e.code === "Enter") createNewComment();
});

document
  .getElementById("add-new-comment-form")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewComment();
  });
