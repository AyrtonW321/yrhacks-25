import Food from "./Food"

function Category({name, children}){
  return (
      <div className='categoryContainer'>
        <h3 className="categoryName">{name}</h3>
        {children}
      </div>
  )
}

export default Category
