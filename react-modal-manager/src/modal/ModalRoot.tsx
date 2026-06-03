import { createPortal } from 'react-dom';

import { ModalView } from './ModalView';
import { useModalContext } from './hooks';

export const ModalRoot = () => {
  const ctx = useModalContext();

  const topModal = ctx.sortedStack[ctx.sortedStack.length - 1];
// Рендерим модалку через portal вне дерева приложения.
  return createPortal(
// Показываем только верхнюю модалку.
// Остальные остаются в стеке, но не рендерятся.
    topModal ? (
      <ModalView
        key={topModal.id}
        modal={topModal}
        index={ctx.sortedStack.length}
        isTop
      />
    ) : null,
    document.body,
  );
};