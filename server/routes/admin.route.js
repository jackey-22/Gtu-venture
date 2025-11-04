const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { asyncRouteHandler } = require('../utils/route.utils');
const multer = require('multer');
const { upload } = require('../utils/multer.utils');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware('Admin'));

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

// Team Label
router.post('/add-team-label', asyncRouteHandler(adminController.addTeamLabel));
router.get('/get-team-labels', asyncRouteHandler(adminController.getAllTeamLabels));
router.get('/get-team-label/:id', asyncRouteHandler(adminController.getTeamLabelById));
router.post('/update-team-label/:id', asyncRouteHandler(adminController.updateTeamLabel));
router.post('/delete-team-label/:id', asyncRouteHandler(adminController.deleteTeamLabel));

// Team Member
router.post(
	'/add-team-member',
	upload.single('photo'),
	asyncRouteHandler(adminController.addTeamMember)
);
router.get('/get-team-members', asyncRouteHandler(adminController.getAllTeamMembers));
router.get('/get-team-member/:id', asyncRouteHandler(adminController.getTeamMemberById));
router.post(
	'/update-team-member/:id',
	upload.single('photo'),
	asyncRouteHandler(adminController.updateTeamMember)
);
router.post('/delete-team-member/:id', asyncRouteHandler(adminController.deleteTeamMember));

// Application
router.post('/add-application', asyncRouteHandler(adminController.addApplication));
router.get('/get-applications', asyncRouteHandler(adminController.getAllApplications));
router.get('/get-application/:id', asyncRouteHandler(adminController.getApplicationById));
router.post('/update-application/:id', asyncRouteHandler(adminController.updateApplication));
router.delete('/delete-application/:id', asyncRouteHandler(adminController.deleteApplication));

// Career
router.post('/add-career', asyncRouteHandler(adminController.addCareer));
router.get('/get-careers', asyncRouteHandler(adminController.getAllCareers));
router.get('/get-career/:id', asyncRouteHandler(adminController.getCareerById));
router.post('/update-career/:id', asyncRouteHandler(adminController.updateCareer));
router.delete('/delete-career/:id', asyncRouteHandler(adminController.deleteCareer));

// Partner
router.post('/add-partner', upload.single('logo'), asyncRouteHandler(adminController.addPartner));
router.get('/get-partners', asyncRouteHandler(adminController.getAllPartners));
router.get('/get-partner/:id', asyncRouteHandler(adminController.getPartnerById));
router.post('/update-partner/:id', upload.single('logo'), asyncRouteHandler(adminController.updatePartner));
router.delete('/delete-partner/:id', asyncRouteHandler(adminController.deletePartner));

// Facility
router.post('/add-facility', asyncRouteHandler(adminController.addFacility));
router.get('/get-facilities', asyncRouteHandler(adminController.getAllFacilities));
router.get('/get-facility/:id', asyncRouteHandler(adminController.getFacilityById));
router.post('/update-facility/:id', asyncRouteHandler(adminController.updateFacility));
router.delete('/delete-facility/:id', asyncRouteHandler(adminController.deleteFacility));

// Initiative
router.post('/add-initiative', asyncRouteHandler(adminController.addInitiative));
router.get('/get-initiatives', asyncRouteHandler(adminController.getAllInitiatives));
router.get('/get-initiative/:id', asyncRouteHandler(adminController.getInitiativeById));
router.post('/update-initiative/:id', asyncRouteHandler(adminController.updateInitiative));
router.delete('/delete-initiative/:id', asyncRouteHandler(adminController.deleteInitiative));

// Contact Message
router.get('/get-contact-messages', asyncRouteHandler(adminController.getAllContactMessages));
router.get('/get-contact-message/:id', asyncRouteHandler(adminController.getContactMessageById));
router.post('/update-contact-message/:id', asyncRouteHandler(adminController.updateContactMessage));
router.delete('/delete-contact-message/:id', asyncRouteHandler(adminController.deleteContactMessage));

// Circular
router.post('/add-circular', upload.single('file'), asyncRouteHandler(adminController.addCircular));
router.get('/get-circulars', asyncRouteHandler(adminController.getAllCirculars));
router.get('/get-circular/:id', asyncRouteHandler(adminController.getCircularById));
router.post('/update-circular/:id', upload.single('file'), asyncRouteHandler(adminController.updateCircular));
router.delete('/delete-circular/:id', asyncRouteHandler(adminController.deleteCircular));

// Dashbaord cnts
router.get('/get-counts', asyncRouteHandler(adminController.getDashboardCounts));

module.exports = router;
