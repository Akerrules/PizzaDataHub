from flask import Flask, request
import requests
from flask import jsonify



app = Flask(__name__)




import json

def read_json_file(file_path):
   
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"The file {file_path} was not found.")
        return None
    except json.JSONDecodeError:
        print(f"The file {file_path} is not a valid JSON file.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

orderdData = read_json_file("../data-sets/order_data.json")
reviewData = read_json_file("../data-sets/review_data.json")
priceData = read_json_file("../data-sets/pricing_data.json")

stores = {"All":"*"}

daily_revenue=[]
monthy_revenue=[]

def get_all_store_name():
    for i in reviewData:
        if(i["store"] not in stores ):
            stores[i["store"]] = i["store"]
    for i in orderdData:
        if(i["store"] not in stores ):
            stores[i["store"]] = i["store"]

pizzatype = []



def cal_daily_revenue():
    result = {}
    for record in orderdData:
        year, month, day = record["date"].split("-")
        daily_revenue = sum(priceData[item["type"]][item["size"]] for item in record["items"])

        if year not in result:
            result[year] = {}
        if month not in result[year]:
            result[year][month] = {}
        if day not in result[year][month]:
            result[year][month][day] = 0
        result[year][month][day] += daily_revenue

    return result



    # def cal_monthly_Revenue(daily_revenue):
    #     result=[]
    #     for i in daily_revenue:
    #         result.append(i[])
    
daily_revenue= cal_daily_revenue()
get_all_store_name()

#filter data

@app.route('/order/<city>', methods=['GET'])
def get_City_Order(city):
    result = []
    for i in orderdData:
        if(i["store"]==city):
            result.append(i)

    return result



@app.route('/api/order/store/<type>', methods=['GET'])

def get_Orderby_Pizzatype(type):
    result = {}
    for i in orderdData:
        if(i["store"] not in result and i["items"][0]["type"].lower()==type.lower()):
            result[i["store"]] = 1
        elif i["items"][0]["type"].lower()==type.lower() :
            result[i["store"]] = 1+ result[i["store"]]
    return result

@app.route('/api/order/totalsale/<year>', methods=['GET'])
def getTotalSale(year):
    total_revenue = 0
    if year in daily_revenue:
        for month, days in daily_revenue[year].items():
            for day, revenue in days.items():
                total_revenue += revenue
        return str(total_revenue)
    else:
        return f"No data available for the year {year}"





@app.route('/api/daily-Revenue', methods=['GET'])
def get_daily_revenue():
    return daily_revenue



@app.route('/api/order/store', methods=['GET'])
def storesOrder():
    result = {}
    for i in orderdData:
        if(i["store"] not in result):
            result[i["store"]] = 1
        else:
            result[i["store"]] = 1+ result[i["store"]]
    return result

@app.route('/api/reviews/<city>', methods=['GET'])
@app.route('/api/reviews', methods=['GET'])
def handle_reviews(city="*"):
    result={}

    for i in reviewData:
       
        if((i["sentiment"] not in result) and (city=="*" or i["store"] == city)):
            result[i["sentiment"]]  = 1
        elif(i["sentiment"]  in result): 
            result[i["sentiment"]]  = result[i["sentiment"]] +1
    return result


  

@app.route('/api/hello', methods=['GET'])
def hello_world():
   
    return jsonify("Hello World!")

@app.route('/api/stores', methods=['GET'])
def Get_store():
    return stores

def get_stores_for_Reviews():
    stores = {"All":"*"}
    for i in reviewData:
        if(i["store"] not in stores ):
            stores[i["store"]] = i["store"]

    return stores


