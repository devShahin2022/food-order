import './App.css';
import {RouterProvider} from "react-router-dom";
import router from './routes/Routes';
import 'react-photo-view/dist/react-photo-view.css';
function App() {
  const routes = router;
  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
