from .get_menu_by_id import getMenuById

def deleteMenu(id):
  item = getMenuById(id)

  if item:
    item.delete()