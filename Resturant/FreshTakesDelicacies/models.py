from djongo import models
from bson import ObjectId

class MenuItem(models.Model):
  dish = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  serveTime = models.CharField(max_length=100)
  description = models.TextField()

  class Meta:
    db_table = "menus"  

  def __str__(self):
    return f'{self.name,self.category,self.price,self.serveTime,self.description}'
    
class Bookings(models.Model):
  id = models.ObjectIdField(primary_key=True, default=ObjectId) 
  date = models.CharField(max_length=100)
  client = models.CharField(max_length=100)
  status = models.CharField(max_length=100)
  contact = models.CharField(max_length=50)
  content = models.CharField(max_length=1000)

  def __str__(self):
    return f'{self.date, self.client,self.status,self.contact,self.content}'
  
class Messages(models.Model):
  id = models.ObjectIdField(primary_key=True, default=ObjectId) 
  client = models.CharField(max_length=100)
  email = models.CharField(max_length=100)
  content = models.CharField(max_length=1500)
  date = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.client,self.email,self.content,self.date}'