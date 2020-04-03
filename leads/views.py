from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Users
from django.http import JsonResponse
from django.db import IntegrityError
from datetime import datetime
from django.utils import timezone


@csrf_exempt
def login(request):
    try:
        if request.method == "POST":
            query = json.loads(request.body)
            status = Users.objects.filter(email=query['email'], password=query['password'])
            if status:
                data = dict()
                for object in status:
                    data['status']= 200
                    data['username']= object.username
                    data['email']= object.email
                return JsonResponse(data)
            return JsonResponse({"status": 404, "message":"Invalid emailId or password"})
    except Exception as e:
        return JsonResponse({"status": 400, "message":"Method not allowed"})



@csrf_exempt
def register(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            status = Users.objects.create(**data)
            print("status in register",status)
            return JsonResponse(data)
    except IntegrityError as e:
        print("exc",e)
        res = {"status": 400, "message":"Email Id already exists"}
        return JsonResponse(res)
    except Exception as e:
        return {"status": 401, "message":e}

@csrf_exempt
def get_data(request):
    all_entries = Users.objects.all()
    all_users = []
    data = {"status": 200, "users":all_users}
    if all_entries:
        for entry in all_entries:
            user_data = dict()
            user_data['username']= entry.username
            user_data['email']= entry.email
            user_data['time']= entry.last_active.timestamp()
            all_users.append(user_data)
        return JsonResponse(data)
    return JsonResponse({"status": 404, "message":"Invalid emailId or password"})

@csrf_exempt
def insert_time(request):
    if request.method == "POST":
        query = json.loads(request.body)
        res = Users.objects.filter(email = query["email"])
        s = res.update(last_active = timezone.now())
        print (res)
        return JsonResponse({"status": 200, "message": "Inserted successfully"})
    return JsonResponse({"status": 400, "message": ""})