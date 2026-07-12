import { RefObject, useEffect } from "react";

export const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  onOutsideClick: () => void,
) => {
  // useEffect(() => {
  //   const handleClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (target.closest(".rmdp-container")) return;
  //     const isInside = refs.some((ref) => {
  //       return ref.current?.contains(target);
  //     });

  //     if (!isInside) {
  //       onOutsideClick();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, [refs, onOutsideClick]);
};
