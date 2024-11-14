import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Footer from "./components/Footer";
import CategoryForm from "./components/CategoryForm";
import { CategoriesProvider } from "./context/categoriesContext";
import { TasksProvider } from "./context/tasksContext";

const App: React.FC = () => {
  return (
    <CategoriesProvider>
      <TasksProvider>
        <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
          <Header />
          <Form />
          <List />
          <Footer />
        </div>
      </TasksProvider>
    </CategoriesProvider>
  );
};

export default App;
