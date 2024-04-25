import React, { Dispatch, SetStateAction } from 'react'
import styles from './Pagination.module.scss'

interface PaginationProps {
    firstIndex: number;
    lastIndex: number;
    elementsPerPage: number;
    totalElements: number;
    setCurrentPage: Dispatch<SetStateAction<number>>
}   

export const Pagination:React.FC<PaginationProps> = ({firstIndex, lastIndex, elementsPerPage,totalElements, setCurrentPage}) => {
    const pages = []

    for( let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++ )

    pages.push(i)

  return (
    <div className={styles.container}>
        <ul className={styles.pagination_list}>
            {pages.map((number) => (
                <li  key={number}><button onClick={() => setCurrentPage(number)}>{number}</button></li>
            ))}
        </ul>
    </div>
  )
}
