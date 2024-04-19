import { Container, Menu, ActionsMenu } from './styles';
import logo from '../../assets/logo.svg';
import { ArrowClockwise, Building, CaretDown, Moon, User } from '@phosphor-icons/react';

export function Header() {
  return (
    <Container>
      <img src={logo} alt="Logo" />
      
      <Menu>
        <a href="">Inicio</a>
        <a href="">Comercial <CaretDown size={12} /></a>
        <a href="">Financeiro <CaretDown size={12} /></a>
        <a href="">Pessoal e ativos <CaretDown size={12} /></a>
        <a href="">Parametrizacao <CaretDown size={12} /></a>
      </Menu>

      <ActionsMenu>
        <button>
          <ArrowClockwise size={20} />
        </button>
        <Building color='#91BCDF' size={20} />
        <Moon color='#91BCDF' size={20} />
        <User color='#91BCDF' size={20} />
      </ActionsMenu>

    </Container>
  );
}