const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonial.findOne().skip(rand);
    if (!test) res.status(404).json({ message: 'Not found...' });
    else res.json(test);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if (!test) res.status(404).json({ message: 'Not found...' });
    else res.json(test);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    if (!author || !text) {
      return res
        .status(404)
        .json({ message: 'Author and text are required...' });
    }
    const newTestimonial = new Testimonial({
      author: author,
      text: text,
    });
    await newTestimonial.save();
    res.json({ message: 'OK - post' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        author,
        text,
      },
    );
    if (!updatedTestimonial) res.status(404).json({ message: 'Not found...' });
    res.json({ message: 'OK - put' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      req.params.id,
    );
    if (deletedTestimonial) {
      res.json(deletedTestimonial);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
