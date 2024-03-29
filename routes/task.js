const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'completed', 'in progress'], default: 'pending' },
  
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;