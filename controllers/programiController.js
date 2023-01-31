const Programi = require("../models/ProgramiModel");

exports.checkBody = (req, res, next) => {
  if (!req.body.emertimi || !req.body.fakulteti || !req.body.departamenti) {
    return res.status(400).json({
      status: "fail",
      message:
        "Mungon emertimi i  Departamentit ose i fakultetit ose departamentit",
    });
  }
  next();
};
exports.getAllProgrami = async (req, res) => {
  try {
    // EXECUTE QUERY

    const programet = await Programi.find();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: programet.length,
      data: {
        programet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProgrami = async (req, res) => {
  try {
    const programi = await Programi.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: {
        programi,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createProgrami = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newProgrami = await Programi.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        programi: newProgrami,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateProgrami = async (req, res) => {
  try {
    const programi = await Programi.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        programi,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteProgrami = async (req, res) => {
  try {
    await Programi.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
