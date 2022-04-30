export default function Inbox({ color, fill }) {
  return (
    <svg
      className={fill}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
    >
      <path d="M12 28.05H27.65V25.05H12ZM12 21.55H36V18.55H12ZM12 15.05H36V12.05H12ZM2.75 45.25V7.45Q2.75 5.55 4.125 4.125Q5.5 2.7 7.45 2.7H40.55Q42.45 2.7 43.875 4.125Q45.3 5.55 45.3 7.45V32.55Q45.3 34.45 43.875 35.85Q42.45 37.25 40.55 37.25H10.75Z" />
    </svg>
  );
}
