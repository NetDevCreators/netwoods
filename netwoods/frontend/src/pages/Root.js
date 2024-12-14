import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import SkeletonMoviesSeries from "../components/UI/SkeletonMoviesSeries";
import SkeletonHomePage from "../components/UI/SkeletonHomePage";
import SkeletonShowPage from "../components/UI/SkeletonShowPage";
import SkeletonShowcase from "../components/UI/SkeletonShowcase";

const RootLayout = () => {
  const { state, location } = useNavigation();
  return (
    <>
        <ScrollRestoration />
        <Navbar />
        {state === "loading" && location.pathname === "/movie" && <SkeletonMoviesSeries />}
        {state === "loading" && location.pathname === "/tv" && <SkeletonMoviesSeries />}
        {state === "loading" && location.pathname === "/" && <SkeletonHomePage/>}
        {state === "loading" && location.pathname.includes("/show") && <SkeletonShowPage/>}
        {state === "loading" && location.search.includes("page") && <SkeletonShowcase/>}
        {state === "idle" && <Outlet />}
    </>
  );
};

export default RootLayout;
