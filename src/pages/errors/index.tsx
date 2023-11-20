import {FC} from "react";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export const Errors: FC = () => {
  const error = useRouteError() as Error;
  console.error(error);
  const isRouterError = isRouteErrorResponse(error);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Error: {(isRouterError ? error.status : "Unexpected exception")}</h1>
      <p>{isRouterError ? error.message : "Something went wrong"}</p>
      {isRouterError && <p><i>{error.statusText}</i></p>}
    </div>
  );
};