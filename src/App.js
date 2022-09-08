
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import Protected from './Protected';
import SearchProduct from './SearchProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route path='/login' element={<Login/>}> </Route>
       <Route path='/register' element={<Register/>}></Route>
       <Route path='/add' element={<Protected component={AddProduct}/>}></Route>
       <Route path='/update/:id' element={<Protected component={UpdateProduct}/>}></Route>
       <Route path='/searchProduct' element={<SearchProduct component={SearchProduct}/>} ></Route>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
