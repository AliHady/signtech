import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

export interface NormalizedError {
  code: string;
  message: string;
  status: number;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  normalizeError(error: HttpErrorResponse): NormalizedError {
    if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
      // Client-side error
      return {
        code: 'CLIENT_ERROR',
        message: error.error.message,
        status: 0
      };
    }

    // Server-side error
    const errorResponse = error.error;
    return {
      code: this.getErrorCode(error.status),
      message: this.getErrorMessage(errorResponse),
      status: error.status,
      details: errorResponse
    };
  }

  private getErrorCode(status: number): string {
    switch (status) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 422:
        return 'VALIDATION_ERROR';
      case 429:
        return 'TOO_MANY_REQUESTS';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      case 503:
        return 'SERVICE_UNAVAILABLE';
      default:
        return 'UNKNOWN_ERROR';
    }
  }

  private getErrorMessage(errorResponse: any): string {
    if (typeof errorResponse === 'string') {
      return errorResponse;
    }
    if (errorResponse?.message) {
      return errorResponse.message;
    }
    if (errorResponse?.error) {
      return errorResponse.error;
    }
    return 'An unexpected error occurred';
  }
} 