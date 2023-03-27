import Logo from '../assets/images/logo.svg';

const UserProfile = ({ user = {}, companyName = 'Company name' }) => {
    return (
        <div className="text-Gray-400 p-5 border-l-[1px] border-l-Gray-200 text-start text-sm">
            <p className="text-Black-600 mb-5 text-lg font-bold leading-normal">
                Offered By
            </p>
            <div>
                <img
                    src={Logo}
                    alt="innoloft logo"
                    loading="lazy"
                    className="mb-3"
                />
            </div>
            <div className="flex mb-7 items-center">
                <img
                    src={user.profilePicture}
                    className="rounded-full w-16 h-16"
                    alt="user profile picture"
                    loading="lazy"
                />
                <div className="ml-2">
                    <p className="font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
                    <p>{companyName}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
