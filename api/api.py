from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
import json
import numpy as np


app = Flask(__name__, static_folder='../frontend/build')
# app = Flask(__name__)
CORS(app)

# @app.route('/time')
# def get_current_time():
#     print("Sumeet")
#     # return <h1> hello<h1>
#     return {'time': time.time()}
    
# # should get the user from a db or something else
# users_passwords = {'admin': 'admin', 'user': 'user'}
# users_claims = {
#     'admin': {
#         'username': 'admin',
#         'email': 'admin@admin.org',
#         'role': 'admin'
#     },
#     'user': {
#         'username': 'user',
#         'email': 'user@user.org',
#         'role': 'user'
#     }
# }


# @jwt.user_claims_loader
# def add_claims_to_access_token(identity):
#     return users_claims[identity]


@app.route('/analyze', methods=['POST'])

def login():

    print("Sumeet")
    print(request.json) # get the request,json from frontend
    print(os.getcwd()) # get current working dierctory
    command = "\"C:\Program Files (x86)\Strata 1.0.0\strata.exe\" -b Sample_Input.json"
    File    = "Sample_Input.json"
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
    process.wait()
    print (process.returncode)

    # read the json output file 
    Fjson = open(File,)
    # returns JSON object as a dictionary
    data = json.load(Fjson)
    hasResults = data["hasResults"]

    if(hasResults):
        Output_maxFreq = data["outputCatalog"]["frequency"]['max']
        Output_minFreq = data["outputCatalog"]["frequency"]['min']
        Output_sizeFreq = data["outputCatalog"]["frequency"]['size']
        Output_Freq     = np.linspace(np.log10(Output_minFreq),np.log10(Output_maxFreq),Output_sizeFreq)
        Output_Freq     = np.power(10,Output_Freq)

        Output_maxPeriod = data["outputCatalog"]["period"]['max']
        Output_minPeriod = data["outputCatalog"]["period"]['min']
        Output_sizePeriod = data["outputCatalog"]["period"]['size']
        Output_Period     = np.linspace(np.log10(Output_minPeriod),np.log10(Output_maxPeriod),Output_sizePeriod)
        Output_Period     = np.power(10,Output_Period)

        MaxAccelProfileOutput = data["outputCatalog"]["profilesOutputCatalog"][5]["data"][0][0]

        # MaxAccelProfileOutput = data["outputCatalog"]["ratiosOutputCatalog"][5]["data"][0][0]

        print(MaxAccelProfileOutput)

        # Output_depth = data["outputCatalog"]['depth']

        # print(Output_Freq)
        # print(Output_Period)

        # print(data["outputCatalog"]["frequency"]['max'])



    # # Iterating through the json list
    # for i in data['emp_details']:
    #     print(i)



    return jsonify({'whether_analyzed': 2}), 200

    # login_json = request.get_json()

    # if not login_json:
    #     return jsonify({'msg': 'Missing JSON'}), 400

    # username = login_json.get('username')
    # password = login_json.get('password')

    # if not username:
    #     return jsonify({'msg': 'Username is missing'}), 400

    # if not password:
    #     return jsonify({'msg': 'Password is missing'}), 400

    # user_password = users_passwords.get(username)

    # if not user_password or password != user_password:
    #     return jsonify({'msg': 'Bad username or password'}), 401

    # access_token = create_access_token(identity=username)

    # return jsonify({'access_token': access_token}), 200


# @app.route('/api/protected', methods=['GET'])
# @jwt_required
# def protected():
#     claims = get_jwt_claims()
#     if claims.get('username') == 'admin':
#         return jsonify({'data': ['hi', 'it', 'works']}), 200
#     return jsonify({'msg': 'No access for you!'}), 400


# if __name__ == '__main__':
#     app.jinja_env.auto_reload = True
#     app.config['TEMPLATES_AUTO_RELOAD'] = True
#     app.run(debug=True, host='0.0.0.0')