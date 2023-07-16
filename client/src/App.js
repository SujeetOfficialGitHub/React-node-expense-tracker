import './App.css';
import Header from './component/layout/Header';
import Router from './routes/router';

function App() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
