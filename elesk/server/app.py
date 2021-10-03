from flask import Flask, request

from elesk.core import say_hello

app = Flask(__name__)


@app.route('/api', methods=["POST"])
def post_name():
    data = request.json['name']
    return say_hello(data)


if __name__ == '__main__':
    app.run()
