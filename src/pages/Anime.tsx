import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Libs
import { cn } from "@/lib/utils";

// Utils
import { useGlobal } from "@/context/GlobalContext"

// UI
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { LoaderFive } from "@/components/ui/loader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Icons
import { FaGripfire, FaStar } from "react-icons/fa";
import { BsCalendar2Check } from "react-icons/bs";

interface AnimeProps {
  mal_id: number;
  title: string;
  type: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  aired: {
    from: string;
    string: string;
    to: string;
  };
  popularity: number;
  year: number;
  genres: [
    {
      name: string;
    }
  ];
  score: number;
}

interface AnimeListResponse {
  data: AnimeProps[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      per_page: number;
      total: number;
    };
    last_visible_page: number;
  }
}

const Anime = () => {
  const { animeSearchHistory, setAnimeSearchHistory, pageHistory, setPageHistory } = useGlobal();
  const [animeList, setAnimeList] = useState<AnimeProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(animeSearchHistory || "");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(pageHistory || 1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAnime = async (query: string) => {
    if (!query.trim()) {
      setAnimeList([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=12&page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }
      const data: AnimeListResponse = await response.json();
      setAnimeList(data.data);
      setTotalPages(Math.ceil(data.pagination.items.total / 12));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchAnime(searchTerm);
      setAnimeSearchHistory(searchTerm);
      setPageHistory(page);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    }
  }, [searchTerm, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnime(searchTerm);
  };

  return (
    <div className="relative py-[15vh]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#0a0a0a]"></div>
      <div className="relative max-w-sm w-full mx-auto mb-5">
        <div className=" mb-5">
          <h1 className="text-5xl! font-bold mb-2 text-center bg-linear-[0deg,black_-10%,#aaa_100%] dark:bg-linear-[0deg,grey_0%,#ddd_100%] bg-clip-text text-transparent font-bold">Anime Search</h1>
          <p className="text-sm text-black/80 dark:text-white/60 leading-[1.3] text-center">Search your favourite anime shows and movies.</p>
        </div>
        <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search anime..."
            className=""
          />
        </form>
      </div>

      {loading && (
        <div className="text-center pt-9">
          <LoaderFive text="Loading..." />
        </div>
      )}
      {error && <p className="text-color-red">Error: {error}</p>}
      {!loading && animeList.length > 0 && (
        <>
          <div className="w-full grid grid-flow-col-4 grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-9">
            {animeList.map((anime) => (
              <Link key={anime.mal_id} to={`/detail/${anime.mal_id}`} className="relative">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  className="rounded-[9px]"
                />
                <Card className="group border rounded-md gap-0 p-2 cursor-pointer">
                  <div className="relative rounded-sm overflow-hidden before:absolute before:block before:inset-0">
                    <div className="absolute w-full flex justify-start flex-wrap gap-1 p-2 z-1">
                      {anime.type && <Badge variant="default" className="text-[10px] bg-linear-[135deg,#f6339a_0%,#615fff_100%] border-none text-white">{anime.type}</Badge>}
                      {anime.genres.map((genre) => {
                        return (
                          <Badge key={genre.name} variant="default" className="text-[10px] bg-linear-[135deg,#f6339a_0%,#615fff_100%] border-none text-white">{genre.name}</Badge>
                        );
                      })}
                    </div>
                    <div className="relative w-full h-0 pb-[156.25%] after:absolute after:bg-linear-[180deg,#000000cc_0%,transparent_40%,transparent_80%,#000000cc_100%] after:block after:rounded-[5px] after:inset-[0px]">
                      <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-full h-full absolute top-0 left-0 object-cover border-none rounded-sm scale-101 group-hover:scale-125 transition duration-300 ease-initial"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 text-end p-2">
                      {anime.popularity && <span className="text-xs font-semibold text-rose-400 flex items-center gap-1"><FaGripfire />{anime.popularity}</span>}
                    </div>
                  </div>
                  <div className="my-3 mb-2 flex flex-col gap-1">
                    <h3 className="text-md font-semibold leading-[1.3] mb-2 line-clamp-1">{anime.title}</h3>
                    <div className="flex justify-between">
                      <div className="w-50 flex items-center gap-1">
                        <BsCalendar2Check className="text-xs text-black/60 dark:text-white/50" />
                        <span className="text-xs font-semibold text-black/60 dark:text-white/50">{anime?.aired.from ? formatTime(anime.aired.from) : "-"}</span>
                      </div>
                      <div className="w-50 flex items-center gap-1">
                        <FaStar className="text-xs text-orange-600 dark:text-yellow-500" />
                        <p className="text-xs font-semibold text-orange-600 dark:text-yellow-500">{anime.score || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          {animeList.length > 0 && (
            <Pagination className="relative text-center pt-10 pb-2">
              <PaginationContent className="gap-0 xs:gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    className={`${page <= 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === 1}
                    onClick={() => setPage(1)}
                    className="cursor-pointer"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {page > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) => {                      
                      const num = window.outerWidth < 342 && (page !== 1 || page !== totalPages) ? 0 : 1; 
                      return (
                        p !== 1 &&
                        p !== totalPages &&
                        Math.abs(p - page) <= num // show current, prev, next
                      )
                    }
                  )
                  .map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={page === p}
                        onClick={() => setPage(p)}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                {page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      isActive={page === totalPages}
                      onClick={() => setPage(totalPages)}
                      className="cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    className={`${page >= totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) || !loading && animeList.length == 0 && searchTerm && (
        <div className="pt-9 text-center">Couldn't find your anime {`>.<`}</div>
      )}
    </div>
  );
};

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const formatted = date.toLocaleString("en-US", {
    year: "numeric",
  });

  return formatted;
}

export default Anime;