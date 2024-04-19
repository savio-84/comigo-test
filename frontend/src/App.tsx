import { Header } from "./components/Header"
import { GlobalStyle } from './styles/global';
import { Home } from './pages/home';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Home />
    </>
  )
}

export default App
