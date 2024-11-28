import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCategories } from "@services";
import type { ICategory } from "@models/categories.model";

interface CategoriesContextProps {
  categories: ICategory[];
  addCategory: (category: ICategory) => void;
  fetchCategories: () => void;
}
// This context is used to share the available categories between different components
// it load the categories through an api
const CategoriesContext = createContext<CategoriesContextProps | undefined>(
  undefined
);

interface CategoriesProviderProps {
  children: ReactNode;
}

const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const addCategory = (category: ICategory) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, fetchCategories, addCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

const useCategories: Function = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined)
    throw new Error("useContext is used outside of the Provider");

  return context;
};

export { CategoriesProvider, useCategories };
