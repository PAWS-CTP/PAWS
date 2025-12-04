const createPost = async (req, res) => {
    const {
      db: { Post },
      body: { user_id, img_url, caption, username, pet_id,like_count,event_id},
    } = req;

    const post = await Post.create(user_id, img_url, caption, username, pet_id,like_count,event_id);
  
    res.send(post);
  };
  
  module.exports = createPost;