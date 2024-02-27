from flask import Flask, request, jsonify

def hello():
	return "Hello World!"

def cache():
	return "nginx will cache this response"

def info():

	resp = {
		'connecting_ip': request.headers['X-Real-IP'],
		'proxy_ip': request.headers['X-Forwarded-For'],
		'host': request.headers['Host'],
		'user-agent': request.headers['User-Agent']
	}

	return jsonify(resp)

