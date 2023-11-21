import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/footer";
import Main from "./layout/main";

function App() {
  return (
    <div className="p-2 flex flex-col container min-h-screen mx-auto">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
