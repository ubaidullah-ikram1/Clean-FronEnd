// ** React Imports

import { Fragment, useState, useEffect, useLayoutEffect, useContext } from 'react'
import Basemap from './map/basemap'
import BlogSidebar from './BlogSidebar'

const BlogList = () => {
  // ** States
 
  
  return (
    <Fragment>
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
           <Basemap/>
          </div>
        </div>
        <BlogSidebar  />
      </div>
    </Fragment>
  )
}
export default BlogList
