from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
import json
import random


class WordList:
    def __init__(self):
        load_path = "sprintshoutdict.json"
        with open(load_path, mode='rb') as f:
            self.word_dict = json.load(f)

    def list_up_answers(self, length, idx, moji):
        ans_list = list(self.word_dict[length][idx][moji])
        random.shuffle(ans_list)

        return {i: ans_list[i] for i in range(min(len(ans_list), 10))}


app = Flask(__name__)
CORS(app)  # Cross Origin Resource Sharing

Solver = WordList()


@app.route("/", methods=['GET'])
def index():
    return "welcome sprint shout solver!"


@app.route("/word_list", methods=['GET', 'POST'])
def word_list():
    data = request.get_json()
    length = str(data['length'])
    idx = str(data['idx'])
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
