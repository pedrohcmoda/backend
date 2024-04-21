const express = require('express')
const UserController = require('./controllers/UserController')
const postController = require('./controllers/PostController')
const CommentController = require('./controllers/CommentController')
const LikeController = require('./controllers/LikeController')
const authMiddleware = require('./middlewares/auth');
const router = express.Router() 


router.get('/users', UserController.index)
router.post('/users', UserController.store)
router.put('/users/:user_id', authMiddleware, UserController.update)
router.delete('/users/:user_id', UserController.delete)
router.post('/users/login', UserController.login)


router.get('/posts', postController.index);
router.post('/posts', postController.store);
router.put('/posts/:post_id', postController.update);
router.delete('/posts/:post_id', postController.delete);


router.post('/comments/:post_id', CommentController.createComment)
router.get('/comments/:post_id', CommentController.getPostComments)
router.delete('/comments/:comment_id', CommentController.deleteComment)


router.post('/likes/:post_id', LikeController.likePost)
router.get('/likes/:post_id', LikeController.getPostLikes)
router.delete('/likes/:like_id', LikeController.unlikePost)


module.exports = router;