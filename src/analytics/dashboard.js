import ReactGA from 'react-ga';

const CATEGORY = 'DashboardEvent';

const ACTIONS = {
  filterProject: 'Filter Projects',
  filterProjectByStage: 'Filter Projects By Stage',
  toggleActionableProjects: 'Toggle Actionable Projects',
  viewProject: 'View Project',
};

const LABELS = {
  filter: 'Filter',
  projectStage: 'Stage',
  showActionable: 'Show Actionable Items',
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

  toggleActionableProjects: (stage, showActionable) => {
    const value = showActionable ? 1 : 0;
    ReactGA.event({
      category: CATEGORY,
      action: `${ACTIONS.projectStage}: ${stage}`,
      label: LABELS.showActionable,
      value,
    });
  },
};

export default LogDashboard;
