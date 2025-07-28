import Submission from '../models/Submission.js';
import { sendEmail } from '../utils/mailer.js';

export const submitForm = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const submission = new Submission({ name, email, phone });
    await submission.save();

    // Send initial selection email with tracking pixel
    const openUrl = `${process.env.BASE_URL}/api/cohort/open/${submission._id}`;
    const clickUrl = `${process.env.BASE_URL}/api/cohort/click/${submission._id}`;
    const html = `<p>Congratulations ${name}, you have been selected!</p>
                  <img src="${openUrl}" alt="" width="1" height="1" style="display:none;">
                  <p><a href="${clickUrl}">Click here</a> to proceed to payment.</p>`;

    await sendEmail({ to: email, subject: 'Selection Confirmation', html });
    submission.status = 'sent';
    submission.updatedAt = new Date();
    await submission.save();

    return res.status(201).json({ message: 'Submission received and email sent.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const trackOpen = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id);
    if (!submission) return res.status(404).end();

    if (!submission.tracking.opened) {
      submission.tracking.opened = true;
      submission.status = 'opened';
      submission.updatedAt = new Date();
      await submission.save();
    }

    // Return 1x1 transparent pixel
    const img = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgQCsb8YAAAAASUVORK5CYII=',
      'base64'
    );
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    return res.end(img);
  } catch {
    return res.status(500).end();
  }
};

export const trackClick = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id);
    if (!submission) return res.status(404).end();

    if (!submission.tracking.clicked) {
      submission.tracking.clicked = true;
      submission.status = 'clicked';
      submission.updatedAt = new Date();
      await submission.save();
    }

    // Redirect user to payment page
    return res.redirect('https://grad-next-six.vercel.app/payment-success');
  } catch {
    return res.status(500).end();
  }
};