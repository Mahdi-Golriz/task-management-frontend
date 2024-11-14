const API_URL = "http://localhost:5555/api/categories";

export interface ICategory {
  title: string;
  _id: string;
}

export const createCategory: Function = async (
  category: ICategory
): Promise<ICategory> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
    // mode: "no-cors", // Testing only
  });

  if (!res.ok) {
    throw new Error(`Failed to create category: ${res.statusText}`);
  }

  const data: ICategory = await res.json();
  return data;
};

export const getCategories: Function = async (): Promise<ICategory[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Failed to create category: ${res.statusText}`);
  }

  const data: ICategory[] = await res.json();
  return data;
};
