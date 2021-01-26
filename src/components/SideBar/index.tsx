import React, { useCallback, useState, useMemo } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';

import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  Menu,
  MenuItem,
  SidebarFooter,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { ButtonMenu, Header, Container, ContentFooter } from './styles';

import logo from '../../assets/logo.svg';

const SideBarExample: React.FC = () => {
  const { signOut } = useAuth();
  const mql = window.matchMedia(`(min-width: 800px)`);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSetOpenSidebar = useCallback(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [sidebarOpen]);

  const mediaQueryChanged = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  useMemo(() => {
    mql.addListener(mediaQueryChanged);
  }, [mediaQueryChanged, mql]);

  return (
    <>
      {!mql.matches && (
        <ButtonMenu onClick={() => handleSetOpenSidebar()}>
          {sidebarOpen ? (
            <FiX color="#FC823F" size={26} />
          ) : (
            <FiMenu color="#FC823F" size={26} />
          )}
        </ButtonMenu>
      )}
      <Container>
        <ProSidebar
          toggled={sidebarOpen}
          breakPoint="md"
          width="250px"
          onToggle={() => handleSetOpenSidebar()}
        >
          <SidebarHeader>
            <Header>
              <img src={logo} alt="Logo" />
              <div>Fort Corporation</div>
            </Header>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem>
                <Link to="/establishments">Todos os estabelecimentos</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/establishments/create">
                  Adicionar estabelecimentos
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/" onClick={signOut}>
                  Sair
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <ContentFooter>
              <a target="blank" href="https://github.com/ramonmacedo">
                <FiGithub size={20} color="#FC823F" />
              </a>
              <a target="blank" href="https://www.linkedin.com/in/ramonmacedo/">
                <FiLinkedin size={20} color="#FC823F" />
              </a>
            </ContentFooter>
          </SidebarFooter>
        </ProSidebar>
      </Container>
    </>
  );
};

export default SideBarExample;
