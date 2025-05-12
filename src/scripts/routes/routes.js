import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/login/login-page';
import AddStoryPage from '../pages/add/add-story-page';
import RegisterPage from '../pages/register/register-page';
import StoryDetailPage from '../pages/story-detail/story-detail-page';
import BookmarkPage from '../pages/bookmark/bookmark-page';
const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/register': new RegisterPage(),
  '/login': new LoginPage(),
  '/add': new AddStoryPage(),
  '/detail/:id': new StoryDetailPage(),
  '/bookmark': new BookmarkPage(),
};

export default routes;
