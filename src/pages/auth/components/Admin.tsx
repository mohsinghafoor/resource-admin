import React from "react"
import CatalogCover from "../../marketplace/components/catalog/CatalogCover"
import CategoryList from "../../marketplace/components/catalog/CategoryList"
import FeaturedList from "../../marketplace/components/catalog/FeaturedList"
import FourWideList from "../../marketplace/components/catalog/FourWideList"
import ThreeWideList from "../../marketplace/components/catalog/ThreeWideList"

function Admin() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
      }}
    >
      {/* <CatalogCover />
      <FourWideList />
      <ThreeWideList />
      <FeaturedList />
      
      <CategoryList /> */}
      Welcome to admin
    </div>
  )
}

export default Admin
