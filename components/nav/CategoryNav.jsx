import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../state_machine/actions/actions";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

function CategoryNav() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const dispatch = useDispatch();
  const allCategoriesState = useSelector(
    (state) => state.getAllCategoriesReducer
  );

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => dispatch(getAllCategories(res)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <div className="px-custom py-2 shadow-md">
      <button
        className="font-bold text-lg flex items-center gap-2 py-2 mb-2 px-3 rounded-md"
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
      >
        <p className="text-sm">All Categories</p>
        {isCategoryOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      <div
        className={`${
          isCategoryOpen ? "flex" : "hidden"
        }  items-center text-xs gap-2 transition`}
      >
        {allCategoriesState.data?.map((category, i) => (
          <Link
            href={`/${category}`}
            key={i}
            className="font-semibold first-letter:uppercase"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryNav;
