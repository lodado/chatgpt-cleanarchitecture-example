// Base Error Class for Clean Architecture
export class BaseError extends Error {
  constructor(params: {
    message?: string;
    originalError?: Error;
    propagateStack?: boolean;
  }) {
    const { originalError, message = "", propagateStack = true } = params;

    // Construct the final message
    let finalMessage = message;
    if (originalError) {
      finalMessage = `${message} ${originalError.message}`;
    }
    super(finalMessage);

    this.name = this.constructor.name;

    // Conditionally propagate stack trace
    if (propagateStack && originalError && originalError.stack) {
      this.stack = `${this.name} => ${originalError.stack}`;
    }
  }
}

// Entity Layer Error
export class EntityError extends BaseError {
  constructor(params: {
    message: string;
    originalError?: Error;
    propagateStack?: boolean;
  }) {
    super(params);
  }
}

// Repository Layer Error
export class RepositoryError extends BaseError {
  constructor(params: {
    message: string;
    originalError?: Error;
    propagateStack?: boolean;
  }) {
    super(params);
  }
}

// Use Case Layer Error
export class UseCaseError extends BaseError {
  constructor(params: {
    message: string;
    originalError?: Error;
    propagateStack?: boolean;
  }) {
    super(params);
  }
}

// Adapter Layer Error
export class AdapterError extends BaseError {
  constructor(params: {
    message: string;
    originalError?: Error;
    propagateStack?: boolean;
  }) {
    super(params);
  }
}

// Error Mappers Interfaces

// 매퍼 함수: Entity Layer -> Repository Layer
export function mapEntityErrorToRepositoryError(
  error: EntityError | Error
): RepositoryError {
  if (error instanceof EntityError) {
    return new RepositoryError({
      message: ``,
      originalError: error,
    });
  }
  return new RepositoryError({
    message: `${error.message}`,
    originalError: error,
  });
}

// 매퍼 함수: Repository Layer -> Use Case Layer

export function mapRepositoryErrorToUseCaseError(
  error: RepositoryError | Error
): UseCaseError {
  if (error instanceof RepositoryError) {
    return new UseCaseError({
      message: ``,
      originalError: error,
    });
  }
  // 일반 Error 인스턴스인 경우, 기본 UseCaseError로 변환
  return new UseCaseError({
    message: `${error.message}\n`,
    originalError: error,
  });
}

// 매퍼 함수: Use Case Layer -> Adapter Layer

export function mapUseCaseErrorToAdapterError(
  error: UseCaseError | Error
): AdapterError {
  if (error instanceof UseCaseError) {
    return new AdapterError({
      message: ``,
      originalError: error,
    });
  }
  // 일반 Error 인스턴스인 경우, 기본 AdapterError로 변환
  return new AdapterError({
    message: `${error.message}\n`,
    originalError: error,
  });
}
