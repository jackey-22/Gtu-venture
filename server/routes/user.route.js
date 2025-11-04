const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// PROGRAMS
router.get('/get-programs', userController.fetchPrograms);
router.get('/get-program/:id', userController.fetchProgramById);

// EVENTS
router.get('/get-events', userController.fetchEvents);
router.get('/get-event/:id', userController.fetchEventById);

// NEWS
router.get('/get-news', userController.fetchNews);
router.get('/get-news/:id', userController.fetchNewsById);

// GALLERY
router.get('/get-gallery', userController.fetchGallery);
router.get('/get-gallery/:id', userController.fetchGalleryById);

// REPORTS
router.get('/get-reports', userController.fetchReports);
router.get('/get-report/:id', userController.fetchReportById);

// STARTUPS
router.get('/get-startups', userController.fetchStartups);
router.get('/get-startup/:id', userController.fetchStartupById);

// FAQS
router.get('/get-faqs', userController.fetchFAQs);
router.get('/get-faq/:id', userController.fetchFAQById);

// TEAM
router.get('/get-team-members', userController.fetchTeamMembers);
router.get('/get-team-member/:id', userController.fetchTeamMemberById);

// CAREERS
router.get('/get-careers', userController.fetchCareers);
router.get('/get-career/:id', userController.fetchCareerById);

// PARTNERS
router.get('/get-partners', userController.fetchPartners);
router.get('/get-partner/:id', userController.fetchPartnerById);

// FACILITIES
router.get('/get-facilities', userController.fetchFacilities);
router.get('/get-facility/:id', userController.fetchFacilityById);

// INITIATIVES
router.get('/get-initiatives', userController.fetchInitiatives);
router.get('/get-initiative/:id', userController.fetchInitiativeById);

// CIRCULARS
router.get('/get-circulars', userController.fetchCirculars);
router.get('/get-circular/:id', userController.fetchCircularById);

// CONTACT MESSAGE
router.post('/submit-contact-message', userController.submitContactMessage);

// APPLICATION (submit only)
router.post('/submit-application', userController.submitApplication);

module.exports = router;
