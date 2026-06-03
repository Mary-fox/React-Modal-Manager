import styled from 'styled-components'

export const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);

  display: ${({ visible }) => (visible ? 'flex' : 'none')};

  align-items: center;
  justify-content: center;

  z-index: 999;
`

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  min-width: 400px;
  max-width: 700px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;
`