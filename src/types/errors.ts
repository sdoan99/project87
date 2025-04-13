export class CustomError extends Error {
  constructor(
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = 'CustomError';
  }

  static fromSupabaseError(error: unknown): CustomError {
    if (error instanceof Error) {
      return new CustomError('SUPABASE_ERROR', error.message);
    }
    return new CustomError('UNKNOWN_ERROR', 'An unknown error occurred');
  }
}
