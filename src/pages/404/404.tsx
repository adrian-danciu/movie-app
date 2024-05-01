import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="grid content-height place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-text">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-background shadow-sm hover:opacity-70 "
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
