from flask import Flask, render_template, request

from elepy.core import say_hello

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/api', methods=["POST"])
def post_name():
    data = request.json['name']
    return say_hello(data)


if __name__ == '__main__':
    app.run()
