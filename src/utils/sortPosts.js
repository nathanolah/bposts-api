const swap = (posts, direction, i, j) => {
  if (direction == "asc") {
    let temp = posts[i];
    posts[i] = posts[j];
    posts[j] = temp;
  }

  if (direction == "desc") {
    let temp = posts[j];
    posts[j] = posts[j + 1];
    posts[j + 1] = temp;
  }

  return posts;
};

const bubbleSort = (posts, direction, property) => {
  if (direction == "asc") {
    for (let i = 0; i < posts.length; i++) {
      for (let j = i + 1; j < posts.length; j++) {
        if (posts[j][property] < posts[i][property]) {
          posts = swap(posts, direction, i, j);
        }
      }
    }
  }

  if (direction == "desc") {
    for (let i = posts.length - 1; i > 1; i--) {
      for (let j = 0; j < i; j++) {
        if (posts[j][property] < posts[j + 1][property]) {
          posts = swap(posts, direction, i, j);
        }
      }
    }
  }

  return posts;
};

// sort an array based off the direction and the object property
const sortPosts = (posts, property, direction = "asc") => {
  if (direction == "asc") {
    posts = bubbleSort(posts, direction, property);
  } else if (direction == "desc") {
    // Reverse sort for descending order
    posts = bubbleSort(posts, direction, property);
  }

  return posts;
};

module.exports = { sortPosts };
