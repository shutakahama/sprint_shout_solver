from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
from utils import WordList, ret_dict, ret_dictdict

app = Flask(__name__)
CORS(app)  # Cross Origin Resource Sharing


Solver = WordList()


@app.route("/", methods=['GET'])
def index():
    return "welcome sprint shout solver!"


@app.route("/word_list", methods=['GET', 'POST'])
def word_list():
    data = request.get_json()
    length = int(data['length'])
    idx = int(data['idx'])
    moji = data['moji']
    if moji == "":
        res = []
    else:
        res = Solver.list_up_answers(length, idx, moji)
    
    response = {'result': res}
    if res:
        print(res[0])
    return make_response(jsonify(response))


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
