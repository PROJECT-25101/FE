import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { unHoldSeat } from "../services/seat.schedule.service";
import { getSocket } from "../../socket/socket-client";
import { useAuthSelector } from "../store";

export const useUnHoldOnBack = (enableBlockPop: boolean = true) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const handled = useRef(false);
  const socket = getSocket();
  const userId = useAuthSelector((state) => state.user?._id);
  const { mutate } = useMutation({
    mutationFn: unHoldSeat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("SEAT"),
      });
    },
  });
  useEffect(() => {
    let handlePopState: ((event: PopStateEvent) => void) | null = null;

    if (enableBlockPop) {
      handlePopState = () => {
        if (handled.current) return;
        handled.current = true;

        const confirmLeave = window.confirm(
          "Bạn có chắc muốn quay lại? Ghế giữ sẽ bị huỷ.",
        );

        if (confirmLeave) {
          mutate();
          nav(-2);
        } else {
          window.history.pushState(null, "", window.location.href);
          handled.current = false;
        }
      };

      window.addEventListener("popstate", handlePopState);
    }

    const handlePageHide = () => {
      socket.emit("closeTabCheckout", { userId });
    };
    window.addEventListener("pagehide", handlePageHide);

    // Đẩy state để tránh rời trang
    window.history.pushState(null, "", window.location.href);

    return () => {
      if (handlePopState) {
        window.removeEventListener("popstate", handlePopState);
      }
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [enableBlockPop, socket, nav, mutate, userId]);
};
