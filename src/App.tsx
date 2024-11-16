import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Footer from "./components/Footer";
import { CategoriesProvider } from "./context/categoriesContext";
import { TasksProvider } from "./context/tasksContext";
import { ThemeProvider } from "./context/themeContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CategoriesProvider>
        <TasksProvider>
          <div className="flex flex-col items-center h-screen dark:bg-gray-800 bg-gray-100 p-4">
            <Header />
            <Form />
            <List />
            <Footer />
          </div>
        </TasksProvider>
      </CategoriesProvider>
    </ThemeProvider>
  );
};

export default App;
