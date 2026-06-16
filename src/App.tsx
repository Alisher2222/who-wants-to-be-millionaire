import MainPage from "./page/MainPage";
import { AppProvider } from "./context/GameContext";

const App = () => {
  return (
    <AppProvider>
      <MainPage />
    </AppProvider>
  );
};

export default App;
