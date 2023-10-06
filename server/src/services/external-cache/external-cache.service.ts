export abstract class ExternalCacheSevice {
  abstract get(id: string): Promise<any>;

  abstract set(id: string, object: any): Promise<any>;

  abstract delete(id: string): Promise<any>;
}
