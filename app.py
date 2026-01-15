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

@app.route("/versao")
def versao():
    return {
        "app": "aequita-frontend",
        "versao": "2026-01-14",
        "api": "https://aequita-api.onrender.com"
    }




if __name__ == "__main__":
    app.run(debug=True)

