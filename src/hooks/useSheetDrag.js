"use client";
/**
 * useSheetDrag — pointer-drag to dismiss a bottom sheet.
 * Dismisses on >80px drag or a fast flick (velocity aware).
 */
import { useCallback, useRef, useState } from "react";

export default function useSheetDrag(onDismiss) {
  const [offset, setOffset] = useState(0);
  const state = useRef({ startY: 0, startT: 0, dragging: false, current: 0 });

  const onPointerDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return;
    state.current = { startY: e.clientY, startT: performance.now(), dragging: true, current: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!state.current.dragging) return;
    const dy = Math.max(0, e.clientY - state.current.startY);
    state.current.current = dy;
    setOffset(dy);
  }, []);

  const finish = useCallback(
    (e) => {
      if (!state.current.dragging) return;
      const dy = state.current.current;
      const dt = Math.max(1, performance.now() - state.current.startT);
      const velocity = dy / dt;
      state.current.dragging = false;
      setOffset(0);
      if (dy > 80 || (dy > 32 && velocity > 0.6)) onDismiss?.();
    },
    [onDismiss]
  );

  return { offset, handlers: { onPointerDown, onPointerMove, onPointerUp: finish, onPointerCancel: finish } };
}
