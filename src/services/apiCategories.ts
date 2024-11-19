import { fetcher } from "../utils/fetcher";

const API_URL = "http://localhost:5555/api/categories";

export interface ICategory {
  title: string;
  _id?: string;
}

/**
 * This method is responsible for creating categories
 * @param category ICategory
 * @returns Promise<ICategory>
 */
export const createCategory = async (category: ICategory) => {
  return await fetcher<ICategory>({
    path: "/categories",
    method: "POST",
    body: category,
  });
};

/**
 * This method is responsible for fetching categories
 * @returns ICategory[]
 */
export const getCategories = async () => {
  return await fetcher<ICategory[]>({ path: "/categories", method: "GET" });
};
