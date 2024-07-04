import base64
import requests

headers = {"User-Agent": 'Mozilla/5.0'}

def get_base64(url):
    result = base64.b64encode(requests.get(url, headers=headers).content)
    return result.decode("utf-8")

def apiResponse(data = None, message = None, stack = None):
    return {"data": data, "message": message, "stack": stack}