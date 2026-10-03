"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  labelledBy: string;
  onClose: () => void;
  className: string;
};

// The native top layer provides focus containment, Escape and an inert backdrop.
export function Modal({ children, labelledBy, onClose, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartedOutside = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement;
    const scrollContainers = [
      document.body,
      ...document.querySelectorAll<HTMLElement>(".snap-page, .snap-panel"),
    ];
    const previousOverflow = scrollContainers.map((element) => element.style.overflow);

    dialog.showModal();
    document.dispatchEvent(new Event("vhetra:modal-open"));
    scrollContainers.forEach((element) => { element.style.overflow = "hidden"; });

    return () => {
      dialog.close();
      scrollContainers.forEach((element, index) => {
        element.style.overflow = previousOverflow[index];
      });
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      aria-modal="true"
      className="vhetra-dialog fixed inset-0 m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-inherit outline-none backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab" || event.defaultPrevented) return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          "button, a[href], input, select, textarea, summary, [tabindex]",
        )).filter((element) => element.tabIndex >= 0 && !element.matches(":disabled") &&
          !element.closest("[inert], [hidden]") && element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onPointerDown={(event) => {
        pointerStartedOutside.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pointerStartedOutside.current && event.target === event.currentTarget) onClose();
        pointerStartedOutside.current = false;
      }}
    >
      <div className={`modal-content ${className}`}>{children}</div>
    </dialog>
  );
}
