from flask import Blueprint
from controllers.health_controller import flask_health_check

health_routes = Blueprint('health_routes', __name__)

health_routes.route('/', methods=['GET'])(flask_health_check)