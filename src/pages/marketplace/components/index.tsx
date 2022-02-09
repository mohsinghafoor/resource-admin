/* eslint-disable react/jsx-key */
import { Box } from "@chakra-ui/react"
import CatalogFooter from "./catalog/CatalogFooter"
import CatalogCover from "./catalog/CatalogCover"
import CatalogHeader from "./CatalogHeader"
import Categories from "./Categories"
import Lists from "./Lists"
import { useLocation } from "react-router-dom"
import MarketplaceListPage from "./MarketplaceListPage"
import DirectoriesPage from "./DirectoriesPage"
import States from "./catalog/States"
import OwnerType from "./catalog/OwnerType"
import FourWideList from "./catalog/FourWideList"
import ThreeWideList from "./catalog/ThreeWideList"
import FeaturedList from "./catalog/FeaturedList"
import CategoryList from "./catalog/CategoryList"
import CryptoList from "./catalog/CryptoList"
import { Fragment, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function Catalog() {
  const components = [
    <States />,
    <OwnerType />,
    <CatalogCover />,
    <FourWideList />,
    <ThreeWideList />,
    <FeaturedList />,
    <CategoryList />,
    <CryptoList />,
    <CatalogFooter />,
  ]
  const [component, setComponent] = useState(components)

  const location = useLocation()
  if (location.pathname === "/list/edit") {
    return (
      <Box w="full">
        <CatalogHeader />
        <MarketplaceListPage />
      </Box>
    )
  }
  if (location.pathname === "/marketplace/listings") {
    return (
      <Box w="full">
        <CatalogHeader />
        <DirectoriesPage />
      </Box>
    )
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(component)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setComponent(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="components" direction="vertical">
        {(provided) => {
          return (
            <Box w="full" {...provided.droppableProps} ref={provided.innerRef}>
              {component.map((item, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided) => {
                    return (
                      <ul
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <li> {item}</li>
                      </ul>
                    )
                  }}
                </Draggable>
              ))}
            </Box>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}

export default Catalog
