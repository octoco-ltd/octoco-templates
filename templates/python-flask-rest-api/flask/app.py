from flask import Flask, request, jsonify
from routes.default_routes import default_routes
from routes.health_routes import health_routes

app = Flask(__name__)
app.register_blueprint(default_routes, url_prefix='/default')
app.register_blueprint(health_routes, url_prefix='/health')


