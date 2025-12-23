import LogoImg from "./images/Logo.png";

type LogoProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
};

function Logo({
  width = 70,
  height = "auto",
  className = "",
  alt = "Logo",
}: LogoProps) {
  return (
    <img
      src={LogoImg}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

export default Logo;
