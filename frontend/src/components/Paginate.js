import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ page, pages, keyword = '' }) => {

    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x+1} to={keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`}>
                    <Pagination.Item active={x + 1 === page} className="mx-2">{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}



export default Paginate
