import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import LazyComponent from './components/Lazy';
const HomePage = LazyComponent(() => import('./pages/HomePage'));
const ProductPage = LazyComponent(() => import('./pages/ProductPage'));
const EditPage = LazyComponent(() => import('./pages/EditPage'));
import { useDispatch } from 'react-redux';
import { addConfiguration } from './redux/actions';
import { getRequest } from './utilities/httpRequest';
import Header from './components/Header';

function App() {
    const dispatch = useDispatch();
    const appID = import.meta.env.VITE_APP_ID || 1;

    useEffect(() => {
        const getConfiguration = async () => {
            try {
                const configuration = await getRequest(
                    `https://api-test.innoloft.com/configuration/${appID}/`
                );
                dispatch(addConfiguration(configuration));
            } catch (error) {
                console.log(error);
            }
        };
        getConfiguration();
    }, []);
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/product/edit" element={<EditPage />} />
            </Routes>
        </div>
    );
}

export default App;
