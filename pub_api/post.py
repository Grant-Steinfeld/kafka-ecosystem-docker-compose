import requests
import json
import sys

data = {"title": sys.argv[1], "body":sys.argv[2]}
# data__ = json.dumps(data_)

# headers_ = {'Accept': 'application/json', 'Content-Type':'application/json'}
# print(data__)
r = requests.post('http://localhost:6060/posts', data=data)

print(r.json())