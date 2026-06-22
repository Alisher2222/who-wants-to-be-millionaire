import MainPage from "./page/MainPage";
import Lobby from "./page/Lobby";
import { AppProvider } from "./context/GameContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import AddQuestion from "./page/AddQuestions";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Lobby /> },
    {
      path: "/quiz/new",
      element: <AddQuestion />,
    },
    {
      path: "/quiz/:id",
      element: (
        <AppProvider>
          <MainPage />
        </AppProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
