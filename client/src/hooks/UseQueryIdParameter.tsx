import { useSearchParams } from "react-router-dom";

const useQueryIdParameter = () => {
  const [queryParameters] = useSearchParams();

  const idParam: string | null = queryParameters.get("id");

  return idParam != null ? parseInt(idParam) : -1;
};

export default useQueryIdParameter;
