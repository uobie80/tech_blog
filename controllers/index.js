const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const signupRoutes = require('./signupRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/', homeRoutes);
router.use('/home', homeRoutes);
router.use('/login', loginRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/signup', signupRoutes);
router.use('/blogPostRoutes', blogPostRoutes);
router.use('/commentRoutes', commentRoutes);


module.exports = router;
