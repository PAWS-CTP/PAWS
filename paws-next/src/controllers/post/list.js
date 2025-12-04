const listPosts = async (req, res) => {
    const { Post } = req.db;
    const post = await Post.list();
    res.send(post);
  };
  
  module.exports = listPosts;