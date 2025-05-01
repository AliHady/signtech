export class HttpStatusUtil {
  static isSuccess(status: number): boolean {
    return status >= 200 && status < 300;
  }

  static isRedirect(status: number): boolean {
    return status >= 300 && status < 400;
  }

  static isClientError(status: number): boolean {
    return status >= 400 && status < 500;
  }

  static isServerError(status: number): boolean {
    return status >= 500 && status < 600;
  }

  static isError(status: number): boolean {
    return this.isClientError(status) || this.isServerError(status);
  }

  static getStatusText(status: number): string {
    const statusTexts: { [key: number]: string } = {
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
      204: 'No Content',
      301: 'Moved Permanently',
      302: 'Found',
      304: 'Not Modified',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      503: 'Service Unavailable'
    };

    return statusTexts[status] || 'Unknown Status';
  }
} 