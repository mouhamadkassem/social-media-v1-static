const user = JSON.parse(localStorage.getItem("user-auth"));

export const isUserExistInList = (list, id) => {
  const userExist = list?.filter((dislike) => dislike === user?.id);
  if (userExist?.length) return true;
  else return false;
};

export const handleOppositeReview = (reviews, posts, id, islike) => {
  let updatedPost = posts;

  const updatedReview = reviews?.filter((review) => review !== user?.id);

  if (islike) {
    console.log("here 1");
    updatedPost = posts?.map((post) =>
      post._id === id ? { ...post, disLikes: updatedReview } : post
    );

    updatedPost = updatedPost?.map((post) =>
      post._id === id ? { ...post, likes: [...post?.likes, user?.id] } : post
    );
  } else {
    console.log("here 2");
    updatedPost = posts?.map((post) =>
      post._id === id ? { ...post, likes: updatedReview } : post
    );

    console.log(updatedPost);

    updatedPost = updatedPost?.map((post) => {
      console.log("id", post._id === id);
      return post._id === id
        ? { ...post, disLikes: [...post?.disLikes, user?.id] }
        : post;
    });

    console.log(updatedPost);
  }

  return updatedPost;
};

export const handleReview = (reviews, posts, id, islike) => {
  let updatedPost = posts;

  const updatedReview = reviews.filter((review) => review !== user?.id);
  if (islike) {
    updatedPost = updatedPost?.map((post) =>
      post._id === id ? { ...post, likes: updatedReview } : post
    );
  } else {
    updatedPost = updatedPost?.map((post) =>
      post._id === id ? { ...post, disLikes: updatedReview } : post
    );
  }

  return updatedPost;
};
