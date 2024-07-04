from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import scrape

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Server Running...'
    
@app.route('/scraping')
def api():
    url = request.args.get('url')
    result = scrape(url)
    # result.headers.add('Access-Control-Allow-Origin', '*')
    return result

if __name__ == '__main__':
   app.run()
