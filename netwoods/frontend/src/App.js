import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage, {loader as homePageLoader} from "./pages/Home";
import MoviesPage, {loader as MoviesPageLoader} from "./pages/Movies";
import SeriesPage, {loader as SeriesPageLoader} from "./pages/Series";
import ShowPage, {loader as showPageLoader} from "./pages/Show";
import ErrorPage from "./pages/Error";
import ShowCasePage, {loader as showCasePageLoader} from "./pages/Showcase";

const router = createBrowserRouter([
  {
    path : "/",
    element : <RootLayout/>,
    errorElement : <ErrorPage/>,
    children : [
      {
        path : "",
        element : <HomePage/>,
        loader: homePageLoader,
      },
      {
        path : "movie",
        children:[
          {
            path: "",
            element : <MoviesPage/>,
            loader: MoviesPageLoader,
          },
          {
            path : ":genreId",
            element: <ShowCasePage pageName="movie"/>,
            loader : showCasePageLoader,
          }
        ]
      },
      {
        path : "tv",
        children:[
          {
            path: "",
            element : <SeriesPage/>,
            loader: SeriesPageLoader,
          },
          {

            path : ":genreId",
            element: <ShowCasePage pageName="tv"/>,
            loader : showCasePageLoader,
          }
        ]
      },
      {
        path : "show/:showId",
        children: [
          {
            path : "",
            element : <ShowPage/>,
            loader: showPageLoader,
          },
        ]
      },
      {
        path : "search",
        element : <ShowCasePage pageName="search"/>,
        loader : showCasePageLoader,
      }
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router = {router}/>
  );
}

export default App;
