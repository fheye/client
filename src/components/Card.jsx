const Card = ({ title, description, height }) => {
    return (
        <div className={`max-w-xl ${height} rounded overflow-hidden shadow-lg bg-white`}>
            <div className="px-6 py-2">
                <h2 className="font-bold text-xl mb-2">{title}</h2>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
    );
};

export default Card;
