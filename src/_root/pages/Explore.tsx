import { useEffect, useState } from "react";
import {
  GalleryHorizontalEndIcon,
  ListFilterIcon,
  SearchIcon,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import GridPostList from "@/components/ui/shared/GridPostList";
import SearchResults from "@/components/ui/shared/SearchResults";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPost,
} from "@/lib/react-query/queriesAndMutations";
import Spin from "@/components/ui/shared/Spin";

const Explore = () => {
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching } = useSearchPost(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue, fetchNextPage]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Spin />
      </div>
    );
  }

  const shouldShowSearchResult = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResult &&
    posts.pages.every((item) => item && item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="flex items-center gap-2 h3-bold md:h2-bold w-full">
          <GalleryHorizontalEndIcon />
          Search Posts
        </h2>
        <div className="flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4">
          <SearchIcon color="#555" />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <ListFilterIcon />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResult ? (
          <SearchResults
            isSearchFetching={isFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of Posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div className="mt-10" ref={ref}>
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Explore;
