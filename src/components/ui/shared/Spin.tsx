import { Loader } from "lucide-react";

const Spin = () => {
  return (
    <div className="flex-center w-full">
      <Loader strokeWidth={1.5} /> <span className="ml-2">Loading...</span>
    </div>
  );
};

export default Spin;
