import React from 'react'

interface props {
  currentPage: number,
  maxPage: number,
  handlerChangePage: any,
}

export const Pagination = (props: props) => {
  let pages: any[] = []

  // Обработка условия если у нас мало страниц
  if (props.maxPage < 4) {
    let i = 1
    while (i <= props.maxPage) {
      pages.push(i)
      i += 1
    }
  } else {
    // шаблоны отрисовки страниц
    if (props.currentPage === 1 || props.currentPage === 2) {
      pages = [1, 2, 3, 4, 5]
    }
    if (props.currentPage > 2 && props.currentPage <= props.maxPage - 2) {
      pages = [props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1, props.currentPage + 2]
    }
    if (props.currentPage === props.maxPage || props.currentPage === props.maxPage - 1) {
      pages = [props.maxPage - 4, props.maxPage - 3, props.maxPage - 2, props.maxPage - 1, props.maxPage]
    }
  }
  // Выключение кнопок в зависимости от текущей страницы
  const disabledStart = props.currentPage === 1 ? 'page-item disabled' : 'page-item'
  const disabledEnd = props.currentPage === props.maxPage ? 'page-item disabled' : 'page-item'

  // Если всего 1 страница, то не отображаем пагинацию
  if (props.maxPage == 1) {
    return <React.Fragment/>
  } else {
    return (
      <nav aria-label="Page navigation example text-body">
        <ul className="pagination justify-content-center">
          <li className={disabledStart} onClick={() => props.handlerChangePage(1)}>
            <a className="page-link" href="#" aria-disabled="true">First</a>
          </li>
          <li className={disabledStart} onClick={() => props.handlerChangePage(props.currentPage - 1)}>
            <a className="page-link" href="#" aria-disabled="true">Previous</a>
          </li>
          {pages.map((item) => {
            return item === props.currentPage
              ? <li className="page-item active" key={item} onClick={() => props.handlerChangePage(item)}><a
                className="page-link"
                href="#">{item}</a></li>
              : <li className="page-item" key={item} onClick={() => props.handlerChangePage(item)}><a
                className="page-link" href="#">{item}</a>
              </li>
          })}
          <li className={disabledEnd} onClick={() => props.handlerChangePage(props.currentPage + 1)}>
            <a className="page-link" href="#">Next</a>
          </li>
          <li className={disabledEnd} onClick={() => props.handlerChangePage(props.maxPage)}>
            <a className="page-link" href="#">Last</a>
          </li>
        </ul>
      </nav>
    )
  }
}