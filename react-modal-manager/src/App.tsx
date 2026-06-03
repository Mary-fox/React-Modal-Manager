import { useModal } from "./modal/useModal"

export default function App() {
  const { open, close } = useModal()

  const openParent = () => {
    open({
      id: "parent",
      onClose: () => close("parent"),
      closeOnEscape: false,
      content: (
        <div>
          <h1>Родительская модалка</h1>

          <button
            onClick={() =>
              open({
                id: "child",
                onClose: () => close("child"),
               content: (
                  <div>
                    <h2>Дочерняя модалка</h2>

                    <button onClick={() => close("child")}>
                    Закрыть
                    </button>
                  </div>
                )
              })
            }
          >
            открыть child
          </button>

          <button onClick={() => close("parent")}>
            закрыть
          </button>
        </div>
      ),
    })
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Тестируем модалки</h1>

      <button onClick={openParent}>
        Открыть модалку
      </button>
    </div>
  )
}