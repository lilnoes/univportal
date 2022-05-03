import classNames from "classnames";

export default function Notification({ color, fill }) {
  return (
    <svg
      className={fill}
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
    >
      <path d="M3.333 15.833V14.083H4.979V8.354Q4.979 6.646 6.021 5.302Q7.062 3.958 8.708 3.542V2.958Q8.708 2.417 9.083 2.042Q9.458 1.667 10 1.667Q10.542 1.667 10.917 2.042Q11.292 2.417 11.292 2.958V3.542Q12.938 3.958 13.969 5.302Q15 6.646 15 8.354V14.083H16.667V15.833ZM10 18.333Q9.292 18.333 8.812 17.854Q8.333 17.375 8.333 16.667H11.667Q11.667 17.375 11.188 17.854Q10.708 18.333 10 18.333Z" />
    </svg>
  );
}