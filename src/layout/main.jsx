import SideMain from "./side-main";
import SideMenuBar from "./side-menu-bar";

const Main = () => {
  return (
    <main className="flex-1 p-2 flex text-sm">
      <SideMenuBar />
      <SideMain />
    </main>
  );
};

export default Main;
