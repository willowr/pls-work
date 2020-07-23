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

function addPost(author, date, content, comment_id, parent, page_id) {
  if (parent == "NONE") {
    return `
    <div class="a-comment">
      <div class="a-comment-top">
        <div class="a-comment-author">${author}</div>
        <div class="a-comment-date">${date}</div>
      </div>
      <div class="a-comment-bottom">
        <div class="a-comment-comment">${content}</div>
        <button class="a-comment-reply-button" type="button"  onclick="reply(${comment_id}, ${comment_id}, ${page_id})">Reply</button>
      </div>
    </div>
    `
  }
  else {
    return `
      <div class="a-comment-top">
        <div class="a-comment-author">${author}</div>
        <div class="a-comment-date">${date}</div>
      </div>
      <div class="a-comment-bottom">
        <div class="a-comment-comment">${content}</div>
        <button type="button" class="a-comment-reply-button" value="Reply" onclick="reply(${comment_id}, ${parent}, ${page_id})">Reply</button>
      </div>
    `
  }
}

function showComments(page_id) {
  var a = document.getElementById("cmtslc");

  let filtered = [];
  filtered = comments.filter(comment => { return comment.id == page_id; });
  console.log("Filtered comments by page_id");

  var something;

  if (filtered.length == 0) {
    var tag = document.createElement("div"); tag.className = "no-comments-box"; tag.innerHTML = "No comments yet";
    a.appendChild(tag);
  }

  else {
    for (var i = 0; i < filtered.length; i++) {
      something = addPost(filtered[i].author_name, filtered[i].comment_date, filtered[i].comment_content, filtered[i].comment_id, filtered[i].comment_parent, filtered[i].id);

      if (filtered[i].comment_parent == "NONE") {
        var tag = document.createElement("div"); tag.className = "a-thread"; tag.innerHTML = something; tag.id = filtered[i].comment_id;
        a.appendChild(tag);
      }

      else {
        var tag = document.createElement("div"); tag.className = "a-reply"; tag.innerHTML = something; tag.id = filtered[i].comment_id;
        var huh = document.getElementById(filtered[i].comment_parent);
        huh.appendChild(tag);
      }
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

// id is the page ID (1,2,3,...); parent is "NONE" if it's entered from the form enter-comment,
// parent is the thread id if it's entered from the frm enter-reply
function enterComment(id, parent) {
  let myComment;
  if (parent == "NONE") {
    let form = document.getElementById("enter-comment");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0'); var mm = String(today.getMonth() + 1).padStart(2, '0'); var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    myComment = {
      id: id,
      author_name: form.elements["author_name"].value,
      comment_date: today,
      comment_content: form.elements["new_comment"].value,
      comment_id: new Date().getTime(),
      comment_parent: "NONE"
    }

    form.reset();
  }

  else {
    let form = document.getElementById("enter-reply");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0'); var mm = String(today.getMonth() + 1).padStart(2, '0'); var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    myComment = {
      id: id,
      author_name: form.elements["author_name"].value,
      comment_date: today,
      comment_content: form.elements["new_comment"].value,
      comment_id: new Date().getTime(),
      comment_parent: parent
    }

    form.reset();
  }

  createComment(myComment).then((response) => {
    console.log("API response", response)
    $.post("https://api.netlify.com/build_hooks/5f1763a35ec623022373884d", function(data) { console.log(data, " let's goo")});
  }).catch((error) => {
    console.log("API error", error)
  });
}

// Add a form to the page to submit a new reply/comment
function reply(comment_id, parent, page_id) {
  var el = document.getElementById("reply-box");
  if (el != null) {
    el.parentNode.removeChild(el);
  }

  var something = `
    <form id="enter-reply">
      Name: <input type="text" name="author_name" maxlength="100" style="width: 100%; max-width: 100%">
      <br> Reply: <br>
      <textarea name="new_comment" rows="5" cols="500" style="width: 100%; max-width: 100%;"></textarea>
      <input type="button" class="post-comment-button" value="Post reply" onclick="enterComment(${page_id}, ${parent})">
    </form>
  `
  var hmm = document.createElement("div"); hmm.className = "enter-comment-container"; hmm.id = "reply-box" hmm.innerHTML = something;
  var huh = document.getElementById(comment_id);
  huh.appendChild(hmm);
}
