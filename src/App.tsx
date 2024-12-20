import React from "react";
import { Form, List, Footer, Header } from "@components";
import { CategoriesProvider, TasksProvider, ThemeProvider } from "@context";

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
