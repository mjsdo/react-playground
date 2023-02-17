import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// eslint-disable-next-line
import routes from '~react-pages';

import '~/App.css';

function App() {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
}

export default App;
