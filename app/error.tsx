"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-dvh flex items-center justify-center">
      <h1 className="text-center">{error.message}</h1>
    </div>
  );
}
