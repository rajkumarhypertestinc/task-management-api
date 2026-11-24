const Task = require('../models/taskitem');

const sendError = (res, err) => {
  if (err.code === 11000) return res.status(409).json({ error: 'Task already exists' });
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ error: err.message });
  res.status(500).json({ error: err.message });
};

exports.createTask = (req, res) => {
  Task.create(req.body).then((data) => res.status(201).json(data)).catch((err) => sendError(res, err));
};

exports.getTasks = (req, res) => {
  Task.find().then((data) => res.status(200).json(data)).catch((err) => sendError(res, err));
};

exports.getTaskById = (req, res) => {
  Task.findById(req.params.id)
    .then((data) => (data ? res.status(200).json(data) : res.status(404).json({ error: 'Not found' })))
    .catch((err) => sendError(res, err));
};

exports.updateTask = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then((data) => (data ? res.status(200).json(data) : res.status(404).json({ error: 'Not found' })))
    .catch((err) => sendError(res, err));
};

exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((data) => (data ? res.status(204).send() : res.status(404).json({ error: 'Not found' })))
    .catch((err) => sendError(res, err));
};