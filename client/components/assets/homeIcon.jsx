const HomeIcon = ({ size = 20, color = "currentColor", strokeWidth = 1.5 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M6.5 7C7.96 5.54 9.59 4.42 10.7 3.74C11.5 3.25 12.5 3.25 13.3 3.74C14.41 4.42 16.04 5.54 17.5 7C20.67 10.17 20.5 12 20.5 15C20.5 16.41 20.39 17.6 20.27 18.46C20.15 19.37 19.36 20 18.44 20H17C15.9 20 15 19.1 15 18V16C15 15.2 14.68 14.44 14.12 13.88C13.56 13.32 12.8 13 12 13C11.2 13 10.44 13.32 9.88 13.88C9.32 14.44 9 15.2 9 16V18C9 19.1 8.1 20 7 20H5.56C4.64 20 3.85 19.37 3.73 18.46C3.61 17.6 3.5 16.41 3.5 15C3.5 12 3.33 10.17 6.5 7Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
