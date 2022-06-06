const { sortPosts } = require("../utils/sortPosts");

const removeDuplicates = (mergedPosts, foundDuplicates, duplicates) => {
  // sort the array
  duplicates = sortPosts(duplicates, "id");

  // remove duplicates
  for (let i = 0; i < duplicates.length; i++) {
    // loop only if multiples of the same element exist in the array
    while (
      duplicates[i + 1] !== undefined &&
      duplicates[i].id === duplicates[i + 1].id
    ) {
      duplicates.splice(i + 1, 1);
    }
  }

  // assign the non duplicate posts
  mergedPosts = mergedPosts.filter((e) => foundDuplicates[e.id] == 0);
  // concat the duplicated posts that have been removed
  mergedPosts = mergedPosts.concat(duplicates);

  return mergedPosts;
};

const findDuplicates = (mergedPosts) => {
  // find the duplicate values in the merged posts
  const foundDuplicates = mergedPosts.reduce((arr, element) => {
    // arr[element.id] = ++arr[element.id] || 0 will only increment a property using ++ if it already exists.
    // if it doesn't then it will fall through the OR and create a property of 0
    arr[element.id] = ++arr[element.id] || 0;
    return arr;
  }, {});

  // Filter the duplicate values found in merged posts. 1 represents the found duplicate post
  let duplicates = mergedPosts.filter((e) => foundDuplicates[e.id] == 1);

  return { mergedPosts, foundDuplicates, duplicates };
};

module.exports = { removeDuplicates, findDuplicates };
