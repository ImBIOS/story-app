// Import our custom CSS
import '../sass/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import * as bootstrap from 'bootstrap';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import Add from './pages/stories/add';
import Edit from './pages/stories/edit';
import { formatPath } from './utils';

const routes = {
  [formatPath('/', true)]: Dashboard,
  [formatPath('/stories/add.html', true)]: Add,
  [formatPath('/stories/edit.html', true)]: Edit,

  [formatPath('/auth/login.html', true)]: Login,
  [formatPath('/auth/register.html', true)]: Register,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  route.init();

  const isBootstrap = typeof bootstrap !== 'undefined';
  console.info(isBootstrap ? 'Bootstrap loaded' : 'Bootstrap not loaded');
});
