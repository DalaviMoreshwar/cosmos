import { Models } from "appwrite";
import NoDocumentsFound from "@/components/ui/shared/NoDocumentsFound";
import PostCard from "@/components/ui/shared/PostCard";
import Spin from "@/components/ui/shared/Spin";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { GalleryVerticalIcon } from "lucide-react";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError,
  } = useGetRecentPosts();

  if (isError) return;

  if (posts?.documents.length === 0) return <NoDocumentsFound />;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="flex items-center gap-3 h3-bold md:h2-bold text-left w-full">
            <GalleryVerticalIcon />
            {posts?.documents && "Feeds"}
          </h2>
          {isPostLoading && !posts ? (
            <Spin />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.caption} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
