
import { Link } from "react-router-dom";

const NavigationLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <span className="text-2xl font-bold text-purple-600">ZenFlow</span>
      </Link>
    </div>
  );
};

export default NavigationLogo;
