export interface Download {
    id?: string;
    url: string;
    userAgent: string;
    metadata: {
      title?: string;
      artist?: string;
      album?: string;
      year?: number;
      genre?: string;
      duration?: number;
      comment?: string;
      track?: {
        no?: number;
        of?: number;
      };
    };
  }
  