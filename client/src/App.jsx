import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import NoPage from './pages/NoPage.jsx';
import Workbooks from './pages/workbooks.jsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path='workbooks' element={<Workbooks />}></Route>
                    <Route path='*' element={<NoPage />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
