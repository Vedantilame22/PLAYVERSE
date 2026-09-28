// ============================================================
// NEXORA — Application Routes
// ============================================================
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from '@/components/layout/AppShell';
import IntroPage from '@/modules/intro/IntroPage';
import HomePage from '@/modules/home/HomePage';
import ProfilePage from '@/modules/profile/ProfilePage';
import NetworkPage from '@/modules/network/NetworkPage';
import GamesPage from '@/modules/games/GamesPage';
import TeamsPage from '@/modules/teams/TeamsPage';
import CommunitiesPage from '@/modules/communities/CommunitiesPage';
import DiscoverPage from '@/modules/discover/DiscoverPage';
import OpportunitiesPage from '@/modules/opportunities/OpportunitiesPage';
import EventsPage from '@/modules/events/EventsPage';
import MessagingPage from '@/modules/messaging/MessagingPage';
import NotificationsPage from '@/modules/notifications/NotificationsPage';
import SettingsPage from '@/modules/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IntroPage />,
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { path: 'home', element: <HomePage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'network', element: <NetworkPage /> },
      { path: 'games', element: <GamesPage /> },
      { path: 'teams', element: <TeamsPage /> },
      { path: 'communities', element: <CommunitiesPage /> },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'opportunities', element: <OpportunitiesPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'messages', element: <MessagingPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
