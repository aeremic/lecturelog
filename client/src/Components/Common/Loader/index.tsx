import ReactLoading from "react-loading";

const Loader = ({
  type,
  color,
  height,
  width,
}: {
  type: any;
  color: string;
  height: number;
  width: number;
}) => <ReactLoading type={type} color={color} height={height} width={width} />;

export default Loader;
