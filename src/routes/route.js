const express = require('express');
const router = express.Router();
const collegeContrllr = require('../controllers/collegeController');
const internControllr = require('../controllers/internController');
const mid=require('../middlewares/middleware');



router.post('/functionup/colleges',mid.validReqBodyCollege,collegeContrllr.createCollege);
router.post('/functionup/interns',mid.validReqBodyIntern,internControllr.createIntern);
router.get('/functionup/collegeDetails',collegeContrllr.getInternDetails);



module.exports = router;