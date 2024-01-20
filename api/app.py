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

#filter data

@app.route('/order/<city>', methods=['GET'])
def getCityOrder(city):
    result = []
    for i in orderdData:
        if(i["store"]==city):
            result.append(i)

    return result

@app.route('/order/<city>/<type>/<size>', methods=['GET'])
def getOrderbyPizzaSize(city, size,type):
    result = []
    for i in orderdData:
        if (city == '*' or i["store"] == city) and \
        (type == '*' or i["items"][0]["type"].lower() == type) and \
        (size == '*' or i["items"][0]["size"].lower() == size):
            result.append(i)
    return result



def getTotalSale():
    return 0


def getMonthlyRevenue():

    return 0


@app.route('/api/reviews', methods=['GET'])
def handle_reviews():
    result={}

    for i in reviewData:
        print(i["sentiment"])
        if(i["sentiment"] not in result):
            result[i["sentiment"]]  = 1
        else: 
            result[i["sentiment"]]  = result[i["sentiment"]] +1
    return result
        
  

@app.route('/api/hello', methods=['GET'])
def hello_world():
   
    return jsonify("Hello World!")





