import { Route, Routes, Navigate } from 'react-router-dom';
import Results from './Results';

function Pages() {
  return (
    <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route exact path='/search' element={<Results />} />
          <Route exact path='/images' element={<Results />} />
          <Route exact path='/news' element={<Results />} />
          <Route exact path='/videos' element={<Results />} />
        </Routes>
    </div>
  )
}

export default Pages;