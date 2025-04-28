import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './components/auth/AuthProvider';
import { SymbolProvider } from './components/tradingview/context/SymbolContext';
import { Header1 as Header } from './components/navigation/header';
import { Footerdemo } from './components/navigation/footer-section';
import Landing from './pages/Landing/Landing';
import Strategy from './pages/Strategy/Strategy';
import Markets from './pages/Markets/Markets';
import News from './pages/News/News';
import Education from './pages/Education/Education';
import Community from './pages/Community/Community';
import Price from './pages/Price/Price';
import SignIn from './pages/Auth/SignIn';
import Register from './pages/Auth/Register';
import Performance from './pages/Performance/Performance';
import Create from './pages/Create/Create';
import Following from './pages/Following/Following';
import Subscription from './pages/Subscription/Subscription';
import Support from './pages/Support/Support';
import Documentation from './pages/Documentation/Documentation';
import Changelog from './pages/Changelog/changelog';
import Alpaca from './pages/Alpaca/Alpaca';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <SymbolProvider>
          <Router>
            <div className='min-h-screen bg-gray-900 flex flex-col'>
              <Header />
              <main className='flex-1'>
                <Routes>
                  <Route path='/' element={<Landing />} />
                  <Route path='/strategy' element={<Strategy />} />
                  <Route path='/markets' element={<Markets />} />
                  <Route path='/news' element={<News />} />
                  <Route path='/education' element={<Education />} />
                  <Route path='/community' element={<Community />} />
                  <Route path='/price' element={<Price />} />
                  <Route path='/signin' element={<SignIn />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/performance/:strategyName' element={<Performance />} />
                  <Route path='/create' element={<Create />} />
                  <Route path='/following' element={<Following />} />
                  <Route path='/subscriptions' element={<Subscription />} />
                  <Route path='/support' element={<Support />} />
                  <Route path='/docs' element={<Documentation />} />
                  <Route path='/changelog' element={<Changelog />} />
                  <Route path='/alpaca' element={<Alpaca />} />
                </Routes>
              </main>
              <Footerdemo />
            </div>
          </Router>
        </SymbolProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
