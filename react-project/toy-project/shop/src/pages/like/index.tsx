import { useState } from "react";
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { GET_CART } from "../../graphql/cart";

import CartItem from "../../components/cart/item";
import Pagination from "../../components/commons/pagination";

import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

const Like = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  const { data, isLoading, isError, error } = useQuery(QueryKeys.CART, () =>
    graphqlFetcher(GET_CART)
  );

  console.log("data-cart", data);

  const ITEMS_PER_PAGE = 3;
  const totalItems = data ? Object.values(data) : [];

  let totalPages = 1;
  let currentData = [];

  // Ensure there is data before proceeding with pagination logic
  if (totalItems.length > 0) {
    totalPages = Math.ceil(totalItems.length / ITEMS_PER_PAGE);

    // Get the data for the current page
    currentData = totalItems.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Toggle individual checkbox
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle all checkboxes
  const handleSelectAll = () => {
    const newState = !isAllChecked;
    setIsAllChecked(newState);
    const updatedCheckedItems = {};
    data.forEach((item) => {
      updatedCheckedItems[item.id] = newState;
    });
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <div className="flex items-start mb-5">
              {/* Checkbox */}
              <input
                type="checkbox"
                id="select-all"
                checked={isAllChecked}
                onChange={handleSelectAll}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="select-all"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Select All
              </label>
            </div>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {currentData &&
                currentData?.map((product) => (
                  <CartItem {...product} key={product.id} />
                ))}
            </ul>
            {/* 페이지 네비게이션 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">$99.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a
                    href="#"
                    className="ml-2 shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a
                    href="#"
                    className="ml-2 shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$8.32</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">$112.32</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default Like;
