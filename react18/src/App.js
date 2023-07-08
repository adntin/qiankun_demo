import { Suspense, lazy } from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Home from './Home';

const About = lazy(() => import('./About'));

const basename = window.__POWERED_BY_QIANKUN__ ? '/react18' : '/';

function App() {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <BrowserRouter basename={basename}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/About">About</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="About" element={<About />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
