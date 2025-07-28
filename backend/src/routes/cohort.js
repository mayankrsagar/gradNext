import express from 'express';

import {
  submitForm,
  trackClick,
  trackOpen,
} from '../controllers/emailWorkflow.js';

const router = express.Router();

// POST /api/cohort/submit
router.post('/submit', submitForm);

// GET pixel open: /api/cohort/open/:id
router.get('/open/:id', trackOpen);

// GET click link: /api/cohort/click/:id
router.get('/click/:id', trackClick);

export default router;