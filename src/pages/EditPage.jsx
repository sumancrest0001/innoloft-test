import { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import businessIcon from '../assets/images/business.svg';
import technologyIcon from '../assets/images/technology.svg';
import costIcon from '../assets/images/cost.svg';
import rtlIcon from '../assets/images/rtl.svg';
import Offer from '../components/Offer';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { addRtlList } from '../redux/actions';
import { getRequest, putRequest } from '../utilities/httpRequest';
import Select from 'react-select';

const EditPage = () => {
    const [product, setProduct] = useState({});

    const dispatch = useDispatch();
    const appConfig = useSelector((state) => state.configuration);

    let rtlList = useSelector((state) => state.rtlList);

    async function handleEditProduct() {
        const data = {
            description: product.description,
            name: product.name,
            video: product.video,
            categories: product.categories,
            businessModels: product.businessModels,
            trl: product.trl.id,
            investmentEffort: product.investmentEffort
        };
        try {
            await putRequest('https://api-test.innoloft.com/product/6781/', data);
        } catch (error) {
            console.log(error);
        }
    }

    function onAddBusinessModels(e) {
        const businessModel = e.target.value;
        setProduct((prev) => ({
            ...prev,
            businessModels: [...prev.businessModels, businessModel]
        }));
        e.target.value = '';
    }

    function onRemoveBusinessModels(option) {
        setProduct((prev) => ({
            ...prev,
            businessModels: prev.businessModels.filter((item) => item !== option)
        }));
    }

    function onRemoveCategory(option) {
        setProduct((prev) => ({
            ...prev,
            categories: prev.categories.filter((item) => item !== option)
        }));
    }

    function onAddCategories(e) {
        const category = e.target.value;
        setProduct((prev) => ({
            ...prev,
            categories: [...prev.categories, category]
        }));
        e.target.value = '';
    }

    function handleTrlChange(data) {
        setProduct((prev) => ({
            ...prev,
            trl: data
        }));
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productDetail = await getRequest(
                    'https://api-test.innoloft.com/product/6781/'
                );
                const formattedData = {
                    categories: productDetail.categories.map((item) => item.name),
                    businessModels: productDetail.businessModels.map(
                        (item) => item.name
                    ),
                    trl: {
                        ...productDetail.trl,
                        value: productDetail.trl.id,
                        label: productDetail.trl.name
                    }
                };
                if (!rtlList.length) {
                    let trls = await getRequest(
                        'https://api-test.innoloft.com/trl/'
                    );
                    trls = trls.map((item) => ({
                        ...item,
                        value: item.id,
                        label: item.name
                    }));
                    dispatch(addRtlList(trls));
                }
                setProduct({ ...productDetail, ...formattedData });
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
                    to={'/product'}
                    className="py-1 px-2 rounded-[6px] text-white bg-Primary-600"
                >
                    View Offer
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
                        <input
                            value={product.name}
                            className="card w-full px-4 py-2"
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                        <ReactQuill
                            theme="snow"
                            value={product.description || ''}
                            onChange={(value) =>
                                setProduct((prevState) => ({
                                    ...prevState,
                                    description: value
                                }))
                            }
                        />
                    </div>
                </div>
                {appConfig.hasUserSection ? (
                    <UserProfile user={product?.user} />
                ) : null}
            </div>
            <div className="card px-5 py-8 md:p-5">
                <h4 className="text-base text-Black-600 font-bold mb-5">Video</h4>
                <div className="max-h-[400px] max-w-[715px] mx-auto w-full relative">
                    <input
                        value={product.video}
                        className="card w-full px-4 py-2"
                        onChange={(e) =>
                            setProduct({ ...product, video: e.target.value })
                        }
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
                        options={product?.categories || []}
                        onDeleteHandler={onRemoveCategory}
                        editMode
                    >
                        <input
                            type={'text'}
                            onBlur={onAddCategories}
                            placeholder="new Label"
                            className="card w-full px-4 py-2"
                        />
                    </Offer>
                    <Offer
                        logo={businessIcon}
                        title={'Business Models'}
                        options={product?.businessModels || []}
                        onDeleteHandler={onRemoveBusinessModels}
                        editMode
                    >
                        <input
                            type={'text'}
                            onBlur={onAddBusinessModels}
                            placeholder="new Label"
                            className="card w-full px-4 py-2"
                        />
                    </Offer>
                    <Offer
                        logo={rtlIcon}
                        title={'TRL'}
                        options={product?.trl?.name ? [product?.trl?.name] : []}
                    >
                        <Select
                            options={rtlList}
                            defaultValue={product?.trl}
                            isMulti={false}
                            onChange={handleTrlChange}
                        />
                    </Offer>
                    <Offer
                        logo={costIcon}
                        title={'Costs'}
                        options={[product?.investmentEffort]}
                    />
                </div>
                <div className="text-end">
                    <button
                        onClick={handleEditProduct}
                        className="py-1 px-2 rounded-[6px] text-white bg-Primary-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default EditPage;
