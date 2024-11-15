const Card = ({ title, description }) => {
    return (
      <div className="max-w-xl rounded overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{title}</h2>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2">
            #React
          </span>
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
            #Tailwind
          </span>
        </div>
      </div>
    );
  };
  
  export default Card;
  