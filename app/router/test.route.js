module.exports = (req, res) => {
  if (req.hasOwnProperty("authData")) {
    res.status(200).json({
      status: 200, 
      elements: [
        'testing object',
        'hello there!'
      ],
      method: req.method,
      authData: req.authData,
    });
  } else {
    res.status(200).json({
      status: 200, 
      elements: [
        'testing object',
        'hello there!'
      ],
      method: req.method,
    });
  }
};