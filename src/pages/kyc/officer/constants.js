import React from 'react';
import Icon from '@digix/gov-ui/components/common/elements/icons/';

const iconStatus = [
  {
    status: 'PENDING',
    key: 'alarm',
  },
  { status: 'APPROVED', key: 'check' },
  { status: 'REJECTED', key: 'close' },
];

export const showStatusIcon = status => {
  const icon = iconStatus.find(i => i.status === status);
  return (
    <div>
      <Icon kind={icon.key} /> {status}
    </div>
  );
};
