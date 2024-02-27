from flask import Blueprint
from controllers.default_controller import hello, cache, info

default_routes = Blueprint('default_routes', __name__)

default_routes.route('/', methods=['GET'])(hello)
default_routes.route('/cache', methods=['GET'])(cache)
default_routes.route('/info', methods=['GET'])(info)