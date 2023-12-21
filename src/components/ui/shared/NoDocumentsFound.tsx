import { BirdIcon } from "lucide-react";

const NoDocumentsFound = () => {
  return (
    <div className="home-container">
      <h2 className="flex flex-col items-center text-light-4 my-auto md:h2-bold h-40 text-center w-full">
        <BirdIcon size="100" strokeWidth={1} />
        No documents
      </h2>
    </div>
  );
};

export default NoDocumentsFound;
