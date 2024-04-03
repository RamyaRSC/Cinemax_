import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams, useNavigate } from "react-router-dom";

import "./SearchResult.css";

export default function SearchResult() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&page=${pageNum}&api_key=55eeda8279baa495342e20191faf8cf7`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                setData(jsonData);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    const fetchNextPageData = () => {
        fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&page=${pageNum}&api_key=55eeda8279baa495342e20191faf8cf7`)
            .then((response) => response.json())
            .then((response) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...response?.results]
                    });
                    // console.log(data); //infinity scroll data 
                } else {
                    setData(response);
                }
                setPageNum((prev) => prev +1);
            })
    }

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);   

  return (
    <>
        <Navbar />
        {!loading && (
            <>
                {data?.results?.length > 0 ? (
                    <>
                        <div className="pageTitle">
                            {`Search ${
                                data?.total_results > 1
                                    ? "results"
                                    : "result"
                            } of '${query}'`}
                        </div>
                        <InfiniteScroll
                            className="content"
                            dataLength={data?.results?.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                        >
                            {data?.results.map((item, index) => {
                                if (item.media_type === "person") return;
                                return (
                                    <div key={index} className="result">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${
                                                item.poster_path || item.profile_path
                                            }`}
                                            alt={item.title || item.name}
                                            onClick={() => navigate(`/home/${item.id}`)}
                                            className="resultImage"
                                        />
                                        <div className="resultInfo">
                                            <p>
                                                {item.title || item.name}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </InfiniteScroll>
                    </>
                ) : (
                    <span className="resultNotFound">
                        Sorry, Results not found!
                    </span>
                )}
            </>
        )}
    </>
  )
}
