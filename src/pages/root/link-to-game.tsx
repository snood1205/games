import {FC} from "react";
import {Link} from "react-router-dom";

interface Props {
  isActive: (path: string) => string;
  name: string;
  path: string;
}

export const LinkToGame: FC<Props> = ({isActive, name, path}: Props) => (
  <Link to={path} className={`block p-2 rounded hover:bg-gray-700${isActive(path)}`}>
    {name}
  </Link>
);