# Python Flask REST API with NGINX Proxy

This directory contains a REST API written using Python's FLASK module. The API itself has been containerized, but does not have any exposed ports. A second container serves as an NGINX proxy for the API. This contianer has a port 80 exposed to the internet and proxies any requests to the FLASK API.

To run the application run the follwoing command in your terminal: `docker compose up --build`