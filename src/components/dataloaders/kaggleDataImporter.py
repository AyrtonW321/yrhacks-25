import os
import subprocess
import zipfile
import shutil
import pandas as pd
import json

# Install these libraries
# pip install kaggle
# pip install pandas

# Set Kaggle API credentials
os.environ['KAGGLE_USERNAME'] = 'ryancheng12'
os.environ['KAGGLE_KEY'] = '754afde563824b88f98e9e00f7ebec4f'

# Ensure public/datasets folder exists
datasets_path = os.path.join('public', 'datasets')
os.makedirs(datasets_path, exist_ok=True)

# Function to download, extract, and process a dataset
def download_and_extract_dataset(dataset_name, folders_to_copy=None):
    try:
        print(f"\nDownloading dataset: {dataset_name}...")
        subprocess.run([
            'kaggle',
            'datasets',
            'download',
            '-d',
            dataset_name
        ], check=True)

        dataset_id = dataset_name.split("/")[-1]
        zip_path = f'{dataset_id}.zip'
        extracted_path = f'{dataset_id}_data'

        print(f"Extracting dataset: {zip_path}...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extracted_path)

        print(f"Contents of {extracted_path}: {os.listdir(extracted_path)}")

        target_path = os.path.join(datasets_path, dataset_id)
        os.makedirs(target_path, exist_ok=True)

        # Custom logic per dataset
        if dataset_id == "food-ingredients-and-recipe-dataset-with-images":
            # Convert CSV to JSON
            csv_filename = 'Food Ingredients and Recipe Dataset with Image Name Mapping.csv'
            csv_path = os.path.join(extracted_path, csv_filename)
            if os.path.exists(csv_path):
                df = pd.read_csv(csv_path)
                json_path = os.path.join(target_path, 'mapping.json')
                df.to_json(json_path, orient='records', indent=2)
                print(f"Converted CSV to JSON: {json_path}")

                os.remove(csv_path)
                print(f"Deleted CSV: {csv_path}")

            # Move Food Images
            deep_image_path = os.path.join(extracted_path, 'Food Images', 'Food Images')
            if os.path.exists(deep_image_path):
                dest_images = os.path.join(target_path, 'Food Images')
                shutil.copytree(deep_image_path, dest_images)
                print(f"Moved Food Images to {dest_images}")
            else:
                print(f"Could not find nested Food Images folder.")

        else:
            if folders_to_copy:
                for folder in folders_to_copy:
                    src = os.path.join(extracted_path, folder)
                    dst = os.path.join(target_path, folder)
                    if os.path.exists(src):
                        shutil.copytree(src, dst)
                        print(f"Moved {folder} to {dst}")
                    else:
                        print(f"Folder not found: {src}")
            else:
                print("No folders specified to copy for this dataset.")

        # Cleanup: delete ZIP and extracted folder
        if os.path.exists(zip_path):
            os.remove(zip_path)
            print(f"Deleted ZIP: {zip_path}")
        if os.path.exists(extracted_path):
            shutil.rmtree(extracted_path)
            print(f"Deleted extracted folder: {extracted_path}")

        print(f"Finished processing: {target_path}")

    except Exception as e:
        print(f"Error processing {dataset_name}: {e}")

# List of datasets and folders to move
datasets = [
    ("pes12017000148/food-ingredients-and-recipe-dataset-with-images", None),
    ("trolukovich/food11-image-dataset", ["training"]),
]

# Download, extract, and process each dataset
for dataset_name, folders in datasets:
    download_and_extract_dataset(dataset_name.strip(), folders)