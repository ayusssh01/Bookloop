//src/components/ui/button.tsx
import React from "react";

export function Button2({ children, className, ...props }: any) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};