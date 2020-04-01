// const models = require('../models/index')
exports.getAll = async (req, res) => {
  try {
    const test = "test route"
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json(err);
  }
};