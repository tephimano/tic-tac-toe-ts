import "./App.css";
import LoginPage from "./components/LoginPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GamePage from "./components/GamePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
      refetchOnWindowFocus: false,
      staleTime: 0,
      retry: false,
    },
    mutations: {
      // mutation options
    },
  },
});
function App() {
  return (
    <div className="app-content">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/game-page" component={GamePage} exact />
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
