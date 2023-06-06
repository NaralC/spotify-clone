import { Song } from "@/types";
import usePlayer from "./usePlayer";
import { useAuthModal } from "./useAuthModal";
import { useUser } from "./useUser";
import SubscriptionModal from "@/components/subscription-modal";
import { useSubscriptionModal } from "./useSubscriptionModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscriptionModal = useSubscriptionModal();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscriptionModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
