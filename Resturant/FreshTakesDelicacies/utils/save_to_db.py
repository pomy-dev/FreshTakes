from ..models import MenuItem
from bson import Binary

def addmeal(category,dish,price,time,description,image):

  # Save data to MongoDB
  menu_item = MenuItem(
      category=category,
      dish=dish,
      price=price,
      time=time,
      description=description,
      image=Binary(image)
  )
  menu_item.save()

  print("===============Selected Category==============");
  print(category);