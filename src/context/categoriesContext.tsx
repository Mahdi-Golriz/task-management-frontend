import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCategories, ICategory } from "../services/apiCategories";

const CategoriesContext = createContext<ICategory[]>([]);

interface CategoriesProviderProps {
  children: ReactNode;
}

const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
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
