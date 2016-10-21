
from flask import Flask, render_template, request
import json
import pandas as pd
import time
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/store_data', methods=['GET'])
def store_data():
	user_list = request.args.get('user_list')
	user_list = json.loads(user_list)
	df = pd.DataFrame(user_list)
	t = time.time()
	df.to_csv(str(t))
	print(user_list)
	return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
