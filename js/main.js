var comments = [];

const fetchComments = async (page_id) => {
  if (comments.length == 0) {
    console.log("Fetching comments from comments.json");
    comments =await fetch('/comments.json')
      .then(response => response.json())
      .catch(err => err)
    console.log("Finished fetching comments from comments.json");
    console.log(comments);
    showComments(page_id);
  }
  else
  {
    showComments(page_id);
  }

  return true;
}

function addPost(author, date, content) {
  return `
    <div class="a-comment-top">
      <div class="a-comment-author">${author}</div>
      <div class="a-comment-date">${date}</div>
    </div>
    <div class="a-comment-bottom">
      <div class="a-comment-comment">${content}</div>
    </div>
  `
}

function showComments(page_id) {
  var a = document.getElementById("cmtslc");
  let filtered = [];
  console.log("Filtered comments by page_id");
  console.log("Comments is of type " + typeof comments + " before the line filtered = comments.filter(blah)");
  console.log(comments);
  console.log("Above is what comments is right now");
  filtered = comments.filter(comment => {
    return comment.id == page_id;
  });
  var something;
  if (filtered.length == 0) {
    var tag = document.createElement("div"); tag.className = "no-comments-box";
    tag.innerHTML = "No comments yet";
    a.appendChild(tag);
  }
  else {
    for (var i = 0; i < filtered.length; i++) {
      something = addPost(filtered[i].author_name, filtered[i].comment_date, filtered[i].comment_content);
      var tag = document.createElement("div"); tag.className = "a-comment";
      tag.innerHTML = something;
      a.appendChild(tag);
    }
  }
}

function createComment(data) {
  return fetch("/.netlify/functions/comments", {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json();
  });
}

function enterComment(id) {
  var form = document.getElementById("enter-comment");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const myComment = {
    id: id,
    author_name: form.elements["author_name"].value,
    comment_date: today,
    comment_content: form.elements["new_comment"].value
  }
  createComment(myComment).then((response) => {
    console.log("API response", response)
    $.post("https://api.netlify.com/build_hooks/5f1763a35ec623022373884d", function(data) { console.log(data, " let's goo")});
  }).catch((error) => {
    console.log("API error", error)
  })
}
