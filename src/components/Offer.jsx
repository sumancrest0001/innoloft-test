const Offer = ({
    logo,
    title,
    options,
    onDeleteHandler,
    children,
    editMode = false
}) => {
    return (
        <div className="text-Gray-400">
            <div className="flex items-start gap-2 text-base">
                <img src={logo} alt="icon" loading="lazy" />
                <div>
                    <p className="mb-3">{title}</p>
                    <div className="flex flex-wrap">
                        {options.map((option, index) => (
                            <span
                                className="py-1 mb-2 text-sm px-5 mr-2 bg-Gray-200 rounded-full"
                                key={index}
                                onDoubleClick={() =>
                                    editMode && onDeleteHandler(option)
                                }
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Offer;
