import GridPostList from "@/components/ui/shared/GridPostList";
import NoDocumentsFound from "@/components/ui/shared/NoDocumentsFound";
import Spin from "@/components/ui/shared/Spin";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { BookmarkCheckIcon } from "lucide-react";

const Saved = () => {
  const { user } = useUserContext();
  const { data, isFetching } = useGetSavedPosts();

  const savedPosts =
    data?.documents
      .filter((post) => post?.user?.$id === user.id)
      .map((item) => item.post) || [];

  if (savedPosts?.length === 0 && isFetching === false)
    return <NoDocumentsFound />;

  if (isFetching) return <Spin />;

  return (
    <div className="saved-container">
      <div className="explore-innter_container">
        <h2 className="h3-bold md:h2-bold text-left">
          {savedPosts?.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <BookmarkCheckIcon /> Saved Posts
            </div>
          )}
        </h2>
        <GridPostList posts={savedPosts} showStats={false} />
      </div>
    </div>
  );
};

export default Saved;
