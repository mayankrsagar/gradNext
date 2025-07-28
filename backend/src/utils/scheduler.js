import dotenv from 'dotenv';
import cron from 'node-cron'; // ✅ Make sure to import cron

import Submission from '../models/Submission.js';
import { sendEmail } from './mailer.js';

dotenv.config();

// 🕒 Schedule the task to run every hour on the hour
cron.schedule('0 * * * *', async () => {
  const now = new Date();

  // 1: Remind un-opened submissions after 48h
  const cutoff = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  const subs1 = await Submission.find({
    status: 'sent',
    createdAt: { $lte: cutoff }
  });

  for (const sub of subs1) {
    await sendEmail({
      to: sub.email,
      subject: 'Reminder: Please open your selection email',
      html: `<p>Hi ${sub.name}, we noticed you haven't opened your selection email. Please check your inbox!</p>`
    });
    sub.updatedAt = now;
    await sub.save();
  }

  // 2: Reminder for opened but not clicked after 48h
  const subs2 = await Submission.find({
    status: 'opened',
    updatedAt: { $lte: cutoff }
  });

  for (const sub of subs2) {
    await sendEmail({
      to: sub.email,
      subject: 'Reminder: Next steps to proceed',
      html: `<p>Hi ${sub.name}, you opened the email but didn’t click the link. Please proceed here: <a href="${process.env.BASE_URL}/api/cohort/click/${sub._id}">Proceed to Payment</a></p>`
    });
    sub.updatedAt = now;
    await sub.save();
  }

  // 3: Final follow-up for clicked but not paid after 48h
  const subs3 = await Submission.find({
    status: 'clicked',
    updatedAt: { $lte: cutoff }
  });

  for (const sub of subs3) {
    await sendEmail({
      to: sub.email,
      subject: 'Final Reminder: Complete your payment',
      html: `<p>Hi ${sub.name}, this is your final reminder to complete the payment: <a href="https://example.com/payment">Pay Now</a></p>`
    });
    sub.updatedAt = now;
    await sub.save();
  }

  // ✅ Paid submissions are excluded from this process
});
