import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import GlobalHeader from './components/global/GlobalHeader';

function App() {
  return (
    <Router>
      <GlobalHeader />

      <main className="container mx-auto px-6 md:px-0">
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
