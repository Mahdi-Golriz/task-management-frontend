import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Footer from "./components/Footer";
import CategoryForm from "./components/CategoryForm";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <Header />
      <Form />
      <List />
      <Footer />
    </div>
  );
};

export default App;
