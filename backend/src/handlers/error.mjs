const errorHandler = (error, request, response, next) => {
  console.error(error);
  response.status(500).json({
    ok: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;