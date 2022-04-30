import classNames from "classnames";

export default function Dashboard({ color, fill }) {
  return (
    <svg
      className={fill}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
    >
      <path d="M25.2 18.95V3.75H44.25V18.95ZM3.75 26.45V3.75H22.8V26.45ZM25.2 44.15V21.4H44.25V44.15ZM3.75 44.15V28.9H22.8V44.15Z" />
    </svg>
  );
}
