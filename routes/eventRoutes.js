const router = require('express').Router();
const EventController = require('../controllers/eventController');

// Route for fetching the event info
router.post('/fetch/info', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchEventDetails(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the participants of an event
router.post('/fetch/participants', (req, res) => {
    let event_id = req.body.event_id;
    EventController.listOfParticipantsForEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the FAQs of an event
router.post('/fetch/faqs', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchFaqs(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the participants of a session
router.post('/session/fetch/participants', (req, res) => {
    let session_obj_id = req.body.session_obj_id;
    EventController.fetchParticipantsPresentInASession(session_obj_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the timetable for an event
router.post('/fetch/timeline', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchTimelineOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

router.post('/fetch/scannables', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchScannablesOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the session in an event
router.post('/fetch/sessions', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchSessionsOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the sponsors in an event
router.post('/fetch/sponsors', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchSponsorsOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;
