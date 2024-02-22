import React, { useState } from "react";
import { useGetPopularTvQuery } from "../services/TMDB";

const Dummy = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetPopularTvQuery({ page });

  return <div>Dummy</div>;
};

export default Dummy;
