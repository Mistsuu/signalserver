const TestRoute = (req, res) => {
  res.status(200).json({
    status: 200, 
    elements: 'Hello Anh Em'
  });
}

module.exports = TestRoute;