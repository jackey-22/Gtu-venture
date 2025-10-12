const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { asyncRouteHandler } = require('../utils/route.utils');
const multer = require('multer');
const { upload } = require('../utils/multer.utils');

// router.use(authMiddleware('Admin'));

// Event
router.post('/add-event', upload.single('image'), asyncRouteHandler(adminController.addEvent));
router.get('/get-events', asyncRouteHandler(adminController.getAllEvents));
router.get('/get-event/:id', asyncRouteHandler(adminController.getEventById));
router.post(
	'/update-event/:id',
	upload.single('image'),
	asyncRouteHandler(adminController.updateEvent)
);
router.delete('/delete-event/:id', asyncRouteHandler(adminController.deleteEvent));

//Program
router.post('/add-program', adminController.addProgram);
router.get('/get-programs', asyncRouteHandler(adminController.getAllPrograms));
router.get('/program/:id', asyncRouteHandler(adminController.getProgramById));
router.put('/update-program/:id', asyncRouteHandler(adminController.updateProgram));
router.delete('/delete-program/:id', asyncRouteHandler(adminController.deleteProgram));

// News
router.post('/add-news', upload.array('images'), asyncRouteHandler(adminController.addNews));
router.get('/get-news', asyncRouteHandler(adminController.getAllNews));
router.get('/get-news/:id', asyncRouteHandler(adminController.getNewsById));
router.post(
	'/update-news/:id',
	upload.array('images'),
	asyncRouteHandler(adminController.updateNews)
);
router.delete('/delete-news/:id', asyncRouteHandler(adminController.deleteNews));

// Report
router.post('/add-report', upload.single('file'), asyncRouteHandler(adminController.addReport));
router.get('/get-reports', asyncRouteHandler(adminController.getAllReports));
router.get('/get-report/:id', asyncRouteHandler(adminController.getReportById));
router.post(
	'/update-report/:id',
	upload.single('file'),
	asyncRouteHandler(adminController.updateReport)
);
router.delete('/delete-report/:id', asyncRouteHandler(adminController.deleteReport));

// StartUp
router.post('/add-startup', upload.single('logo'), asyncRouteHandler(adminController.addStartup));
router.get('/get-startups', asyncRouteHandler(adminController.getAllStartups));
router.get('/get-startup/:id', asyncRouteHandler(adminController.getStartupById));
router.post(
	'/update-startup/:id',
	upload.single('logo'),
	asyncRouteHandler(adminController.updateStartup)
);
router.delete('/delete-startup/:id', asyncRouteHandler(adminController.deleteStartup));

// Gallary
router.post('/add-gallery', upload.array('images'), asyncRouteHandler(adminController.addGallery));
router.get('/get-galleries', asyncRouteHandler(adminController.getAllGalleries));
router.get('/get-gallery/:id', asyncRouteHandler(adminController.getGalleryById));
router.post(
	'/update-gallery/:id',
	upload.array('images'),
	asyncRouteHandler(adminController.updateGallery)
);
router.delete('/delete-gallery/:id', asyncRouteHandler(adminController.deleteGallery));

// FAQ
router.post('/add-faq', asyncRouteHandler(adminController.addFAQ));
router.get('/get-faqs', asyncRouteHandler(adminController.getAllFAQs));
router.get('/get-faq/:id', asyncRouteHandler(adminController.getFAQById));
router.post('/update-faq/:id', asyncRouteHandler(adminController.updateFAQ));
router.post('/delete-faq/:id', asyncRouteHandler(adminController.deleteFAQ));

// Dashbaord cnts
router.get('/get-counts', asyncRouteHandler(adminController.getDashboardCounts));

module.exports = router;
