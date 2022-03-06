function parsePostsToJson(dateGroupsJSON) {
  const dateGroups = JSON.parse(dateGroupsJSON);

  const dateGroupsWithParsedPosts = dateGroups.map(dateGroup => {
    const parsedPosts = dateGroup.posts.map(post => {
      if (isThread())
        parseThread;
      if (isPost())
        parsePost;
    });
    return { ...dateGroup, posts: parsedPosts };
  });

  return JSON.stringify(dateGroupsWithParsedPosts);
}
