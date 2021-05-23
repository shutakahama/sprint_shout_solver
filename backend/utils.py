from collections import defaultdict
import pickle
import random


def ret_dictdict():
    return defaultdict(ret_dict)


def ret_dict():
    return defaultdict(set)


class WordList:
    def __init__(self):
        load_path = "sprintshoutdict.pickle"
        with open(load_path, mode='rb') as f:
            self.word_dict = pickle.load(f)

    def list_up_answers(self, length, idx, moji):
        ans_list = list(self.word_dict[length][idx][moji])
        random.shuffle(ans_list)

        return {i: ans_list[i] for i in range(min(len(ans_list), 10))}
