export class ResponseProvider {

  static success(res, data, message = "Operación exitosa") {
    return res.status(200).json({
      status: "success",
      message,
      data,
    });
  }

  static error(res, error, message = "Error interno del servidor") {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message,
      error: error.message || error,
    });
  }

  static notFound(res, message = "Resource not found") {
    return res.status(404).json({
      status: "error",
      message,
    });
  }
}