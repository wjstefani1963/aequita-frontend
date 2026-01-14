from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.get("/indices")
def listar_indices():
    return {
        "indices": ["IGPM", "IPCA", "INPC"]
    }


@app.get("/apoio")
def apoio():
    return render_template("apoio.html")



@app.route("/calculo")
def calculo():
    return render_template("calculo.html")

@app.get("/versao")
def versao():
    return {
        "versao": "2026-01-14",
        "commit": "d26ba1d"
    }



if __name__ == "__main__":
    app.run(debug=True)

