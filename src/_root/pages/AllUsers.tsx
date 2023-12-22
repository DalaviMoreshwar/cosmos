import { Button } from "@/components/ui/button";
import Spin from "@/components/ui/shared/Spin";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { UsersRoundIcon } from "lucide-react";

const AllUsers = () => {
  const { toast } = useToast();
  const {
    data: users,
    isPending: isUserLoading,
    isError: isUserError,
  } = useGetUsers(2);

  if (isUserLoading) return <Spin />;

  if (isUserError) {
    return toast({
      variant: "destructive",
      title: "Loading users Failed, please try again.",
      description: "Error user loading.",
    });
  }

  return (
    <div className="user-container">
      <div className="explore-inner_container">
        <h2 className="flex items-center gap-2 h3-bold md:h2-bold w-full">
          <UsersRoundIcon />
          All Users
        </h2>
      </div>
      <div className="user-grid">
        {users?.documents.map((user) => (
          <div key={user.$id} className="user-card">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="avatar"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col text-center">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
            <Button
              type="button"
              className="shad-button_primary"
              onClick={() => {}}
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
