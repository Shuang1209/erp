export type ScanResult = { code: string };

export interface PlatformAdapter {
  scanCode(): Promise<ScanResult>;
  uploadFile(path: string): Promise<string>;
  getStorage<T>(key: string): Promise<T | null>;
  setStorage<T>(key: string, value: T): Promise<void>;
  request<T>(url: string, options?: { method?: string; data?: unknown }): Promise<T>;
}

export const adapter: PlatformAdapter = {
  async scanCode() {
    return { code: 'MOCK-CODE' };
  },
  async uploadFile(path: string) {
    return `mock://upload/${path}`;
  },
  async getStorage() {
    return null;
  },
  async setStorage() {
    return;
  },
  async request(url) {
    return { url } as unknown as any;
  },
};
