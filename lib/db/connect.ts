import mongoose from 'mongoose';

let cached = (global as any)._mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI environment variable');

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { dbName: uri.split('/').pop()?.split('?')[0] })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
