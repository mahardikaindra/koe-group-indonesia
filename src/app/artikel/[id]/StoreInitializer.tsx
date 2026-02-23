"use client";

import { useEffect } from "react";
import { useArticleStore } from "../../../store/useArticleStore";

const StoreInitializer = ({ id }: { id: string }) => {
  const setArticleId = useArticleStore((state) => state.setArticleId);

  useEffect(() => {
    setArticleId(id);
  }, [id, setArticleId]);

  return null;
};

export default StoreInitializer;
