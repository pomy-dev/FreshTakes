from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
import json
from .models import MenuItem

def dashboard(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

@ensure_csrf_cookie
def addmenu(request):
    if request.method == "POST":
        try:
            # Extract form data from request

            print("Received Data:", request.POST)
            print("===============Selected Category Before==============");
            print(category);

            category= request.POST.get("faculty")
            dish = request.POST.get("dish")
            price = float(request.POST.get("price",0))
            time = request.POST.get("time")
            description = request.POST.get("story")

            # Save data to MongoDB
            menu_item = MenuItem(
                category=category,
                dish=dish,
                price=price,
                serveTime=time,
                description=description
            )
            menu_item.save()

            print("===============Selected Category==============");
            print(category);

            return JsonResponse({"message": "Menu uploaded successfully!"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return render(request, 'menu.html') 

def analytics(request):
    template = loader.get_template('analytics.html')
    return HttpResponse(template.render())

def messages(request):
    template = loader.get_template('messages.html')
    return HttpResponse(template.render())

def allmenu(request):
    template = loader.get_template('allmenu.html')
    return HttpResponse(template.render())

def bookings(request):
    template = loader.get_template('booking.html')
    return HttpResponse(template.render())
