import ReactGA from 'react-ga';

const CATEGORY = 'DashboardEvent';

const ACTIONS = {
  filterProject: 'Filter Projects',
  filterProjectByStage: 'Filter Projects By Stage',
  viewProject: 'View Project',
};

const LABELS = {
  filter: 'Filter',
  projectStage: 'Stage',
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

  filterProject: filter => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.filterProject,
      label: `${LABELS.filter}: ${filter}`,
    });
  },

  filterProjectByStage: stage => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.filterProject,
      label: `${LABELS.projectStage}: ${stage}`,
    });
  },
};

export default LogDashboard;
