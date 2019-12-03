from flask import Flask
from flask import render_template
import pymongo
import pandas as pd

client = pymongo.MongoClient('mongodb://localhost:27017')
db = client.city_master_wallethub_db
data = db.items.find()[0]
df = pd.DataFrame(data)
df = df.drop(columns='_id')
html_table = df.to_html(index=False, escape=False)
#if data table does not show up, you need to run Ron's file: (weatherornot\rj-working-example) 

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def thedata():
    return render_template("data.html", html_table=html_table)
if __name__ == "__main__":
    app.debug = True
    app.run()