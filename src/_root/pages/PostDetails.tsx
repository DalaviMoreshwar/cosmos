import { Button } from "@/components/ui/button";
import PostStats from "@/components/ui/shared/PostStats";
import Spin from "@/components/ui/shared/Spin";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { FileEditIcon, Trash2Icon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: post, isPending } = useGetPostById(id || "");

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <Spin />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <FileEditIcon className="text-primary-500" size={25} />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant={"ghost"}
                  className={`gosht_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <Trash2Icon className="text-red" size={25} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                {post?.creator.name}
              </p>
              <div className="flex-center gap-2 text-light-4">
                <p className="subtle-semibold lg:small-regular">
                  {multiFormatDateString(post?.$createdAt)}
                </p>
                -
                <p className="subtle-semibold lg:small-regular">
                  {post?.location}
                </p>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-medium">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-4">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
