import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MailLogin from './views/MailLogin';
import MailRegister from './views/MailRegister';
import Register from './views/Register';
import Header from './views/Header';
import Home from './views/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Path } from './utils/path';
import Login from './views/Login';
import { UserProvider } from './providers/UserProvider';
import AddPost from './views/AddPost';
import PostList from './views/PostList';
import { PostsProvider } from './providers/PostsProvider';
import Settings from './views/Settings';
import UsersView from './views/UsersView';

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
    <BrowserRouter>
      <UserProvider>
        <PostsProvider>
          <Header />

          <Routes>
            
            <Route path={Path.HOME} element={<Home />} />

            <Route path={Path.USERS} element={<UsersView />} />

            <Route path={Path.POSTS} element={<PostList />} />
            <Route path={Path.ADD_POST} element={<AddPost />} />

            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.REGISTER} element={<Register />} />
            <Route path={Path.MAIL_LOGIN} element={<MailLogin />} />
            <Route path={Path.MAIL_REGISTER} element={<MailRegister />} />
            <Route path={Path.SETTINGS} element={<Settings />} />

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
        </PostsProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;