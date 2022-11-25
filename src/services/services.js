import { urls } from "../constants/constants";

export const validReset = (array) => {
  array.forEach(item => document.getElementById(`${item}`)
    .dataset.valid = ""
  );
};

export const createMarkup = (value) => {
  return { __html: value };
};

export const showPassword = (ref) => {
  const attributeType = ref.current.getAttribute("type");
  ref.current.setAttribute("type", attributeType === "password" ? "text" : "password");
};

export const debounce = (callback) => {
  let timer;

  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback.apply(context, args);
    }, 1000);
  };
};

export const doFetch = async (url, { method, headers, body, ...restOptions } = {}) => {
  const createHeaders = () => {
    if (url === urls.checkIsAuth || url === urls.getMyData) {
      return {
        "Authorization": `${ localStorage.getItem("cinema_token") }`
      };
    } else {
      return {
        "Authorization": `Bearer ${ localStorage.getItem("cinema_token") }`
      };
    }
  };

  const basewOptions = Object.freeze({
    method: "get"
  });

  const appliedMethod = method || basewOptions.method;
  const appliedHeader = headers || createHeaders();
  let appliedBody;

  if (body && !(body instanceof FormData)) {
    appliedHeader["Content-Type"] = "application/json";
    appliedHeader["Authorization"] = `Bearer ${ localStorage.getItem("cinema_token") }`;
    appliedBody = JSON.stringify(body);
  }

  const res = await fetch(url, {
    method: appliedMethod,
    headers: appliedHeader,
    body: appliedBody,
    ...restOptions
  });
  return await res.json();
};

export const getTotalPrice = selectedSeats => {
  const prices = [];
  selectedSeats.forEach(item => prices.push(item.price));
  return prices.reduce((acc, price) => acc + price, 0);
};
