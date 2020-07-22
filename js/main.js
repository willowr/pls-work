let comments = [];

const fetchComments = async () => {
  console.log("Fetching comments from comments.json");
  comments =await fetch('../../comments.json')
    .then(response => response.json())
    .catch(err => err)
  return true;
}

fetchComments();

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
