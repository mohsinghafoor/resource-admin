import React from "react"
import CatalogCover from "./catalog/CatalogCover"
import CatalogFooter from "./catalog/CatalogFooter"
import CatalogHeader from "./CatalogHeader"
import Categories from "./Categories"
import Lists from "./Lists"

function Catalog() {
  return (
    <div>
      <CatalogHeader />
      <CatalogCover />
      <Lists />
      <Categories />
      <CatalogFooter />
    </div>
  )
}

export default Catalog
