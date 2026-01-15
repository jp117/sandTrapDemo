import React from "react";
import { clsx } from "clsx";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, title, children }: DialogProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-xl rounded-xl bg-white shadow-xl"
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

export function DialogTrigger({
  asChild,
  children,
  onClick
}: {
  asChild?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <span onClick={onClick} className={clsx(asChild ? "" : "inline-block")}>
      {children}
    </span>
  );
}

