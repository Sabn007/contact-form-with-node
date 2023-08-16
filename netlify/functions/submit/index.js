exports.handler = async (event) => {
  // Your API code here
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "Function executed successfully" }),
  };
  return response;
};
