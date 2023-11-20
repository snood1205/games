import {createBrowserRouter} from "react-router-dom";
import {ConnectFour, Errors, Root, TicTacToe} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Errors/>,
    children: [
      {path: "/tic-tac-toe", element: <TicTacToe/>},
      {path: "/connect-four", element: <ConnectFour/>},
    ]
  },
]);