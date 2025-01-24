import { useNavigate } from 'react-router-dom';
import {
  DashboardContainer,
  Header,
  SubHeader,
  LinksContainer,
  DashboardLink,
} from './AdminDashboard.styled';
import { Badge } from '../Navbar/Navbar.styled';

export const AdminDashboard = (adminDashboardProps: {
  imagesAwaitingReview: number;
}) => {
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <Header>Welcome to the Admin Dashboard</Header>
      <SubHeader>
        Use the links below to access administrative tools and manage the Travel
        Tales website.
      </SubHeader>
      <LinksContainer>
        <DashboardLink onClick={() => navigate('/image-review')}>
          Image Review{' '}
          {adminDashboardProps.imagesAwaitingReview > 0 && (
            <Badge>{adminDashboardProps.imagesAwaitingReview}</Badge>
          )}
        </DashboardLink>
        <DashboardLink onClick={() => navigate('/users-review')}>
          Users Review
        </DashboardLink>
        <DashboardLink onClick={() => navigate('/addLocation')}>
          Add Locations
        </DashboardLink>
      </LinksContainer>
    </DashboardContainer>
  );
};
