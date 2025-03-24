from ..models import MenuItem
from bson import ObjectId 

def getMenuById(id):
  try:
      item = MenuItem.objects.get(_id=ObjectId(id))  # Retrieve the item by _id
      return item
  except MenuItem.DoesNotExist:
      return None 