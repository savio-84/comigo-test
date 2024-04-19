import { CaretRight, House } from '@phosphor-icons/react';
import { Container } from './styles';

export function BreadCrumbs() {
  return (
    <Container>
      <House size={12} weight="fill" />
      <CaretRight size={12} />
      <span>Atendimento ao cliente</span>
      <CaretRight size={12} />
    </Container>
  );
}