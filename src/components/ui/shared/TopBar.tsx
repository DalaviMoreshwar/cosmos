import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link className="flex gap-3 items-center" to="/">
          <img
            src="/assets/images/cosmos-logo-white.png"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex">
          <Button
            variant="ghost"
            className="shad-button_ghost text-primary-600"
            onClick={() => signOut()}
          >
            <LogOut />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
