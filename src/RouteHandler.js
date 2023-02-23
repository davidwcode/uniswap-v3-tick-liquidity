import { Routes, Route } from 'react-router-dom';
import Search from './Search';
import Dashboard from './Dashboard';

const RouteHandler = () => {
 return (
    <>
       <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Dashboard/>} />
       </Routes>
    </>
 );
};

export default RouteHandler;