import ReactGA from 'react-ga';

const CATEGORY = 'DashboardEvent';

const ACTIONS = {
  viewProject: 'View Project',
};

const LABELS = {
  userType: 'User Type',
};

const LogDashboard = {
  viewProject: userType => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.viewProject,
      label: `${LABELS.userType}: ${userType}`,
    });
  },
};

export default LogDashboard;
