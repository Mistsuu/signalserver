const TestRoute = (req, res) => {
  console.log("is requesting...");

  res.status(200).json({
    status: 200, 
    elements: [
      'testing object',
      'hello there!'
    ],
    method: req.method,
  });
}

module.exports = TestRoute;