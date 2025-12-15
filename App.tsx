import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { Tools } from './pages/Tools';
import { PrivacyHub } from './pages/PrivacyHub';
import { ImageLab } from './pages/ImageLab';
import { Phishing } from './pages/Phishing';
import { FAQ } from './pages/FAQ';
import { Terms, Privacy } from './pages/Legal';
import { About } from './pages/About';
import { Docs } from './pages/Docs';
import { Analyzer } from './pages/Analyzer';
import { Stories } from './pages/Stories';
import { TempMail } from './pages/TempMail';
import { Hardening } from './pages/Hardening';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/hub" element={<PrivacyHub />} />
            <Route path="/lab" element={<ImageLab />} />
            <Route path="/phishing" element={<Phishing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/temp-mail" element={<TempMail />} />
            <Route path="/hardening" element={<Hardening />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;