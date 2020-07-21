let comments;
const results = document.querySelector('#cmtslc');

const fetchComments = async () => {
  comments = await fetch('/comments.json')
    .then(response => response.json())
    .catch(err => err)
  return true;
}

function filterComments(page_id) {
  let filtered = []
  filtered = comments.filter(comment => {
    return comment.id == page_id;
  });
  return filtered;
}


const showComments = async(comments) => {
  const commentsMarkup = "${renderComments(comments)}"
  results.innerHTML = commentsMarkup;
}

function renderComments(comments) {
  return `
    <ul>
      ${comments.map(comment => `
        <div class="a-comment">
          <div class="a-comment-top">
            <div class="a-comment-author">${comment.author_name}</div>
            <div class="a-comment-date">${comment.comment_date}</div>
          </div>
          <div class="a-comment-bottom">
            <div class="a-comment-comment">${comment.comment_content}</div>
          </div>
        </div>
        `).join('')}
    </ul>
  `
}

(function() {
  fetchComments();
})
