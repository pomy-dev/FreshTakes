from ..models import MenuItem
from bson import Binary
import base64

def addmeal(category,dish,price,time,description,image):

  # Convert image to base64 string
  # binaryImage = base64.b64encode(image).decode("utf-8")
  # Save data to MongoDB
  menu_item = MenuItem(
    category=category,
    dish=dish,
    price=price,
    time=time,
    description=description,
    image=Binary(image) 
    # image=binaryImage 
  )
  menu_item.save()

  print("===============Selected Category==============");
  print(category);