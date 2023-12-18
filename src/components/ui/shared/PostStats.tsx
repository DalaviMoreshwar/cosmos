import React, { useEffect, useState } from "react";
import {
  useDeleteSavedpost,
  useGetCurrentUser,
  useLikepost,
  useSavepost,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { checkIsLiked } from "@/lib/utils";
import { Loader } from "lucide-react";
import Spin from "./Spin";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikepost();
  const { mutate: savePost, isPending: isSavingPost } = useSavepost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedpost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    if (newLikes.includes(userId)) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };

  if (!isSaved) return <Spin />;
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-3 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/heart.svg"
          }
          alt="like"
          width={25}
          height={25}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-3">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader color="#04768a" />
        ) : (
          <img
            src={
              isSaved
                ? "/assets/icons/bookmark-check.svg"
                : "/assets/icons/bookmark.svg"
            }
            alt="like"
            width={25}
            height={25}
            onClick={(e) => handleSavePost(e)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
