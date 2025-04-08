import Food from './Food';
import Category from './Category';
import './Fridge.css';

function Fridge({ foodItems }) {
  return (
    <div className="fridgeGridContainer">
      <div className="categorySection">
        <Category name="Fruit" />
        <Category name="Vegetables" />
        <Category name="Meat" />
        <Category name="Dairy" />
        <Category name="Seafood" />
        <Category name="Grains" />
        <Category name="Legumes" />
        <Category name="Beverages" />
        <Category name="Baking" />
        <Category name="Condiments" />
        <Category name="Herbs & Spices" />
        <Category name="Oils & Fats" />
        <div className="fridgeGrid">
          {foodItems?.map((item, index) => (
            <div key={index} className="foodCategory">
              <Food name={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fridge;
