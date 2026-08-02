const getHelloMessage = (req, res) => {
  res.json({
    message: "Hello from PrepOnGo Backend!",
  });
};

module.exports = {
  getHelloMessage,
};