import base64
from ..models import MenuItem

def getAllMenu():
  try:
    # Fetch all meals from the database
    meals = MenuItem.objects.all()

    # List to hold all the meals with image data in Base64 format
    meals_data = []

    for meal in meals:
        # Convert binary image data to Base64
        image_data = meal.image
        image_base64 = base64.b64encode(image_data).decode('utf-8')

        # Append meal data to the list
        meals_data.append({
            "id": str(meal._id),  # Convert ObjectId to string if needed
            "category": meal.category,
            "dish": meal.dish,
            "price": meal.price,
            "time": meal.time,
            "description": meal.description,
            "image": f"data:image/jpeg;base64,{image_base64}"  # Base64 encoded image
        })
        # print(f"====meal Id :[{meal._id}]===")
    # Return the list of meals as a JSON response
    return meals_data

  except Exception as e:
    return print({"error": str(e)})