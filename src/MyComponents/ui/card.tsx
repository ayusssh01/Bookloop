import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow-md rounded-2xl border p-4">
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 border-b font-semibold text-lg text-gray-800">
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-gray-900">{children}</h2>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4 text-gray-700">{children}</div>;
}
