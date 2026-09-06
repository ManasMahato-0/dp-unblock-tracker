export type Entry = { td?: boolean; bu?: boolean; note?: string };
export type Entries = Record<string, Entry>;

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };
