import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100vh;
  background-color: #3498db;
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
  transition: left 0.3s ease;
  z-index: 1000;
`;

const SidebarLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 1rem;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #84a7bf;
  }
`;



const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 999;
`;

const Img = styled.img`
  height: 100%;
`;

const Hamburguer = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
`;



const SidebarComponent = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <>
      <Header>
        <Hamburguer onClick={toggleSidebar}>&#9776;</Hamburguer>
        <Img src="./src/assets/Blogging-With-Students-1.png" alt="" />
      </Header>
      <Sidebar isOpen={isOpen} ref={sidebarRef}>
        <SidebarLink to="/">Cursos</SidebarLink>
        <SidebarLink to="/student">Estudantes</SidebarLink>
      </Sidebar>
     
    </>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return <SidebarComponent isOpen={isOpen} toggleSidebar={toggleSidebar} />;
};

export default Menu;
