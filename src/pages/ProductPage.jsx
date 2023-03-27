import { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import businessIcon from '../assets/images/business.svg';
import technologyIcon from '../assets/images/technology.svg';
import costIcon from '../assets/images/cost.svg';
import rtlIcon from '../assets/images/rtl.svg';
import Offer from '../components/Offer';
import { Link } from 'react-router-dom';
import { getRequest } from '../utilities/httpRequest';
import { useSelector } from 'react-redux';

const ProductPage = () => {
    const [product, setProduct] = useState({});
    const appConfig = useSelector((state) => state.configuration);
    const categories = (product?.categories || []).map((category) => category.name);
    const businessModels = (product?.businessModels || []).map(
        (businessModel) => businessModel.name
    );

    //extracted videoId from youtube short url.
    const youtubeID = (product?.video || '').split('v=')[1];

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productDetail = await getRequest(
                    'https://api-test.innoloft.com/product/6781/'
                );
                setProduct(productDetail);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, []);

    return (
        <div className="max-w-[1130px] mx-auto text-Gray-400 p-5">
            <div className="flex justify-between items-center mb-4">
                <p>Offer</p>
                <Link
                    to={'/product/edit'}
                    className="py-1 px-2 rounded-[6px] text-white bg-Primary-600"
                >
                    Edit
                </Link>
            </div>
            <div
                className={
                    appConfig.hasUserSection
                        ? 'card md:grid md:grid-cols-2 xl:grid-cols-3'
                        : 'card'
                }
            >
                <div className="xl:col-start-1 xl:col-end-3">
                    <img
                        src={product.picture}
                        alt={product?.name}
                        className="w-full"
                    />
                    <div className="p-5">
                        <h2
                            className="text-Black-600 mb-2 font-bold text-base"
                            style={
                                appConfig.mainColor && { color: appConfig.mainColor }
                            }
                        >
                            {product?.name}
                        </h2>
                        <div
                            style={
                                appConfig.mainColor && { color: appConfig.mainColor }
                            }
                            dangerouslySetInnerHTML={{
                                __html: product?.description
                            }}
                        ></div>
                    </div>
                </div>
                {appConfig.hasUserSection ? (
                    <UserProfile user={product?.user} />
                ) : null}
            </div>
            <div className="card px-5 py-8 md:p-5">
                <h4 className="text-base text-Black-600 font-bold mb-5">Video</h4>
                <div className="max-h-[400px] max-w-[715px] mx-auto w-full relative">
                    <iframe
                        className="w-full"
                        width={715}
                        height={400}
                        title="Youtube player"
                        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                        src={`https://youtube.com/embed/${youtubeID}?autoplay=0`}
                    />
                </div>
            </div>
            <div className="card px-5 py-8">
                <h4 className="text-base text-Black-600 font-bold mb-5">
                    Offer details
                </h4>
                <div className="grid md:grid-cols-2 md:gap-4 md:gap-y-4 gap-8 grid-cols-1">
                    <Offer
                        logo={technologyIcon}
                        title={'Technology'}
                        options={categories}
                    />
                    <Offer
                        logo={businessIcon}
                        title={'Business Models'}
                        options={businessModels}
                    />
                    <Offer
                        logo={rtlIcon}
                        title={'TRL'}
                        options={[product?.trl?.name]}
                    />
                    <Offer
                        logo={costIcon}
                        title={'Costs'}
                        options={[product?.investmentEffort]}
                    />
                </div>
            </div>
        </div>
    );
};
export default ProductPage;
