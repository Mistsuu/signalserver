const { TestController } = require("controllers");

module.exports = (req, res) => {
  // TestController.testModel()
  //   .then(data => {
  //     console.log("success!");
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.log("damn, no!");
  //     console.log(err);
  //   })

  console.log("============ TEST ROUTE ============");
  console.log(req.body);
  console.log("====================================");
  console.log();

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