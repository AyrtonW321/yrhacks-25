import os
import subprocess
import zipfile

os.environ['KAGGLE_USERNAME'] = 'ryancheng12'
os.environ['KAGGLE_KEY'] = '754afde563824b88f98e9e00f7ebec4f'

subprocess.run([
    'kaggle',
    'datasets',
    'download',
    '-d',
    'validmodel/grocery-store-dataset'
])

with zipfile.ZipFile('grocery-store-dataset.zip', 'r') as zip_ref:
    zip_ref.extractall('grocery_data')