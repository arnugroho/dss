declare namespace API_TYPES {
  type DefaultList = {
    data?: any;
    total?: number;
    success?: boolean;
    page?: number;
    pageSize?: number;
  } & DefaultResponse;

  type TableParams = {
    current?: number;
    pageSize?: number;
  };

  type DefaultResponse = {
    status?: number;
    message?: string;
    data?: any;
  };

  type DefaultItemResponse = {
    uuid: string;
  };
}
