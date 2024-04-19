import { Plus } from '@phosphor-icons/react';
import { Container, CreateTicketButton } from './styles';


export function ActionsMenu() {
  return (
    <Container>
      <CreateTicketButton>Abrir ticket <Plus color="#fff" size={18} /></CreateTicketButton>
    </Container>
  );
}