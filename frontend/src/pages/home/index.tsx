import { ContentContainer } from './styles';
import { BreadCrumbs } from '../../components/Breadcrumbs';
import { ActionsMenu } from '../../components/ActionsMenu';

export function Home() {
  return (
    <ContentContainer>
      <BreadCrumbs />
      <hr />
      <ActionsMenu />
    </ContentContainer>
  );
}