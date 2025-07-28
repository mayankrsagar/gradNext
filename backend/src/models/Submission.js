import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    status: {
        type: String,
        enum: ['submitted', 'sent', 'opened', 'clicked', 'paid'],
        default: 'submitted'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    tracking: {
        opened: { type: Boolean, default: false },
        clicked: { type: Boolean, default: false }
    }
});

export default mongoose.model('Submission', SubmissionSchema);