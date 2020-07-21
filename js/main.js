let comments;

const fetchComments = async () => {
  comments = await fetch('/comments.json')
    .then(response => response.json())
    .catch(err => err)
  return true;
}
