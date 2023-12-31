import { Outlet } from "react-router-dom";
import BottomBar from "@/components/ui/shared/BottomBar";
import LeftSideBar from "@/components/ui/shared/LeftSideBar";
import TopBar from "@/components/ui/shared/TopBar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSideBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
