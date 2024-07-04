#! /usr/bin/python3

import logging
import sys
from server import app as application

logging.basicConfig(stream=sys.stderr)
application.secret_key = 'secret key'