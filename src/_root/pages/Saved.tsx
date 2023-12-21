import GridPostList from "@/components/ui/shared/GridPostList";
import NoDocumentsFound from "@/components/ui/shared/NoDocumentsFound";
import Spin from "@/components/ui/shared/Spin";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";

const Saved = () => {
  const { user } = useUserContext();
  const { data, isFetching } = useGetSavedPosts();

  const savedPosts = data?.documents
    .filter((post) => post?.user?.$id === user.id)
    .map((item) => item.post);

  if (savedPosts?.length === 0 && isFetching === false)
    return <NoDocumentsFound />;

  if (isFetching) return <Spin />;

  return (
    <div className="saved-container">
      <GridPostList posts={savedPosts} showStats={false} />
    </div>
  );
};

export default Saved;
