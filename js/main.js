var comments = [];

const fetchComments = async (page_id) => {
  if (comments.length == 0) {
    console.log("Fetching comments from comments.json");
    comments =await fetch('./comments.json')
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
