import logo from "../../../assets/logo.png";
import { ILogoProps } from "../../../models/Props/ILogoProps";

const Logo: React.FC<ILogoProps> = ({ widthProp, heightProp }) => {
  const width: number = widthProp;
  const height: number = heightProp;
  return <img src={logo} width={width} height={height}></img>;
};

export default Logo;
