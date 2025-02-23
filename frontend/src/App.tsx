import { ApiProvider } from "./Context/ApiContext";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <div>
      <ApiProvider>
        <AppRoutes/>
      </ApiProvider>
    </div>
  );
};

export default App;

