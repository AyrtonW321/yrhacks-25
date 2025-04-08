function Food({ name , quantity}) {
    return (
        <div className="foodContainer">
          <p className="foodName">{name} ({quantity})</p>
        </div>
    )
  }
  
export default Food
  