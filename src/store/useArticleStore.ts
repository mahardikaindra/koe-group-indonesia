import { create } from "zustand";

interface ArticleState {
  articleId: string;
  setArticleId: (id: string) => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
  articleId: "",
  setArticleId: (id) => set({ articleId: id }),
}));
