const validateMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export default validateMiddleware;
