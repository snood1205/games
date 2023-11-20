import {FC} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {LinkToGame} from "./link-to-game";

export const Root: FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? " bg-gray-600" : "";

  return (
    <div className="flex min-h-screen">
      <nav className="bg-black text-white w-64 space-y-2 p-4">
        <Link to="/" className={`block p-2 rounded hover:bg-gray-700${isActive("/")}`}>
          Home
        </Link>
        <LinkToGame name="Connect Four" path="/connect-four" isActive={isActive}/>
        <LinkToGame name="Mastermind" path="/mastermind" isActive={isActive}/>
        <LinkToGame name="Tic Tac Toe" path="/tic-tac-toe" isActive={isActive}/>
      </nav>

      {/* Outlet for rendering child routes */}
      <div className="flex-grow bg-gray-100 p-4">
        <Outlet/>
      </div>
    </div>
  );
};
