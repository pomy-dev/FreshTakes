from .get_menu_by_id import getMenuById

def update_item(id, new_menu):
  item = getMenuById(id)  # Fetch the item
  if item:
      for key, value in new_menu.items():  # Update fields dynamically
          setattr(item, key, value)
      item.save()  # Save changes
      return item
  return None