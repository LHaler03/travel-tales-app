import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashboardContainer,
  Header,
  SubHeader,
  LinksContainer,
  DashboardLink,
} from './AdminDashboard.styled';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <Header>Welcome to the Admin Dashboard</Header>
      <SubHeader>
        Use the links below to access administrative tools and manage the Travel Tales
        website.
      </SubHeader>
      <LinksContainer>
        <DashboardLink onClick={() => navigate('/image-review')}>
          Image Review
        </DashboardLink>
        <DashboardLink onClick={() => navigate('/users-review')}>
          Users Review
        </DashboardLink>
        <DashboardLink onClick={() => navigate('/add-locations')}>
          Add Locations
        </DashboardLink>
      </LinksContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard;
