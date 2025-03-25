from djongo import models
from bson import ObjectId

class MenuItem(models.Model):
  _id = models.ObjectIdField(primary_key=True, default=ObjectId) 
  dish = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  time = models.CharField(max_length=100)
  description = models.TextField()
  image = models.BinaryField()

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