export type BaseReponse<T> = {
    data: T[];
    metadata: {
      page: number;
      size: number;
      total: number;
    };
  };
  
  export type ErrorResponse = {
    message: string;
    error: {
      code: number;
      message: string;
    };
  };
  
  export type PostResponse<T> = {
    data: T;
    code: number;
    message: string;
  };
  