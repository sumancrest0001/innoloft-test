import { NavLink } from 'react-router-dom';
import InnoloftLogo from '../assets/images/innoloft-logo.svg';
import { useSelector } from 'react-redux';

const Header = () => {
    const appConfig = useSelector((state) => state.configuration);
    return (
        <div
            className="py-4 bg-Primary-600 px-4 "
            style={appConfig.mainColor && { backgroundColor: appConfig.mainColor }}
        >
            <header className="flex max-w-[1440px] mx-auto justify-between items-center">
                <div>
                    <img
                        className="w-[140px] h-7"
                        src={InnoloftLogo}
                        alt="company logo"
                        loading="lazy"
                    />
                </div>
                <ul className=" flex gap-10 text-white">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product">Product</NavLink>
                    </li>
                </ul>
            </header>
        </div>
    );
};

export default Header;
