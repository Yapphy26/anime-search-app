
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Components
import TiltedCard from "@/components/TiltedCard";

// Utils
import { formatNumber, ordinalSuffix, formatTime } from "@/utils/formatter";

// UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { LoaderFive } from "@/components/ui/loader";

// Icons
import { IoArrowBack } from "react-icons/io5";
import { FaGripfire, FaRegStar, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { MdFavorite, MdGroups } from "react-icons/md";
import { BsCalendar2Check } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";

interface AnimeDetailProps {
  mal_id: number;
  title: string;
  title_japanese: string;
  type: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string
    };
  };
  status: string;
  episodes: number;
  rank: number;
  popularity: number;
  favorites: number;
  members: number;
  airing: boolean;
  aired: {
    from: string;
    string: string;
    to: string;
  };
  broadcast: {
    day: string;
    time: string;
    timezone: string;
  }
  year: number;
  genres: [
    {
      name: string;
    }
  ];
  score: number;
  scored_by: number;
  rating: string;
  duration: string;
  synopsis: string;
  background: string;
  url: string;
  studios: [
    {
      name: string;
    }
  ];
}

const AnimeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetailProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const data = await response.json();
        setAnimeDetail(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <Button variant="outline" onClick={() => navigate(-1)} className="text-sm! gap-1 px-3! ring-0!"><IoArrowBack /> Back</Button>
        <h1 className="text-xl! font-semibold mt-1.25">{animeDetail?.title_japanese}</h1>
      </div>
      {loading && (
        <div className="text-center pt-9">
          <LoaderFive text="Loading..." />
        </div>
      )}
      {error && (
        <div className="text-center pt-9">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <Link to={"/"}>
            <Button className="p-5 cursor-pointer">Back</Button>
          </Link>
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-5">
          <div className="relative md:max-w-[250px] w-full shrink-0">
            <div className="relative flex flex-col xs:flex-row items-center md:block w-full gap-0 md:gap-5">
              <TiltedCard
                imageSrc={animeDetail?.images.jpg.large_image_url}
                altText={animeDetail?.title}
                captionText={animeDetail?.title}
                containerHeight="360px"
                containerWidth="240px"
                imageHeight="360px"
                imageWidth="240px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-auto text-sm m-3 px-3 py-2 text-black bg-white/80 rounded-lg">
                    <p className="font-semibold">{animeDetail?.status}</p>
                    <p className="text-black/90">
                      {animeDetail?.type === "Movie"
                        ? "Movie"
                        : animeDetail?.type === "Music"
                          ? "Music"
                          : animeDetail?.episodes != null
                            ? `${animeDetail?.episodes} episodes`
                            : ""}
                    </p>
                  </div>
                }
              />
              <div className="w-full">
                <div className="flex flex-wrap gap-y-6 mt-5">
                  <div className="flex flex-col items-center w-[50%]">
                    <span className="flex font-bold text-3xl mb-2 text-yellow-400">{formatNumber(animeDetail?.rank || 0)}<span className="text-xs">{ordinalSuffix(animeDetail?.rank || 0)}</span></span>
                    <FaRankingStar fontSize={30} className="text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-400">Rank</span>
                  </div>
                  <div className="flex flex-col items-center w-[50%]">
                    <span className="font-bold text-3xl mb-2 text-red-400">{formatNumber(animeDetail?.popularity || 0)}</span>
                    <FaGripfire fontSize={30} className="text-red-400" />
                    <span className="text-sm font-semibold text-red-400">Popularity</span>
                  </div>
                  <div className="flex flex-col items-center w-[50%]">
                    <span className="font-bold text-3xl mb-2 text-pink-400">{formatNumber(animeDetail?.favorites || 0)}</span>
                    <MdFavorite fontSize={30} className="text-pink-400" />
                    <span className="text-sm font-semibold text-pink-400">Favorites</span>
                  </div>
                  <div className="flex flex-col items-center w-[50%]">
                    <span className="font-bold text-3xl mb-2 text-blue-400">{formatNumber(animeDetail?.members || 0)}</span>
                    <MdGroups fontSize={30} className="text-blue-400" />
                    <span className="text-sm font-semibold text-blue-400">Members</span>
                  </div>
                </div>
                <div className="hidden md:block mt-6">
                  <Broadcast
                    airing={animeDetail?.airing ?? false}
                    aired={
                      animeDetail?.aired
                        ? animeDetail.aired
                        : { from: "", string: "", to: "" }
                    }
                    broadcast={
                      animeDetail?.broadcast
                        ? animeDetail.broadcast
                        : { day: "", time: "", timezone: "" }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:px-3 flex flex-col gap-5 sm:gap-3">
            <div className="w-full flex justify-start items-center flex-wrap gap-2">
              <span className="font-semibold text-black/50 dark:text-white/50"><BsCalendar2Check /></span>
              {(animeDetail?.aired.from && <span className="text-sm font-semibold">{formatTime(animeDetail.aired.from)}</span>) || "-"}
            </div>
            <div className="w-full flex justify-start items-start gap-2">
              <span className="font-semibold text-black/50 dark:text-white/50">Tags:</span>
              <div className="flex justify-start items-center flex-wrap gap-2 mt-0.75">
              {animeDetail?.type && <Badge variant="default" className="bg-linear-[135deg,#f6339a_0%,#615fff_100%] border-none text-white">{animeDetail?.type}</Badge>}
              {animeDetail?.genres.map((genre) => {
                return (
                  <Badge key={genre.name} variant="default" className="bg-linear-[135deg,#f6339a_0%,#615fff_100%] border-none text-white">{genre.name}</Badge>
                );
              })}
              </div>
            </div>
            <div className="flex items-start gap-2 text-lg font-semibold">
              <span className="text-black/50 dark:text-white/50">English:</span>
              <h2>{animeDetail?.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-yellow-500">
              <span className="text-3xl font-bold">{animeDetail?.score || "N/A"}</span>
              <div className="relative flex gap-1 text-2xl ms-2">
                {[...Array(5)].map((_, i) => {
                  const totalScore = animeDetail?.score ?? 0;
                  const totalStars = (totalScore / 10) * 5;

                  return (
                    <div key={i} className="relative">
                      <FaRegStar className="text-yellow-500" />
                      {totalStars >= (i + 1)
                        ? (
                          <div className="absolute top-0 left-0 w-full overflow-hidden">
                            <FaStar className="text-yellow-500" />
                          </div>
                        ) : (totalStars > i && totalStars < (i + 1)) ? (
                          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${Math.round((totalStars - i) * 100)}%` }}>
                            <FaStar className="text-yellow-500" />
                          </div>
                        ) : (
                          ""
                        )
                      }
                    </div>
                  );
                })}
              </div>
              {animeDetail?.scored_by && <div className="place-self-end text-xs font-semibold text-yellow-500 sm:text-black/50 dark:text-yellow-500 sm:dark:text-white/50 mb-1">(based on {animeDetail.scored_by} votes)</div>}
            </div>
            <div className="w-full flex justify-start items-center gap-1 text-sm">
              <span className="font-semibold text-black/50 dark:text-white/50">Rating:</span>
              <p>{animeDetail?.rating}</p>
            </div>
            <div className="w-full flex justify-start items-center gap-1 text-sm">
              <span className="font-semibold text-black/50 dark:text-white/50">Duration:</span>
              <p>{animeDetail?.duration}</p>
            </div>
            <div className="block md:hidden">
              <Broadcast
                airing={animeDetail?.airing ?? false}
                aired={
                  animeDetail?.aired
                    ? animeDetail.aired
                    : { from: "", string: "", to: "" }
                }
                broadcast={
                  animeDetail?.broadcast
                    ? animeDetail.broadcast
                    : { day: "", time: "", timezone: "" }
                }
              />
            </div>
            {animeDetail?.synopsis && (
              <div className="w-full flex justify-start items-center flex-wrap gap-1 text-sm mt-3">
                <span className="font-semibold text-black/50 dark:text-white/50 w-full">Synopsis</span>
                <p className="whitespace-pre-line">{animeDetail?.synopsis}</p>
              </div>
            )}
            {animeDetail?.background && (
              <div className="w-full flex justify-start items-center flex-wrap gap-1 text-sm mt-3">
                <span className="font-semibold text-black/50 dark:text-white/50 w-full">Background</span>
                <p className="whitespace-pre-line">{animeDetail?.background}</p>
              </div>
            )}
            {animeDetail?.url && (
              <div className="w-full flex justify-start items-center flex-wrap gap-1 text-sm mt-3">
                <span className="font-semibold text-black/50 dark:text-white/50 w-full">More Info</span>
                <Link to={`${animeDetail?.url}`} target="_blank" className="flex gap-1 cursor-pointer hover:opacity-80"><GoLinkExternal className="mt-0.75" />Click here for more info</Link>
              </div>
            )}
            {animeDetail?.studios[0]?.name && (
              <Card className="mt-4 py-6 sm:py-4">
                <CardHeader className="gap-0 px-6 sm:px-5">
                  <CardTitle>
                    <span className="text-sm font-semibold text-black/50 dark:text-white/50">Studio</span>
                    <div className="w-full flex justify-start items-center gap-1 text-lg font-semibold">
                      {animeDetail?.studios.map((name) => {
                        return (
                          <p key={name.name}>{name.name}</p>
                        );
                      })}
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface BroadcastProps {
  airing: boolean;
  aired: {
    from: string;
    string: string;
    to: string;
  };
  broadcast: {
    day: string;
    time: string;
    timezone: string;
  }
}

const Broadcast = ({ airing, aired, broadcast }: BroadcastProps) => {
  return (
    <>
      {airing ? (
        <Card className="py-7 sm:py-5">
          <CardHeader className="gap-5 sm:gap-2 px-6 sm:px-5">
            <CardTitle className="mb-1">
              <span className="text-md font-semibold text-black/50 dark:text-white/50">Broadcast</span>
            </CardTitle>
            <CardDescription>
              <span className="text-sm">From</span>
              <p className="text-md text-primary font-semibold">{formatTime(aired.from)}</p>
            </CardDescription>
            <CardDescription>
              <span className="text-sm">Every</span>
              <p className="text-md text-primary font-semibold">{broadcast.day} at {(broadcast.time)}</p>
            </CardDescription>
            <CardDescription>
              <span className="text-sm">Timezone</span>
              <p className="text-md text-primary font-semibold">{broadcast.timezone}</p>
            </CardDescription>
          </CardHeader>
        </Card>
      ) : !aired.from ? (
        <Card className="py-5">
          <CardHeader className="gap-2 px-5">
            <CardTitle className="mb-1">
              <span className="text-md font-semibold text-black/50 dark:text-white/50">Broadcast</span>
            </CardTitle>
            <CardDescription>
              <span className="text-sm">Soon</span>
              <p className="text-md text-primary font-semibold">Coming Soon</p>
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="py-4">
          <CardHeader className="gap-2 px-5">
            <CardTitle>
              <span className="text-md font-semibold text-black/50 dark:text-white/50">Broadcast Ended</span>
            </CardTitle>
            <CardDescription>
              <span className="text-md">From</span>
              <p className="text-md text-primary font-semibold">{formatTime(aired.from || "")}</p>
              <span className="text-md">To</span>
              <p className="text-md text-primary font-semibold">{formatTime(aired.to || aired.from || "")}</p>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
  );
}

export default AnimeDetail;