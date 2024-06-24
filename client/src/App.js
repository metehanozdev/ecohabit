import Routes from "./components/Routes";
import { UserContextProvider } from "./contexts/UserContext";
import UserContextProvider from './context/UserContextProvider';

/**
 *To avoid bloated App.js component, page routes created at Routes.js component.
 */

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
