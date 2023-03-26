import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorAlert message="This page doesn't exist!" />;
    }

    if (error.status === 401) {
      return <ErrorAlert message="You aren't authorized to see this" />;
    }

    if (error.status === 503) {
      return <ErrorAlert message=" 💔 Looks like our API is down" />;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <ErrorAlert message="Something went wrong !!! " />;
}
