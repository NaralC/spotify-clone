import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const getImageBySongId = (song: Song) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const supabaseClient = useSupabaseClient();

    if (!song) { return null; }
    
    const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(song.image_path);

    return imageData.publicUrl;
}

export default getImageBySongId;
