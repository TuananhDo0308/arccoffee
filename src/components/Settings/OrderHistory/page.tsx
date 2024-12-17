import OrderItem from "./orderItem";

const orders = [
  {
    orderId: "#FWB127364372",
    date: "20.12.2023",
    price: "$4,756",
    status: "Pre-order",
  },
  {
    orderId: "#FWB125467980",
    date: "11.12.2023",
    price: "$499",
    status: "In transit",
  },
  {
    orderId: "#FWB139485607",
    date: "01.12.2023",
    price: "$1,234",
    status: "Delivered",
  },
  {
    orderId: "#FWB127364372",
    date: "20.12.2023",
    price: "$4,756",
    status: "Pre-order",
  },
  {
    orderId: "#FWB125467980",
    date: "11.12.2023",
    price: "$499",
    status: "In transit",
  },
  {
    orderId: "#FWB139485607",
    date: "01.12.2023",
    price: "$1,234",
    status: "Delivered",
  },{
    orderId: "#FWB127364372",
    date: "20.12.2023",
    price: "$4,756",
    status: "Pre-order",
  },
  {
    orderId: "#FWB125467980",
    date: "11.12.2023",
    price: "$499",
    status: "In transit",
  },
  {
    orderId: "#FWB139485607",
    date: "01.12.2023",
    price: "$1,234",
    status: "Delivered",
  },{
    orderId: "#FWB127364372",
    date: "20.12.2023",
    price: "$4,756",
    status: "Pre-order",
  },
  {
    orderId: "#FWB125467980",
    date: "11.12.2023",
    price: "$499",
    status: "In transit",
  },
  {
    orderId: "#FWB139485607",
    date: "01.12.2023",
    price: "$1,234",
    status: "Delivered",
  },{
    orderId: "#FWB127364372",
    date: "20.12.2023",
    price: "$4,756",
    status: "Pre-order",
  },
  {
    orderId: "#FWB125467980",
    date: "11.12.2023",
    price: "$499",
    status: "In transit",
  },
  {
    orderId: "#FWB139485607",
    date: "01.12.2023",
    price: "$1,234",
    status: "Delivered",
  },{
    orderId: "#FWB127364372",
    date: "20.12.2023",
    price: "$4,756",
    status: "Pre-order",
  },
  {
    orderId: "#FWB125467980",
    date: "11.12.2023",
    price: "$499",
    status: "In transit",
  },
  {
    orderId: "#FWB139485607",
    date: "01.12.2023",
    price: "$1,234",
    status: "Delivered",
  },{
    orderId: "#FWB127364372",
    date: "20.12.2023",
    price: "$4,756",
    status: "Pre-order",
  },
  {
    orderId: "#FWB125467980",
    date: "11.12.2023",
    price: "$499",
    status: "In transit",
  },
  {
    orderId: "#FWB139485607",
    date: "01.12.2023",
    price: "$1,234",
    status: "Delivered",
  },
];

export default function History() {
  return (
    <div className="rounded-xl w-[calc(100vh)] flex flex-col max-h-[calc(100vh-200px)] overflow-auto my-[100px] bg-white/10 text-white px-10 py-8 shadow-lg backdrop-blur-lg">
      <div className="gap-4 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          My orders
        </h2>
        <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
          <div>
            <label
              htmlFor="order-type"
              className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select order type
            </label>
            <select
              id="order-type"
              className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            >
              <option selected>All orders</option>
              <option value="pre-order">Pre-order</option>
              <option value="transit">In transit</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <span className="inline-block text-gray-500 dark:text-gray-400">
            {" "}
            from{" "}
          </span>
          <div>
            <label
              htmlFor="duration"
              className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select duration
            </label>
            <select
              id="duration"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            >
              <option selected>this week</option>
              <option value="this month">this month</option>
              <option value="last 3 months">the last 3 months</option>
              <option value="lats 6 months">the last 6 months</option>
              <option value="this year">this year</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6 flow-root sm:mt-8">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order, index) => (
            <OrderItem
              key={index}
              orderId={order.orderId}
              date={order.date}
              price={order.price}
              status={order.status}
            />
          ))}
        </div>
      </div>
      <nav
        className="mt-6 flex items-center justify-center sm:mt-8"
        aria-label="Page navigation example"
      >
        <ul className="flex h-8 items-center -space-x-px text-sm">
          <li>
            <a
              href="#"
              className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-4 w-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              100
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-4 w-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
