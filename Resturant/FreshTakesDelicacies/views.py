from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from .utils.save_to_db import addmeal
from .utils.get_all_menu import getAllMenu
from .utils.update_menu import update_item
from .utils.delete_menu import deleteMenu

def dashboard(request):
# retrieve all today's menu from database
    today_meals = getAllMenu()
    return render(request,'index.html',{'today_menus':today_meals} )

@ensure_csrf_cookie
def addmenu(request):
# retrieve all today's menu from database
    today_meals = getAllMenu()
    if request.method == "POST":

        try:
            print("=======Sending Data========")
            print(request.POST) # Debugging output 
            print(request.FILES)

            category = request.POST.get("faculty")
            dish = request.POST.get("dish")
            price = float(request.POST.get("price"))
            time = request.POST.get("time")
            description = request.POST.get("story")
            image = request.FILES.get("photo")

            # Save image to /media/meal_images/
            image_data = image.read()
            # Save data to MongoDB
            addmeal(category,dish,price,time,description,image_data);
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return render(request, 'menu.html',{'today_menus':today_meals}) 

def analytics(request):
    
    return render(request, 'analytics.html')

def messages(request):
    template = loader.get_template('messages.html')
    return HttpResponse(template.render())

def allmenu(request):
    template = loader.get_template('allmenu.html')
    return HttpResponse(template.render())

def bookings(request):
    template = loader.get_template('booking.html')
    return HttpResponse(template.render())

@ensure_csrf_cookie
def updatemeal(request):
    if request.method == "POST":
        data = request.POST
        print(data)

        csrfToken = data.get('csrfToken')
        meal_id = data.get("id")
        meal_name = data.get("dish")
        meal_category = data.get("category")
        meal_time = data.get("time")
        meal_price = data.get("price")
        meal_descr = data.get("description")

        try:
            update_item(meal_id,{'dish':meal_name,'category':meal_category,'time':meal_time,'price':meal_price,'description':meal_descr})
            return JsonResponse({'message':'Updated Successful'})
        except Exception as e:
            return JsonResponse({'error':f'{e}'})

def deletemenu(request):
    if request.method == "POST":
        id = request.POST.get('id')
        try:
            deleteMenu(id);
            return JsonResponse({'message':'Meal now deleted'})
        except Exception as e:
            print(f'Error Occured: {e}')
            return JsonResponse({'error':f'{e}'})
        