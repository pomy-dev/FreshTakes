from djongo import models
from bson import ObjectId

class MenuItem(models.Model):
  _id = models.ObjectIdField(primary_key=True, default=ObjectId) 
  dish = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  time = models.CharField(max_length=100)
  description = models.TextField()
  image = models.TextField()

  class Meta:
    db_table = "Menu"  

  def __str__(self):
    return f'{self.name,self.category,self.price,self.time,self.description}'

class Activities(models.Model):
  _id = models.ObjectIdField(primary_key=True, default=ObjectId) 
  detail = models.CharField(max_length=5000)
  pagename = models.CharField(max_length=100)
  timestamp = models.CharField(max_length=100)

  class Meta:
    db_table = "activities"
