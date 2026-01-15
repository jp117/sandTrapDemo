import React from "react";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "bottom";
  title?: string;
  children: React.ReactNode;
};

export function Drawer({ open, onOpenChange, side = "bottom", title, children }: DrawerProps) {
  if (!open) return null;
  const sideClass =
    side === "left"
      ? "left-0 top-0 h-full w-96"
      : side === "right"
      ? "right-0 top-0 h-full w-96"
      : "left-0 right-0 bottom-0 w-full";
  return (
    <div className="fixed inset-0 z-50" onClick={() => onOpenChange(false)}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`absolute bg-white shadow-2xl ${sideClass} rounded-t-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        ) : null}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

