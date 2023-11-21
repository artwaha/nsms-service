import React from "react";
import Header from "./Header";
import Footer from "./footer";
import Seo from "./seo";

const ErrorPage = () => {
  return (
    <div className="p-2 flex flex-col container min-h-screen mx-auto item">
      <Seo title="Error Page" description="Error Page" />
      <Header />
      <div className="p-2 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold mb-6">Oops..!</h1>
        <p>Sorry, the page you're looking for is not available.</p>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
