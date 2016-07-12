var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');

var eventsController = require('../controllers/eventsController');
var commentsController = require('../controllers/commentsController');


router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/events')
  .get(eventsController.eventsIndex)
  .post(eventsController.eventsCreate)
  
router.route('/events/:id') 
  .get(eventsController.eventsShow)
  .put(eventsController.eventsUpdate)
  .delete(eventsController.eventsDelete)

router.route('/comments')
  .get(commentsController.commentsIndex)
  .post(commentsController.commentsCreate)
  
router.route('/comments/:id') 
  .get(commentsController.commentsShow)
  .patch(commentsController.commentsUpdate)
  .delete(commentsController.commentsDelete)


module.exports = router;
