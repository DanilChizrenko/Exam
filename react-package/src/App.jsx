import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* сюда добавим позже другие страницы */}
      </Routes>
    </BrowserRouter>
  );
}
//Hello WOrld
export default App;
