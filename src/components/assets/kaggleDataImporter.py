import os
import subprocess
import zipfile
import shutil

os.environ['KAGGLE_USERNAME'] = 'ryancheng12'
os.environ['KAGGLE_KEY'] = '754afde563824b88f98e9e00f7ebec4f'

print("📦 Downloading dataset...")
subprocess.run([
    'kaggle',
    'datasets',
    'download',
    '-d',
    'trolukovich/food11-image-dataset'
])

# Step 2: Unzip
zip_path = 'food11-image-dataset.zip'
extracted_path = 'food11_data'

print("📂 Extracting dataset...")
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extracted_path)

# Step 3: Move to public/assets/food11
target_path = os.path.join('public', 'assets', 'food11')
os.makedirs(target_path, exist_ok=True)

# Choose which folders to move (you can customize this)
folders_to_copy = ['test', 'validation']  # or add 'train'

for folder in folders_to_copy:
    src = os.path.join(extracted_path, folder)
    dst = os.path.join(target_path, folder)
    if os.path.exists(dst):
        print(f"⚠️ Skipping existing folder: {dst}")
    else:
        print(f"📁 Moving {folder} ➜ {dst}")
        shutil.copytree(src, dst)

print("✅ Done! Dataset is in public/assets/food11/")