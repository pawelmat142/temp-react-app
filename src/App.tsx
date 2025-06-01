import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MailLogin from './views/MailLogin';
import MailRegister from './views/MailRegister';
import Register from './views/Register';
import Header from './views/Header';
import Home from './views/Home';
import PageOne from './views/PageOne';
import PageTwo from './views/PageTwo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Path } from './utils/path';
import Login from './views/Login';
import { UserProvider } from './providers/UserProvider';

const App: React.FC = () => {

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  useEffect(() => {
    toggleDarkMode();
  }, []);

  return (
    <UserProvider>
      <Router>
        <Header />

        <Routes>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.MAIL_LOGIN} element={<MailLogin />} />
          <Route path={Path.MAIL_REGISTER} element={<MailRegister />} />
          <Route path={Path.REGISTER} element={<Register />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.PAGE_ONE} element={<PageOne />} />
          <Route path={Path.PAGE_TWO} element={<PageTwo />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </UserProvider>
  );
};

export default App;